// src/context/notes/NoteState.js
import React, { useState } from "react";
import NoteContext from "./NoteContext";

const host = "http://localhost:5000"; // ✅ Define outside for consistency

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);

  // 📥 Get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // ➕ Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
      const newNote = await response.json();
      setNotes(prevNotes => [...prevNotes, newNote]); // ✅ Use updater
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // 📝 Edit note
  const editNote = async (id, title, description, tag) => {
    try {
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });

      setNotes(prevNotes =>
        prevNotes.map(note =>
          note._id === id ? { ...note, title, description, tag } : note
        )
      );
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  // ❌ Delete note
  const deleteNote = async (id) => {
    try {
      // Optimistically update UI first
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));

      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      // Optionally rollback UI update or notify user
    }
  };

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
