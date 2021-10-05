import React, { useState, useContext } from "react";
import NoteContext from "../context/NoteContext";

export const AddNote = (props) => {
  const context = useContext(NoteContext); //using the NoteContext, to avail all the available properties
  const { addNote } = context; //states and functions of the NoteState

  //make a new state for a note with default values
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  //this function is called whenever there is change in the input field of the AddNote form
  const onChange = (e) => {
    //here we are using spread operator,which will push whatever details are present already
    //in the note , and also update the field that we are updating i.e "e.target.name"

    //this keeps on updating the state of the note with the user input
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  //this function is called when the Add button is clicked
  const handleClick = async(e) => {
    e.preventDefault(); //this prevents the form from getting submitted
    await addNote(note); //calls the addNote function of NoteState and pass the note details inputted by the user
    props.showAlert("Note Added Successfully!","success");
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  return (
    <div className="my-4">
      <h2 className="my-3">Add Note</h2>
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
            value={note.title}
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
            value={note.description}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.tag}
          />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} onClick={handleClick} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
