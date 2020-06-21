import React from 'react';
import Nav from './Nav';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import apiFunc from '../api/api';
import music from '../assets/images/music.jpg';
import random from '../assets/images/random.jpg';
import '../assets/style/Main.css';

const { featureArtist } = apiFunc;

function Main({ code }) {
  featureArtist(code).then(response => console.log(response));

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

Main.propTypes = {
  code: PropTypes.string,
};

Main.defaultProps = {
  code: null,
};

const mapStateToProps = ({ codeReducer: code }) => ({
  code,
});

export default connect(mapStateToProps)(Main);
