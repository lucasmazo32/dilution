import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/images/full-logo.svg';
import apiFunctions from '../api/api';
import '../assets/style/Welcome.css';

const { authSpotify } = apiFunctions;

export default function Welcome() {
  const ColorButton = withStyles(() => ({
    root: {
      display: 'block',
      color: '#ffffff',
      width: '80%',
      margin: '0 auto',
      backgroundColor: '#1C75BC',
      textTransform: 'none',
      fontFamily: "'Poppins', sans-serif",
      fontSize: '1.3rem',
      '&:hover': {
        backgroundColor: '#1C75BC',
      },
    },
  }))(Button);

  const handleClick = () => {
    const currUrl = window.location.href;
    window.location.replace(authSpotify(currUrl.slice(0, currUrl.length - 5)));
  };

  return (
    <div className="Welcome">
      <Logo className="logo" />
      <div>
        <ColorButton onClick={handleClick}>
          Connect to Spotify
        </ColorButton>
      </div>
    </div>
  );
}
