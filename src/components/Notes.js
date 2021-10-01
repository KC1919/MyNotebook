import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/NoteContext";
import NoteItem from "./NoteItem";


export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNoteState] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = async (currentNote) => {
    console.log(currentNote);

    ref.current.click();

    setNoteState({
      id:currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleChange = (e) => {
    setNoteState({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {


    const updatedNote = {
      id:note.id,         //note id to be updated
      title: note.etitle,
      description: note.edescription,
      tag: note.etag,
    };
    editNote(updatedNote);
    refClose.current.click();
  };

  useEffect(() => {
    getNotes();
  });

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Modal Toggle Button
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    value={note.etitle}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    aria-describedby="emailHelp"
                    value={note.etag}
                    onChange={handleChange}
                  />
                </div>
              </form>
              <div className="modal-footer">
                <button
                  ref={refClose}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}
