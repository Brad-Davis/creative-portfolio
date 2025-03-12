import Logo from './Logo.js'
import React, { useState, useEffect } from 'react';
import LightSwitch from './Lighswitch.js';
import './App.css';
import Navbar from './Navbar.js';
import Projects from './Projects.js';
import Music from './Music.js'
import About from './About.js';
import { Helmet } from 'react-helmet';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <>
      <Helmet>
        <title>BCD-ROM</title>
        <meta name="description" content="Bradley CD AKA BCD-ROM is a creative technologist and music producer based in Brooklyn and this is his creative portfolio!" />
        <meta name="theme-color" content="#000000" />
      </Helmet>
      <div className={`App ${darkMode ? 'dark' : 'light'}`}>
        <div className='flexyyy'>
          <Logo darkMode={darkMode}/>
          <Navbar />
          <LightSwitch setDarkMode={setDarkMode} darkMode={darkMode} />
        </div>
        <div className='container'>
          <h1 style={{textAlign: "left", maxWidth: "1300px"}}>Brad Davis is a creative technologist and music producer based in Brooklyn whose work in web and music attempts to bridge the distance that the internet has created.</h1>
          <Projects />
          <Music />
          <About />
        </div>
      </div>
    </>
  );
};

export default App;