import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/NoteState";

function App() {
  return (
    <>
      {/* wrapping all the components in NoteState,so that we can access it using useContext anywhere */}
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
