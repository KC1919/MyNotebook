import { AddNote } from "./AddNote";
import Notes from "./Notes";
function Home() {

  return (
    <>
      <AddNote/>
      <h1>Your Notes</h1>
      <Notes/>
    </>
  );
}

export default Home;
