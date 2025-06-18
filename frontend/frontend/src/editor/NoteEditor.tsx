// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { User } from "lucide-react";
import { editorInitConfig } from "../common/editorInitConfig";
import { noteSchema } from "../validation/authValidation";

const NoteEditor = ({ note, onSave, rightHeaderContent }) => {
  const editorRef = useRef(null);
  const debounceRef = useRef(null);

  const [validationErrors, setValidationErrors] = useState([]);

  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");

  useEffect(() => {
    setTitle(note.title || "");
    setContent(note.content || "");
  }, [note]);

  const triggerDebouncedSave = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const currentContent = editorRef.current?.getContent() || content;

      const formData = {
        title: title.trim(),
        content: content.trim(),
      };
      try {
        await noteSchema.validate(formData, { abortEarly: false });
        setValidationErrors([]);
        const hasChanges =
          title !== note.title || currentContent !== note.content;

        if (hasChanges && (formData.title || formData.content)) {
          onSave({
            ...note,
            title: title.trim(),
            content: currentContent.trim(),
          });
        }
      } catch (validationError) {
        if (validationError.inner) {
          const fieldErrors = {};
          validationError.inner.forEach((err) => {
            if (!fieldErrors[err.path]) {
              fieldErrors[err.path] = err.message;
            }
          });
          setValidationErrors(fieldErrors);
        } else {
          setValidationErrors({
            [validationError.path]: validationError.message,
          });
        }
      }
    }, 2000);
  }, [title, content, note, onSave]);

  useEffect(() => {
    triggerDebouncedSave();
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [title, content, triggerDebouncedSave]);

  const username = localStorage.getItem("username");
  // console.log(username);

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-none bg-gray-50">
        <div className="flex items-center justify-between p-3 pt-0 bg-white  ">
          <input
            type="text"
            className="w-full px-3 py-2 text-lg font-semibold text-gray-600 bg-white rounded-lg focus:outline-none focus:ring-0 focus:border-transparent"
            placeholder="Note title..."
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          {rightHeaderContent}
        </div>
        <div>
         {validationErrors.title && (
              <div className="text-red-500 text-xs font-medium  mr-2">
                {validationErrors.title}
              </div>
            )}
        </div>
        <div className="p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-gray-600" />
            <span className="text-sm ml-2 font-medium text-gray-700 truncate">
              {username}
            </span>
          </div>

          <div className="text-xs">
            <span className="font-medium text-gray-500 mr-2">
              Last Modified:
            </span>
            <span className="text-sm ml-2 font-medium text-gray-700 truncate">
              {note.updatedAt
                ? new Date(note.updatedAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Just now"}
            </span>
          </div>
        </div>
      </div>

      <div
        className="flex-1 focus:outline-hidden min-h-0"
        style={{ border: "none", outline: "none", boxShadow: "none" }}
      >
        <Editor
          apiKey="4nhptk2xhl1p489gm6crgaih2rchy8xrgzrtqct3wf0r22bi"
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={content}
          onEditorChange={(newContent) => setContent(newContent)}
          init={editorInitConfig}
        />
       
      </div>
    </div>
  );
};

export default NoteEditor;