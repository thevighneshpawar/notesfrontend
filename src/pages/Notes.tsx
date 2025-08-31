"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, Save, X, LogOut } from "lucide-react";
import logo from "../assets/singleLogo.png";
import { createNote, getNotes, deleteNote, updateNote } from "../api/notes";
import { getMe, logout } from "../api/auth";
import { useNavigate } from "react-router-dom";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  name: string;
  email: string;
}

const Notes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editNote, setEditNote] = useState({ title: "", content: "" });

  useEffect(() => {
    fetchUserAndNotes();
  }, []);

  const fetchUserAndNotes = async () => {
    try {
      setIsLoading(true);
      const [userResponse, notesResponse] = await Promise.all([
        getMe(),
        getNotes(),
      ]);

      setUser(userResponse.data || userResponse);
      setNotes(notesResponse.notes || notesResponse || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate("/signin");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    try {
      const response = await createNote(newNote.title, newNote.content);
      setNotes((prev) => [response.note || response, ...prev]);
      setNewNote({ title: "", content: "" });
      setIsCreating(false);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleUpdateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNoteId || !editNote.title.trim() || !editNote.content.trim())
      return;

    try {
      await updateNote(editingNoteId, editNote);
      setNotes((prev) =>
        prev.map((note) =>
          note._id === editingNoteId
            ? { ...note, title: editNote.title, content: editNote.content }
            : note
        )
      );
      setEditingNoteId(null);
      setEditNote({ title: "", content: "" });
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const startEditing = (note: Note) => {
    setEditingNoteId(note._id);
    setEditNote({ title: note.title, content: note.content });
  };

  const cancelEditing = () => {
    setEditingNoteId(null);
    setEditNote({ title: "", content: "" });
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 lg:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="HD logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-semibold text-gray-900">
              Dashboard
            </span>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-gray-600">Email: {user?.email}</p>
        </div>

        {/* Create Note Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsCreating(true)}
            className="w-full h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium"
          >
            <Plus className="h-5 w-5" />
            Create Note
          </button>
        </div>

        {/* Create Note Form */}
        {isCreating && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Create New Note
            </h2>
            <form
              onSubmit={handleCreateNote}
              className="space-y-4"
            >
              <input
                type="text"
                value={newNote.title}
                onChange={(e) =>
                  setNewNote((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Note title..."
                required
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
              />
              <textarea
                value={newNote.content}
                onChange={(e) =>
                  setNewNote((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Write your note here..."
                required
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 resize-none"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  <Save className="h-4 w-4" />
                  Save Note
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setNewNote({ title: "", content: "" });
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notes Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Notes</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {notes.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 mb-2">
                  <Plus className="h-12 w-12 mx-auto mb-3" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No notes yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Create your first note to get started.
                </p>
                <button
                  onClick={() => setIsCreating(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  <Plus className="h-4 w-4" />
                  Create Note
                </button>
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note._id}
                  className="p-6"
                >
                  {editingNoteId === note._id ? (
                    // Edit mode
                    <form
                      onSubmit={handleUpdateNote}
                      className="space-y-4"
                    >
                      <input
                        type="text"
                        value={editNote.title}
                        onChange={(e) =>
                          setEditNote((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        placeholder="Note title..."
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
                      />
                      <textarea
                        value={editNote.content}
                        onChange={(e) =>
                          setEditNote((prev) => ({
                            ...prev,
                            content: e.target.value,
                          }))
                        }
                        placeholder="Write your note here..."
                        required
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 resize-none"
                      />
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                          <Save className="h-4 w-4" />
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                        >
                          <X className="h-4 w-4" />
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    // View mode
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 flex-1 mr-4">
                          {note.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEditing(note)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit note"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteNote(note._id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete note"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3 whitespace-pre-wrap">
                        {note.content}
                      </p>

                      <div className="text-xs text-gray-500">
                        Created: {formatDate(note.createdAt)}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
