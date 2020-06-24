import React from 'react';
import randomImg from '../assets/images/random.jpg';

export default function Random() {
  return (
    <div className="Random">
      <div className="cover-img" style={{ backgroundImage: `url(${randomImg})`, backgroundSize: 'cover' }} />
    </div>
  )
}
