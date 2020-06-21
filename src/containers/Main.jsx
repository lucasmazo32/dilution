import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import featureTrack from '../helpers/featureTrack';
import { ReactComponent as Headphones } from '../assets/images/headphones.svg';
import { ReactComponent as Play } from '../assets/images/play.svg';
import { ReactComponent as Pause } from '../assets/images/pause.svg';
import music from '../assets/images/music.jpg';
import random from '../assets/images/random.jpg';
import actions from '../actions/index';
import '../assets/style/Main.css';
import DiscoverBlock from '../components/DiscoverBlock';
import { CircularProgress } from '@material-ui/core';

const { setTrack } = actions;

function Main({ code, track, setTrack }) {
  const [audio, setAudio] = useState(null);
  // const [playing, setPlaying] = useState(null);
  const [classPlayer, setClassPlayer] = useState('');

  useEffect(() => {
    if (track === null) {
      featureTrack(code, setTrack, setAudio);
    }
  }, [setTrack, code, track])

  const trackName = (name) => {
    if (name.length > 28) {
      return name.slice(0, 28) + '...';
    }
    return name;
  }

  const handlePlay = () => {
    if (audio.paused) {
      audio.play();
      setClassPlayer('playing');
    } else {
      audio.pause();
      setClassPlayer('');
    }
  }

  return (
    <div className="Main">
      <Nav />
      <button className={`btn player ${classPlayer}`} onClick={handlePlay}>
        <Headphones className="headphones" />
        { track ? 
        <div className="player-info">
          <span>{ trackName(track.name) }</span>
          <div className="bars">
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
            <span className="bar bar-4"></span>
            <span className="bar bar-5"></span>
          </div>
        </div> : <CircularProgress /> }
        { audio ? (audio.paused ? <Play className="play" /> : <Pause className="play" />) : null }
      </button>
      <DiscoverBlock image={music} name="Trending" />
      <DiscoverBlock image={random} name="Random" />
    </div>
  );
}

Main.propTypes = {
  code: PropTypes.string,
  track: PropTypes.objectOf(PropTypes.any),
  setTrack: PropTypes.func.isRequired,
};

Main.defaultProps = {
  code: null,
  track: null,
};

const mapStateToProps = ({ codeReducer: code, trackReducer: track }) => ({
  code,
  track,
});

const mapDispatchToProps = (dispatch) => ({
  setTrack: (myCode) => dispatch(setTrack(myCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
