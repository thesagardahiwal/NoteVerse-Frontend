import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote, filteredNotes } = context;
  const navigate = useNavigate();

  const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: '' });
  const [showAddNote, setShowAddNote] = useState(false);
  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      getNotes();
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4">
      {/* Add Note Toggle Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Notes</h2>
        <button className="btn btn-success" onClick={() => setShowAddNote(!showAddNote)}>
          {showAddNote ? 'Hide Add Note' : 'Add Note'}
        </button>
      </div>

      {/* Show AddNote Conditionally */}
      {showAddNote && (
        <div className="mb-4">
          <AddNote />
        </div>
      )}

      {/* Hidden Trigger Button for Edit Modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editNoteModal"
      >
        Launch Edit Note Modal
      </button>

      {/* Edit Note Modal */}
      <div
        className="modal fade"
        id="editNoteModal"
        tabIndex="-1"
        aria-labelledby="editNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow">
            <div className="modal-header">
              <h5 className="modal-title">Edit Note</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-2">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label fw-semibold">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    rows="3"
                    minLength={5}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label fw-semibold">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="row">
        {Array.isArray(filteredNotes) && filteredNotes.length === 0 && (
          <p className="text-muted">No notes to display. Start by adding a new one!</p>
        )}
        {!showAddNote && Array.isArray(filteredNotes) &&
          filteredNotes.map((note) => (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          ))}
      </div>
    </div>
  );
};

export default Notes;
