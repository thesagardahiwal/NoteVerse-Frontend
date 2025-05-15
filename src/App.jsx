import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar'; // Import Navbar
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoteState from './context/notes/NoteState'; // Import NoteState

import Notes from './components/Notes'; // Import Notes
import Login from './pages/Login';
import SignUp from './pages/SignUp';


function App() {
  return (
    <NoteState>
      
    <BrowserRouter>
      <Navbar />
     
      <Routes>
        <Route path="/" element={<Notes/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
    </NoteState>
  );
}

export default App;
