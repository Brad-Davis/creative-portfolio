import React from 'react';
import './Music.css';

const Music = () => {
  const musicData = [
    {
        image: './img/musicForMorningLight.jpg',
        title: 'Music for Morning Light',
        role: 'By Bradley CD',
        description: 'A collection of ambient tracks that I made for the Morning Light installation at WSA. These meditative pieces are designed to be played in the background of the installation, creating a calming and peaceful atmosphere.',
        link: "https://distrokid.com/hyperfollow/bradleycd/music-for-morning-light"
    },
    {
        image: './img/noiseBtStatic.jpg',
        title: 'Noise Between Static',
        role: 'By Bradley CD',
        description: 'A mixtape of some of my beats exploring impermance through the lens of a fading radio broadcast. I also built a web experience which you can check out clicking the album cover.',
        link: "https://noisebetweenstatic.com/"
    },
    {
        image: './img/internetFriends.jpg',
        title: 'Internet Friends 4ever',
        role: 'By Bradley CD & V10101A',
        description: 'A collaborative EP with artist/musician Viola He where I played the role of Producer and vocalist. The release of this project coincided with the biggest show I\'ve organized with massive visuals.',
        link: "https://distrokid.com/hyperfollow/v10101abradleycd/internet-friends-2"
    },
    {
        image: './img/barcode.jpeg',
        title: 'Barcode_01',
        role: 'By N.F.G.',
        description: 'A collaborative project with my collective, N.F.G. I co-produced and engineered this project and it features some of our best work to date.',
        link: "https://nfgcollective.bandcamp.com/album/barcode-01"
    },
    {
        image: './img/kingJames.jpeg',
        title: 'King James & His Mulberry Men',
        role: 'By Bradley CD & Jonathan Krauss',
        description: 'A collaborative punk album with my friend and longtime collaborator Jonathan Krauss. This album tells the story of a King watching greed and deceit lead to the downfall of his empire.',
        link: "https://distrokid.com/hyperfollow/kingjamesandhismulberrymen/king-james--his-mulberry-men"
    },
    {
        image: './img/growUp.jpg',
        title: 'Grow Up (single)',
        role: 'By Bradley CD & Dave Langston',
        description: 'A collaborative single with my friend Dave Langston. This song is a single from Dave\'s upcoming project which features a lot of my production.',
        link: "https://distrokid.com/hyperfollow/davelangston2/grow-up-feat-bradley-cd"
    },
    {
        image: './img/exTextBack.jpg',
        title: 'Ex Texts Back (single)',
        role: 'By Bradley CD, Wacko, Cadeau Moreau, & Z The Stranger',
        description: 'A massive collaborative single featuring some of my favorite artists from the Boston Area. I co-produced this track along-side Wacko.',
        link: "https://unitedmasters.com/m/ex-texts-back"
    },
    {
        image: './img/vile.jpg',
        title: 'Vile (single)',
        role: 'By N.F.G.',
        description: 'The first single from Barcode_01 featuring Oh K & Dave Langston. I produced and engineered this track.',
        link: "https://distrokid.com/hyperfollow/bradleycd/vile-feat-oh-k--dave-langston"
    },
  ];

  return (
    <div id="music" style={{padding: "20px"}}>
        <h2>Music</h2>
        <div className="container-music">
            {musicData.map((music, index) => (
                <div key={index} className="col-music">
                    <a href={music.link} target="_blank"><img src={music.image} alt={music.description} /></a>
                    <h3>{music.title}</h3>
                    <p>{music.role}</p>
                    <p className='music-description'>{music.description}</p>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Music;