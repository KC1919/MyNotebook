import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/NoteContext";
import NoteItem from "./NoteItem";

export default function Notes(props) {

  const context = useContext(NoteContext); //using the NoteState context and all of its properties and functions and states
  const { notes, getNotes, editNote } = context;

  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNoteState] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  //this function is run when the edit note icon is clicked
  const updateNote = async (currentNote) => {
    console.log(currentNote);

    //this clicks the button which renders the modal to edit the note
    ref.current.click();

    //this sets the fields of the modal with note details
    setNoteState({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  //THIS IS RUN WHEN CHANGES ARE BEING MADE IN THE INPUT FIELDS OF THE MODAL
  const handleChange = (e) => {
    //sets the note with the udpdated input values
    setNoteState({ ...note, [e.target.name]: e.target.value });
  };

  //this function is run when the Update button is clicked
  const handleClick = async (e) => {
    //it creates anote with the updated input fields value
    const updatedNote = {
      id: note.id, //note id to be updated
      title: note.etitle,
      description: note.edescription,
      tag: note.etag,
    };

    //calls the editNote function of the NoteState and pass the note as the parameter,
    await editNote(updatedNote); //this function updates the note both at backend and the frontend
    setNoteState(note);
    props.showAlert("Note Updated Successfully!","success");
    refClose.current.click(); //this clicks the button which closes the modal
  };

  //ComponentDidMount, this runs as soon as the component is mounted,
  useEffect(() => {
    getNotes(); //this function fetches all the notes from the databse and displays on the client side
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
                    onChange={handleChange}
                    value={note.etitle}
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
                    onChange={handleChange}
                    value={note.edescription}
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
        <div className="container">
          {notes.length === 0 && "No notes to display!"}
        </div>
        {notes.map((note) => {
          //loop running through all the notes
          return (
            //rendering each note
            <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
          );
        })}
      </div>
    </>
  );
}
