import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  let initialNotes = [
    {
      _id: "61498114ea2aaf271e1b692f",
      user: "61480f605932661f7b47c3ba",
      title: "Testing",
      description: "This is my first note!",
      tag: "personal",
      date: {
        $date: "2021-09-21T06:52:04.801Z",
      },
      __v: 0,
    },
  ];

  const host = "http://localhost:5000";

  //initializing the state with default state
  const [notes, addnote] = useState(initialNotes);

  //function to add a new note
  const addNote = async (note) => {
    const { title, description, tag } = note;
    const newNote = {
      _id: "61498114ea2aaf271e1b692k",
      user: "61480f605932661f7b47c3ba",
      title: title,
      description: description,
      tag: tag,
    };

    try {
      const url = `${host}/api/notes/addNote`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newNote),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error.message);
    }
    addnote(notes.concat(newNote));
  };

  //Fetching all notes from the database
  const getNotes = async () => {
    const url = `${host}/api/notes/fetchNotes`;

    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      // console.log(json.result);
      addnote(json.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  //function to delete a aprticular note by its id
  const deleteNote = async (id) => {
    console.log(id);

    try {
      const url = `${host}/api/notes/delete/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error.message);
    }

    const updatedNotes = notes.filter((note) => {
      return note._id !== id;
    });
    addnote(updatedNotes);
  };

  //function to edit a aprticular note by its id
  const editNote = async (note) => {
    try {
      const url = `${host}/api/notes/update/${note.id}`;
      const response = await fetch(url, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await response.json();

      const notesCopy = JSON.parse(JSON.stringify(notes));

      //loop to find and update the note at the front end
      for (let i = 0; i < notesCopy.length; i++) {
        if (notesCopy[i]._id === note.id) {
          notesCopy[i].title = note.title;
          notesCopy[i].description = note.description;
          notesCopy[i].tag = note.tag;
          break;
        }
      }
      // const json = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <NoteContext.Provider //props.children between the NoteContext tage means, that all the children components wrpped between this, will have access to this context and state
      value={{
        //and the value will be available to all the child components
        notes,
        addNote,
        deleteNote,
        editNote,
        getNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
