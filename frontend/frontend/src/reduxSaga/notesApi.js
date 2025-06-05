import API from "./axiosInstance.js";

export const fetchNoteApi=()=>API.get('/note');
export const addNoteApi=(note)=>API.post("/create",note)
export const deleteNoteApi=(id)=>API.delete(`/${id}`);
export const editNoteAPi=(id,note)=>API.put(`edit/${id}`,note)
