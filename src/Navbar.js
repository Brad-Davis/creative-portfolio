import React from 'react';
import './App.css';

const Navbar = () => {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav>
            <ul>
                <li>
                    <a href="#projects" onClick={() => scrollToSection('projects')}>
                        Projects
                    </a>
                </li>
                <li>
                    <a href="#music" onClick={() => scrollToSection('music')}>
                        Music
                    </a>
                </li>
                <li>
                    <a href="#about" onClick={() => scrollToSection('about')}>
                        About
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
