import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/images/discover.svg';
import { ReactComponent as Back } from '../assets/images/back.svg';
import '../assets/style/Nav.css';

export default function Nav() {
  const [backClass, setBackClass] = useState('');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setBackClass('closed');
    } else {
      setBackClass('');
    }
  }, [location.pathname])

  const handleClick = () => {
    history.push('/');
  };

  return (
    <nav className="Nav">
      <button onClick={handleClick} className={`btn back ${backClass}`}>
        <Back />
      </button>
      <Logo className="discover" />
    </nav>
  );
}
