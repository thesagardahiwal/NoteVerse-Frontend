import React, { useEffect, useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

function About() {
  const {context} = useContext(NoteContext);

  useEffect(() => {
    context.update();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='p-4 items-center'>
      <h1 className='text-3xl font-bold'>About</h1>
      Welcome to Noteverse! This is the about page.
      <p>Noteverse is a note-taking app that allows you to create, edit, and delete notes.</p>
      <p>It is built with React, Node.js, and MongoDB.</p>
      <p>Noteverse is open source and available on GitHub.</p>

      <h5>{context.name}</h5>
      <h5>{context.description}</h5>
    </div>
  );
}

export default About;
 