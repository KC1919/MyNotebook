import React, { useState, useContext } from "react";
import NoteContext from "../context/NoteContext";

export const AddNote = () => {
  const context = useContext(NoteContext);
  const { notes, addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "general",
  });

  const onChange = (e) => {
    //here we are using dpread operator,which will push whatever details are present already
    //in the note , and also update the field that we are updating i.e "e.target.name"

    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const addNotes = (e) => {
    e.preventDefault();
    addNote(note);
  };

  return (
    <div className="my-4">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
          />
        </div>
        <button onClick={addNotes} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
