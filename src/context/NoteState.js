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
    //function takes the note inputted by the user

    const { title, description, tag } = note; //destructure the note into respective fields

    //make a new note
    const newNote = {
      user:"",
      title: title,
      description: description,
      tag: tag,
    };

    try {
      //make an api call to add the note to the database
      const url = `${host}/api/notes/addNote`;
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newNote),
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("authToken")
        },
      });

      if(response.status){
        const json = await response.json();
        console.log(json);
        //update the state of the notes by appending the newly added note to the notes array
        addnote(notes.concat(newNote));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //Fetching all notes from the database
  const getNotes = async () => {
    const url = `${host}/api/notes/fetchNotes`;

    try {
      //make an api call to fetch all the notes from the database
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("authToken")
        },
      });

      //once we get the response, we convert it into json format
      const json = await response.json();

      //and update the notes array state with the fetched notes, so those are displayed to the user
      addnote(json.result);
    } catch (error) {
      console.log(error.message);
    }
  };

  //function to delete a aprticular note by its id
  const deleteNote = async (id) => {
    console.log(id);

    try {
      //make an api call with the note id to be deleted, which will find the note by id in the database and delete that note
      const url = `${host}/api/notes/delete/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("authToken")
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
      //make an api call with the note id, of the note to be updated
      const url = `${host}/api/notes/update/${note.id}`;
      const response = await fetch(url, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem("authToken")
        },
      });
      //once the note is updated, we get the response
      await response.json();

      //make a deepcopy of the notes array in the notes state
      const notesCopy = JSON.parse(JSON.stringify(notes));

      //loop to find and update the note at the front end
      for (let i = 0; i < notesCopy.length; i++) {
        if (notesCopy[i]._id === note.id) {
          //find the note to be updated on the client side by its "id"
          notesCopy[i].title = note.title; //update all its fields with the new data
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
    <NoteContext.Provider //props.children between the NoteContext tag means, that all the children components wrapped between this, will have access to this context and state
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
