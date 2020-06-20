import React from 'react';
import { ReactComponent as Logo } from '../assets/images/discover.svg';
import '../assets/style/Nav.css';

export default function Nav() {
  return (
    <nav className="Nav">
      <Logo className="discover" />
    </nav>
  );
}
