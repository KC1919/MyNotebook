import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  let initialNotes = [
    {
      _id: "61498114ea2aaf271e1b692p",
      user: "61480f605932661f7b47c3ba",
      title: "Test1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      tag: "personal",
      date: "2021-09-21T06:52:04.801Z",
      __v: 0,
    },
    {
      _id: "6149830c3fe9929867fbcab3",
      user: "61480f605932661f7b47c3ba",
      title: "Test2",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      tag: "personal",
      date: "2021-09-21T07:00:28.435Z",
      __v: 0,
    },
    {
      _id: "61498114ea2aaf271e1b692n",
      user: "61480f605932661f7b47c3ba",
      title: "Test3",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      tag: "personal",
      date: "2021-09-21T06:52:04.801Z",
      __v: 0,
    },
    {
      _id: "61498114ea2aaf271e1b692m",
      user: "61480f605932661f7b47c3ba",
      title: "Test4",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      tag: "personal",
      date: "2021-09-21T06:52:04.801Z",
      __v: 0,
    },
    {
      _id: "61498114ea2aaf271e1b692l",
      user: "61480f605932661f7b47c3ba",
      title: "Test5",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      tag: "personal",
      date: "2021-09-21T06:52:04.801Z",
      __v: 0,
    },
    {
      _id: "61498114ea2aaf271e1b692f",
      user: "61480f605932661f7b47c3ba",
      title: "Test6",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      tag: "personal",
      date: "2021-09-21T06:52:04.801Z",
      __v: 0,
    },
  ];

  //initializing the state with default state
  const [notes, addnote] = useState(initialNotes);

  const deleteNote = (id) => {
    console.log(id);
    
    const updatedNotes=notes.filter(note=>{
      return note._id!==id
    });
    addnote(updatedNotes);
  }

  const editNote = (id) => {};

  const addNote = (note) => {
    const { title, description } = note;
    const newNote = {
      _id: "61498114ea2aaf271e1b692k",
      user: "61480f605932661f7b47c3ba",
      title: title,
      description: description,
      tag: "",
    };
    addnote(notes.concat(newNote));
  };

  return (
    <NoteContext.Provider //props.children between the NoteContext tage means, that all the children components wrpped between this, will have access to this context and state
      value={{
        //and the value will be available to all the child components
        notes,
        addNote,
        deleteNote,
        editNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
