import api from "./axios";

export const createNote = async (title: string, content: string) => {
  const res = await api.post("/notes", { title, content });
  return res.data;
};

export const getNotes = async () => {
  const res = await api.get("/notes");
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
};
