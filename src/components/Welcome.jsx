import React from 'react';
import { Button, withStyles } from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/images/full-logo.svg';
import '../assets/style/Welcome.css';

export default function Welcome() {
  const ColorButton = withStyles((theme) => ({
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
    console.log('I am working');
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
