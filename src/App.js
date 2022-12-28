import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';




function App() {
  return (
    <>
      {/* wrap our app in <notestate> tags i.e. the components inside notestate and their childerns can have the access to the context(states,functions..) */}
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              {/* <Route exact path="/users" element={<Users/>}/> */}
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
