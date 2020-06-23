import React from 'react';
import { ReactComponent as Logo } from '../assets/images/discover.svg';
import { ReactComponent as Back } from '../assets/images/back.svg';
import '../assets/style/Nav.css';

export default function Nav() {
  return (
    <nav className="Nav">
      <button className="btn back">
        <Back />
      </button>
      <Logo className="discover" />
    </nav>
  );
}
