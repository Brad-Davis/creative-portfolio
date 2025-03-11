import React from 'react';
import './About.css';
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const About = () => {
  return (
    <div id="about">
      <div className="about-container">
        <div className="about-left">
          <img src="./img/brad.jpg" alt="Profile Photo" />
        </div>
        <div className="about-right">
          <h2>About Me</h2>
          <p>
          As a programmer and musician based in Brooklyn, I spend much of my time collaborating with artists to bring their visions to life. In my solo work, I explore the intersection of music and technology, crafting immersive experiences that push creative boundaries.
          <br></br>
          <br></br>
          After leaving Google last year, I fully committed to the world of arts and technology, diving into a range of exciting projects. Many of these have been made possible through my work with Onassis ONX Studios, where I take on a variety of contract projects. I love transforming my virtual creations into tangible experiences and witnessing the wonder and joy they bring to people.
          <br></br>
          <br></br>
          I'm always eager to collaborate and create, so don't hesitate to reach out with new opportunities.
          </p>
        </div>
      </div>
      <div className="contact-bar">
        <a href="https://www.instagram.com/bcd_rom/" aria-label="Instagram">
          <FaInstagram size={30} />
        </a>
        <a href="https://www.linkedin.com" aria-label="LinkedIn">
          <FaLinkedin size={30} />
        </a>
        <a href="mailto:example@example.com" aria-label="Email">
          <FaEnvelope size={30} />
        </a>
      </div>
    </div>
  );
};

export default About;