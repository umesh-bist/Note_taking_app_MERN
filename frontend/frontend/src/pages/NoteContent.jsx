// @ts-nocheck

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addNoteRequest,
  deleteNoteRequest,
  editNoteRequest,
  fetchNoteRequest,
} from "../reduxSaga/SagaReducers";

const NoteContent = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.notes);
  const notes = useSelector((state) => state.notes.note);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchNoteRequest());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteNoteRequest(id));
      
    }
  };

  const handleClickEdit = (note) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setForm({ title: note.title, content: note.content });
    setEditId(note._id);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (form.title.trim() && form.content.trim()) {
      if (editId) {
        dispatch(editNoteRequest({ id: editId, note: form }));
        setEditId(null);
      } else {
        dispatch(addNoteRequest(form));
        
      }
      setForm({ title: "", content: "" });
      
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Notes App</h1>

      <form
        onSubmit={handleAdd}
        className="bg-white p-6 rounded-2xl shadow-xl space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border border-gray-300 px-4 py-2 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="border border-gray-300 px-4 py-2 w-full rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
        >
          {editId ? "Update Note" : "Add Note"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">Error: {error}</p>}

      <div className="mt-8 space-y-4">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note._id} className="bg-white p-4 rounded-xl shadow-md space-y-2">
              <div className="text-xs text-gray-500 italic">


                {
                editId ? new Date(note.createdAt).toLocaleString("ne-np")
                :
                new Date(note.updatedAt).toLocaleString("ne-np")}
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
              <p className="text-gray-700">{note.content}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleClickEdit(note)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className="text-center text-gray-600">No notes available.</p>
        )}
      </div>
    </div>
  );
};

export default NoteContent;
