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

export const updateNote = async (
  id: string,
  data: { title: string; content: string }
) => {
  const res = await api.put(`/notes/${id}`, data);
  return res.data;
};
