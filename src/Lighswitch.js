import React, { useState } from 'react';
import "./App.css"



const LightSwitch = ({setDarkMode, darkMode}) => {

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className='lightswitch'>
            <img
                src={darkMode ? 'img/off.jpg' : 'img/on.jpg'}
                alt={darkMode ? 'Dark Mode' : 'Light Mode'}
                onClick={toggleDarkMode}
            />
        </div>
    );
};

export default LightSwitch;
