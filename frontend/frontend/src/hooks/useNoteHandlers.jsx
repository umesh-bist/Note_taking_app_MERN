// @ts-nocheck
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import {
  fetchNoteRequest,
  deleteNoteRequest,
  addNoteRequest,
  editNoteRequest,
} from "../reduxSaga/sagaReducers";
import { toast } from "react-toastify";

export const useNoteHandlers = (navigate) => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.note) || [];
  const [activeNote, setActiveNote] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid token..token expired")
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [navigate]);

  
  useEffect(() => {
    dispatch(fetchNoteRequest());
  }, [dispatch]);


  useEffect(() => {
    if (!notes || notes.length === 0) {
      setActiveNote(null);
      return;
    }

  
    const validNotes = notes.filter(note => note && note._id);
    const sortedNotes = [...validNotes].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    
    if (!activeNote || !activeNote._id) {
      setActiveNote(sortedNotes[0] || null);
    } else {
      
      const currentNote = sortedNotes.find(n => n._id === activeNote._id);
      if (!currentNote) {
       
        setActiveNote(sortedNotes[0] || null);
      } else if (
        currentNote.title !== activeNote.title ||
        currentNote.content !== activeNote.content
      ) {
      
        setActiveNote(currentNote);
      }
    }
 
  }, [notes]);

  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteNoteRequest(id));
      toast.success("Note deleted successfully")
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
    }
  };

  const handleSaveNote = (noteData) => {
    if (noteData._id != null) {
      dispatch(editNoteRequest({ id: noteData._id, note: noteData }));
    } else {
      dispatch(addNoteRequest(noteData));
      toast.info("Note added")
    }
  };

  const handleSelectNote = (note) => {
    if (note && (note._id || note._id === null)) { 
      setActiveNote(note);
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
    }
  };

  const handleAddNote = () => {
    const newNote = { 
      _id: null, 
      title: "", 
      content: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    toast.warning("Saves in 2s — close early won't")
    setActiveNote(newNote);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleOverlayClick = () => setIsSidebarOpen(false);

  return {
    notes: notes || [],
    activeNote,
    isSidebarOpen,
    handleDelete,
    handleSaveNote,
    handleSelectNote,
    handleAddNote,
    toggleSidebar,
    handleOverlayClick,
  };
};