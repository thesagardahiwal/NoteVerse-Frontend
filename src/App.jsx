import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar'; // Import Navbar
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoteState from './context/notes/NoteState'; // Import NoteState
import Alert from './components/Alert';
import Notes from './components/Notes'; // Import Notes


function App() {
  return (
    <NoteState>
    <BrowserRouter>
      <Navbar />
      <Alert message="This is Noteverse" />
      <Notes/>
      <Routes>
        <Route path="/" element={<Home />} />
         {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
    </NoteState>
  );
}

export default App;
