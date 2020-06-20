import React from 'react';
import Nav from './Nav';
import music from '../assets/images/music.jpg';
import random from '../assets/images/random.jpg';
import '../assets/style/Main.css';

export default function Main() {
  return (
    <div className="Main">
      <Nav />
      <button className="discover-block btn">
        <span className="image" style={{background: `url(${music})`, backgroundSize: 'cover'}} />
        <span className="text">Trending</span>
      </button>
      <button className="discover-block btn">
        <span className="image" style={{background: `url(${random})`, backgroundSize: 'cover'}} />
        <span className="text">Random</span>
      </button>
    </div>
  );
}
