import React, {useState} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  
    // default state
    const s1 = { 
    name: "Kunal",
    class: "11B",
  };
   //initializing the state with default state
  const [state, setstate] = useState(s1);

  //function to update the state
  const update = () => {
    setTimeout(() => {
      setstate({
        name: "Ayush",
        class: "12F",
      });
    }, 1000);
  };

  return (
    <NoteContext.Provider  //props.children between the NoteContext tage means, that all the children components wrpped between this, will have access to this context and state
      value={{             //and the value will be available to all the child components
        state,
        update,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
