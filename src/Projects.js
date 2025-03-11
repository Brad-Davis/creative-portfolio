import React, { useState, useEffect } from 'react';
import ImageGallery from "react-image-gallery";
// import stylesheet if you're not already using CSS @import
import "react-image-gallery/styles/css/image-gallery.css";
import './Projects.css';

const projects = [
  { 
    id: 1, 
    title: 'Morning Light', 
    roleTitle: 'Creative Technologist/Score Composer',
    links: [{link: 'https://www.instagram.com/chachafestival/?hl=en', text: 'Cha Cha Fest Instagram'}, {link: 'https://interiordesign.net/designwire/highlights-from-new-yorks-cha-cha-festival/#:~:text=Oolong%20Tea%20House%3A%20Morning%20Light%20by%20Aaron%20Santiago%20%26%20Michaela%20Ternasky%2DHolland&text=Michaela%20Ternasky%2DHolland-,Oolong%20Tea%20House.,-Visual%20artists%20Aaron', text: 'Press from Interior Design Magazine'}],
    techUsed: 'Javascript, Tone.js, Socket.io, OpenAI GPT, Touchdesigner, Ableton',
    description: 'An immersive installation surrounding the ancient art of tea leaf reading. Participants place down their tea cup where and are offers divine wisdom in return.', 
    // details: 'This project uses cutting-edge technologies like React and Node.js. It has been implemented with the goal of solving real-world problems.',
    imageUrl: './img/morningLight.jpg',
    gallery: [
      {original: "./img/ml2.jpg", }, 
      {original: "./img/ml1.jpg", }, 
      {original: "./img/ml3.jpg", }, 
      {original: "./img/ml4.jpg", }, 
     ],
  },
  { 
    id: 2, 
    title: 'Under The Radar: A {Room} of One\'s Own', 
    roleTitle: 'Score Composer/Technical Director',
    links: [{link: "https://utrfest.org/program/a-room-of-ones-own/", text: "Under The Radar Festival"}],
    
    techUsed: 'Ableton, Touchdesigner, Live Mixing',
    description: 'A {room} of one’s own is an XR performance and hysterical journey about making creative work within a confined space.', 
    details: '',
    imageUrl: './img/roomOfOnesOwn.jpg',
    gallery: [
      {original: "./img/room3.jpg", }, 
      {original: "./img/room2.jpg", }, 
      {original: "./img/room1.jpg", }, 
      {original: "./img/room4.jpg", }],
  },
  { 
    id: 3, 
    title: 'Fras Fest', 
    roleTitle: 'Head Organizer/Performer',
    techUsed: 'Ableton, Lighting Design, Live Mixing',
    description: 'A music festival showcasing amazing artists from across the northeastern music scene working alongside technical artists to create a holy unique experience. With over 30 artists involved this festival is the most ambitious live undertaking I\'ve ever been a part of.', 
    // details: 'The idea was simple yet powerful. It was implemented in various industries and quickly became a standard solution.',
    imageUrl: './img/frasFest.jpg'
  },
  { 
    id: 4, 
    title: 'Please Wake Up Daddy', 
    roleTitle: 'Co-Creator',
    links: [{link: "https://pleasewakeupdaddy.com/", text: "Web Experience"}],
    techUsed: 'Javascript, Three.js, Web Audio API, Blender',
    description: 'An interactive installation that requires the audience to scream to wake up their sleeping father for a unique surprise. We are currently building out this experience into a larger videogame/theater experience. There is also a website version of this experience that you can interact with now.', 
    // details: 'The project incorporated new research and techniques to improve both speed and accuracy, leading to significant performance gains.',
    imageUrl: './img/wakeUpDaddy.jpg'
  },
  { 
    id: 5, 
    title: 'Theater Royale', 
    roleTitle: 'Creative Technologist',
    techUsed: 'Javascript, Socket.io, OBS',
    links: [{link: "https://www.americantheatre.org/2025/03/07/game-plays-the-thing-for-new-fortnite-based-theatre-company/", text: "Press: American Theater"}],
    description: 'It’s both a theater company and an interactive livestream. Two actors perform a play—currently in rotation are Waiting for Godot by Samuel Beckett, Antigone by Sophocles, and Love Letters by A. R. Gurney—while simultaneously playing the video game Fortnite.', 
    // details: 'Its impact has been felt worldwide, providing sustainable and long-lasting solutions to environmental challenges.',
    imageUrl: './img/theaterRoyal.jpg'
  },
  { 
    id: 6, 
    title: 'Dear Dancer', 
    roleTitle: 'Creative Technologist/Web Developer',
    techUsed: 'Javascript, Three.js, Blender',
    description: 'A web experience that allows the user to interact with a 3D dancer via typing. Each letter is uniquely mapped to a dance move which have all been performed and mapped onto a avatar, and as the user types the words will be perfomred back at the user.', 
    // details: 'Its impact has been felt worldwide, providing sustainable and long-lasting solutions to environmental challenges.',
    imageUrl: './img/dearDancer.png'
  },
  { 
    id: 7, 
    title: 'To Start in the Dark', 
    techUsed: 'Ableton, Acelorometers, Max For Live',
    description: 'A live performance/Interactive installation that explored movement based control of music. The goal was to create an unstandable system that could be explored much like coming into contact with a new instrument or an unfamiliar way to express yourself that can be easily explored.', 
    // details: 'This project revolutionized how we approach day-to-day tasks, integrating AI and automation for seamless results.',
    imageUrl: './img/toStartInTheDark.jpg'
  },
  { 
    id: 8, 
    title: 'Tempo Turtle', 
    links: [{link: "https://tempoturtle.com/", text: "Our Website"}],
    techUsed: 'React, Three.js, Juce, C++',
    description: 'A company I started with my friend for our exploration of music technology both on the hardware and software side. We have created a couple of products and are currently working on creating a couple open-source software effects.', 
    // details: 'Its impact has been felt worldwide, providing sustainable and long-lasting solutions to environmental challenges.',
    imageUrl: './img/tempoTurtle.jpg'
  },
];

const Projects = () => {
  const [expandedProjectId, setExpandedProjectId] = useState(null);

  const handleClick = (id) => {
    // Toggle the expanded state for the clicked project
    setExpandedProjectId(expandedProjectId === id ? null : id);
    if (expandedProjectId === id) return; // If already expanded, do not scroll again
    const element = document.getElementById(`project-${id}`);
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }, 200); // Add a 200ms delay before scrolling
  };

  const lazyLoadImages = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(lazyLoadImages, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
  
    const images = document.querySelectorAll('.lazy-load');
    images.forEach(img => observer.observe(img));
  
    return () => {
      images.forEach(img => observer.unobserve(img));
      observer.disconnect();
    };
  }, []);

  return (
    <div id="projects" className="projects-container">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div 
            key={project.id} 
            id={`project-${project.id}`}
            className={`project-card ${expandedProjectId === project.id ? 'expanded' : ''}`} 
          >
            <img onClick={() => handleClick(project.id)} src={project.imageUrl} alt={project.title} className="project-image" />
            
            <div className="project-text">
              <h3 onClick={() => handleClick(project.id)}>{project.title}</h3>
              <h5>{project.roleTitle}</h5>
              {expandedProjectId === project.id && project.techUsed && (<h5>Tools: {project.techUsed}</h5>)}
              {expandedProjectId === project.id && project.links && (
                <>
                  <h5 key="list" style={{marginBottom: 0}}>Links:</h5>
                  <ul>
                    {project.links.map((link, index) => (
                      <li><a className='project-links' href={link.link} target="_blank" rel="noopener noreferrer" key={index + link.text}>{link.text}</a></li>
                    ))}
                   </ul>
                </>
              )}
              <p>{project.description}</p>
            </div>

            {expandedProjectId === project.id && project.gallery && (
              <div className="project-details">
                {/* <p>{project.details}</p> */}
                <div className="gallery" style={{ maxWidth: '600px', margin: "auto" }}>
                  <ImageGallery items={project.gallery} showPlayButton={false} lazyLoad={true} showThumbnails={false} showFullscreenButton={false}/>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
