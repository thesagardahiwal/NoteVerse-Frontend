import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Noteitem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes, addNote, editNote, filteredNotes } = context;
  const navigate = useNavigate();

  // States for modals
  const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: '' });
  const [newNote, setNewNote] = useState({ title: '', description: '', tag: '' });
  const [viewNoteData, setViewNoteData] = useState(null);

  // Modal trigger refs
  const refEdit = useRef(null);
  const refCloseEdit = useRef(null);
  const refAdd = useRef(null);
  const refCloseAdd = useRef(null);
  const refView = useRef(null);
  const refCloseView = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      getNotes();
    }
  }, []);

  // Open edit modal and populate fields
  const updateNote = (currentNote) => {
    refEdit.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  // Open view modal and show note data
  const viewNote = (currentNote) => {
    setViewNoteData(currentNote);
    refView.current.click();
  };

  // Handle updating the note
  const handleUpdate = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refCloseEdit.current.click();
  };

  // Handle adding new note
  const handleAdd = () => {
    addNote(newNote.title, newNote.description, newNote.tag);
    refCloseAdd.current.click();
    setNewNote({ title: '', description: '', tag: '' });
  };

  // Change handlers
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const onAddChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ maxWidth: '900px', margin: 'auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Your Notes</h2>
        <button
          className='btn btn-primary'
          onClick={() => refAdd.current.click()}
          aria-label="Add new note"
        >
          + Add Note
        </button>
      </div>

      {/* Hidden buttons to trigger modals */}
      <button
        ref={refEdit}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#editNoteModal"
      >
        Launch Edit Note Modal
      </button>

      <button
        ref={refAdd}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#addNoteModal"
      >
        Launch Add Note Modal
      </button>

      <button
        ref={refView}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#viewNoteModal"
      >
        Launch View Note Modal
      </button>

     {/* Add Note Modal */}
<div
  className="modal fade"
  id="addNoteModal"
  tabIndex="-1"
  aria-labelledby="addNoteModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered modal-md">
    <div
      className="modal-content"
      style={{
        borderRadius: '25px',
        backdropFilter: 'blur(15px)',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        boxShadow:
          '0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.18)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="modal-header"
        style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          borderRadius: '25px 25px 0 0',
          padding: '1.5rem 2rem',
          fontWeight: '700',
          fontSize: '1.5rem',
          letterSpacing: '1.1px',
          boxShadow: '0 4px 8px rgba(118, 75, 162, 0.5)',
        }}
      >
        <h5 className="modal-title" id="addNoteModalLabel">
          Add New Note
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="modal"
          aria-label="Close"
          style={{
            filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.4))',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        ></button>
      </div>
      <div
        className="modal-body"
        style={{
          padding: '2rem 2.5rem',
          color: '#444',
          fontSize: '1rem',
        }}
      >
        <form>
          <div className="mb-4">
            <label
              htmlFor="title"
              style={{
                fontWeight: '600',
                marginBottom: '0.3rem',
                display: 'block',
                color: '#5a3eae',
              }}
            >
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter note title"
              value={newNote.title}
              onChange={onAddChange}
              required
              minLength={5}
              style={{
                borderRadius: '12px',
                border: '1.5px solid #764ba2',
                padding: '0.6rem 1rem',
                fontSize: '1rem',
                boxShadow: 'inset 0 1px 3px rgba(118,75,162,0.2)',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = '#667eea')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = '#764ba2')
              }
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              style={{
                fontWeight: '600',
                marginBottom: '0.3rem',
                display: 'block',
                color: '#5a3eae',
              }}
            >
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              placeholder="Enter note description"
              value={newNote.description}
              onChange={onAddChange}
              required
              minLength={5}
              rows={5}
              style={{
                borderRadius: '12px',
                border: '1.5px solid #764ba2',
                padding: '0.8rem 1rem',
                fontSize: '1rem',
                boxShadow: 'inset 0 1px 3px rgba(118,75,162,0.2)',
                transition: 'border-color 0.3s ease',
                resize: 'vertical',
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = '#667eea')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = '#764ba2')
              }
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="tag"
              style={{
                fontWeight: '600',
                marginBottom: '0.3rem',
                display: 'block',
                color: '#5a3eae',
              }}
            >
              Tag (optional)
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              placeholder="Enter tag"
              value={newNote.tag}
              onChange={onAddChange}
              style={{
                borderRadius: '12px',
                border: '1.5px solid #764ba2',
                padding: '0.6rem 1rem',
                fontSize: '1rem',
                boxShadow: 'inset 0 1px 3px rgba(118,75,162,0.2)',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = '#667eea')
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = '#764ba2')
              }
            />
          </div>
        </form>
      </div>
      <div
        className="modal-footer"
        style={{
          borderTop: 'none',
          padding: '1.25rem 2rem',
          backgroundColor: 'rgba(230, 230, 255, 0.5)',
          borderRadius: '0 0 25px 25px',
          justifyContent: 'space-between',
        }}
      >
        <button
          ref={refCloseAdd}
          type="button"
          className="btn btn-outline-secondary"
          data-bs-dismiss="modal"
          style={{
            borderRadius: '50px',
            fontWeight: '600',
            padding: '0.5rem 1.8rem',
            letterSpacing: '0.07em',
            transition: 'all 0.3s ease',
            boxShadow: '0 3px 8px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#5a3eae';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(90, 62, 174, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '';
            e.currentTarget.style.color = '';
            e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.1)';
          }}
        >
          Cancel
        </button>
        <button
          disabled={newNote.title.length < 5 || newNote.description.length < 5}
          onClick={handleAdd}
          type="button"
          className="btn btn-primary"
          style={{
            borderRadius: '50px',
            fontWeight: '700',
            padding: '0.6rem 2rem',
            letterSpacing: '0.1em',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            border: 'none',
            boxShadow: '0 5px 15px rgba(118, 75, 162, 0.7)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #764ba2, #667eea)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(118, 75, 162, 0.9)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            e.currentTarget.style.boxShadow = '0 5px 15px rgba(118, 75, 162, 0.7)';
          }}
        >
          Add Note
        </button>
      </div>
    </div>
  </div>
</div>


      {/* Edit Note Modal */}
      <div className="modal fade" id="editNoteModal" tabIndex="-1" aria-labelledby="editNoteModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: '20px' }}>
            <div
              className="modal-header"
              style={{ background: 'linear-gradient(135deg, #f7971e, #ffd200)', color: '#3b2e00', borderRadius: '20px 20px 0 0' }}
            >
              <h5 className="modal-title" id="editNoteModalLabel">Edit Note</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    placeholder="Title"
                    value={note.etitle}
                    onChange={onChange}
                    required
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription">Description</label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="Description"
                    value={note.edescription}
                    onChange={onChange}
                    required
                    minLength={5}
                    rows={5}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="Tag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refCloseEdit}
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
                onClick={handleUpdate}
                type="button"
                className="btn btn-warning"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Note Modal */}
<div
  className="modal fade"
  id="viewNoteModal"
  tabIndex="-1"
  aria-labelledby="viewNoteModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered modal-sm">
    <div
      className="modal-content shadow-lg"
      style={{
        borderRadius: '25px',
        border: '1px solid #e0e0e0',
        overflow: 'hidden',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        className="modal-header"
        style={{
          background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
          color: 'white',
          borderBottom: 'none',
          padding: '1.25rem 1.5rem',
          letterSpacing: '1.2px',
          fontWeight: '600',
          fontSize: '1.3rem',
        }}
      >
        <h5 className="modal-title" id="viewNoteModalLabel">
          View Note
        </h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="modal"
          aria-label="Close"
          style={{
            filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.3))',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.2)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        ></button>
      </div>
      <div
        className="modal-body"
        style={{
          padding: '1.75rem 1.5rem',
          backgroundColor: '#fafafa',
          color: '#333',
          lineHeight: '1.6',
          fontSize: '1rem',
          minHeight: '180px',
        }}
      >
        {viewNoteData ? (
          <>
            <h4
              style={{
                fontWeight: '700',
                marginBottom: '0.6rem',
                color: '#2575fc',
                textTransform: 'capitalize',
              }}
            >
              {viewNoteData.title}
            </h4>
            <p
              style={{
                whiteSpace: 'pre-wrap',
                fontSize: '1.05rem',
                marginBottom: '1.25rem',
                fontWeight: '500',
                color: '#555',
              }}
            >
              {viewNoteData.description}
            </p>
            <span
              style={{
                display: 'inline-block',
                backgroundColor: '#6a11cb',
                color: 'white',
                padding: '6px 14px',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                userSelect: 'none',
              }}
            >
              {viewNoteData.tag || 'No Tag'}
            </span>
          </>
        ) : (
          <p
            style={{
              fontStyle: 'italic',
              textAlign: 'center',
              color: '#999',
              marginTop: '3rem',
              fontSize: '1.1rem',
            }}
          >
            No note selected
          </p>
        )}
      </div>
      <div
        className="modal-footer"
        style={{
          borderTop: 'none',
          justifyContent: 'center',
          padding: '1rem',
          backgroundColor: '#f0f0f0',
        }}
      >
        <button
          ref={refCloseView}
          type="button"
          className="btn btn-outline-primary px-4"
          data-bs-dismiss="modal"
          style={{
            borderRadius: '50px',
            fontWeight: '600',
            letterSpacing: '0.07em',
            boxShadow: '0 4px 8px rgb(37 117 252 / 0.3)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#2575fc';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.boxShadow = '0 6px 12px rgb(37 117 252 / 0.5)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = '';
            e.currentTarget.style.color = '';
            e.currentTarget.style.boxShadow = '0 4px 8px rgb(37 117 252 / 0.3)';
          }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>


      {/* Notes List */}
      <div className="row">
        {(filteredNotes.length === 0 ? notes : filteredNotes).map((note) => (
          <Noteitem
            key={note._id}
            note={note}
            updateNote={updateNote}
            showAlert={console.log}  // replace with your actual showAlert function if you have one
            viewNote={viewNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
