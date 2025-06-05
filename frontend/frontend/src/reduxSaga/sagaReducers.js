// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  note: [],
  loading: false,
  error: null,
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    fetchNoteRequest: (state) => {
      state.loading = true;
    },

    fetchNoteSuccess: (state, action) => {
      state.note = action.payload;
      state.loading = false;
    },
    fetchNoteFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addNoteRequest: (state) => {
      // console.log(action.payload);
      state.loading=true
    },

    addNoteSuccess: (state, action) => {
      state.note.push(action.payload);
      // console.log(state.note);
      state.loading = false;
    },
    addNoteFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteNoteRequest: (state) => {
      state.loading = true;
    },
    deleteNoteSuccess: (state, action) => {
      const idToDelete = action.payload;
      // console.log("id", action.payload);
      state.note = state.note.filter((note) => note._id !== idToDelete);
    },
    deleteNoteFailure: (state, action) => {
      state.error = action.payload;
    },
    editNoteRequest: (state) => {
      state.loading = true;
    },
    editNoteSuccess: (state, action) => {
     
      // debugger;
      const updatedNote = action.payload;
     state.note=state.note.map(note=>note._id===updatedNote._id ?updatedNote :note)

      //here the state.note gives entire notes
      // console.log("is there any thing in note",JSON.parse(JSON.stringify(state.note)) )

  
  
      
      
      state.loading = false;
    },
    editNoteFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchNoteFailure,
  fetchNoteRequest,
  fetchNoteSuccess,
  addNoteFailure,
  addNoteRequest,
  addNoteSuccess,
  deleteNoteFailure,
  deleteNoteRequest,
  deleteNoteSuccess,
  editNoteFailure,
  editNoteSuccess,
  editNoteRequest,
} = noteSlice.actions;

export default noteSlice.reducer;
