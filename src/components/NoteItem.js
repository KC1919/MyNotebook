import React, { useContext } from "react";
import NoteContext from "../context/NoteContext";

export default function NoteItem(props) {
  const { note, updateNote } = props;

  const context = useContext(NoteContext);
  const { deleteNote} = context;

  return (
    <div className="col-md-3">
      <div className="card my-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="d-flex align-items-center">
            <i
              className="far fa-trash-alt mx-2"
              onClick={(e) => {
                deleteNote(note._id);
              }}
            ></i>
            <i className="far fa-edit mx-2" onClick={(e)=>{
              updateNote(note);
            }}></i>
          </div>
        </div>
      </div>
    </div>
  );
}
