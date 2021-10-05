import { AddNote } from "./AddNote";
import Notes from "./Notes";
function Home(props) {

  return (
    <>
      <AddNote showAlert={props.showAlert}/>  
      <h1>Your Notes</h1> 
      <Notes showAlert={props.showAlert}/>
    </>
  );
}

export default Home;
