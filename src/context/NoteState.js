import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const initialNotes = [
    {
      _id: "61498114ea2aaf271e1b692f",
      user: "61480f605932661f7b47c3ba",
      title: "Testing",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      tag: "personal",
      date: "2021-09-21T06:52:04.801Z",
      __v: 0,
    },
    {
      _id: "6149830c3fe9929867fbcab3",
      user: "61480f605932661f7b47c3ba",
      title: "Test",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      tag: "personal",
      date: "2021-09-21T07:00:28.435Z",
      __v: 0,
    },
    {
      _id: "61498114ea2aaf271e1b692f",
      user: "61480f605932661f7b47c3ba",
      title: "Testing",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      tag: "personal",
      date: "2021-09-21T06:52:04.801Z",
      __v: 0,
    },
    {
      _id: "61498114ea2aaf271e1b692f",
      user: "61480f605932661f7b47c3ba",
      title: "Testing",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      tag: "personal",
      date: "2021-09-21T06:52:04.801Z",
      __v: 0,
    },
    {
      _id: "61498114ea2aaf271e1b692f",
      user: "61480f605932661f7b47c3ba",
      title: "Testing",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      tag: "personal",
      date: "2021-09-21T06:52:04.801Z",
      __v: 0,
    },
    {
      _id: "61498114ea2aaf271e1b692f",
      user: "61480f605932661f7b47c3ba",
      title: "Testing",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      tag: "personal",
      date: "2021-09-21T06:52:04.801Z",
      __v: 0,
    }
  ];

  //initializing the state with default state
  const [notes, setNotes] = useState(initialNotes);

  return (
    <NoteContext.Provider //props.children between the NoteContext tage means, that all the children components wrpped between this, will have access to this context and state
      value={{
        //and the value will be available to all the child components
        notes,
        setNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
