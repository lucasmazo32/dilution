/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { ReactComponent as Play } from '../assets/images/play.svg';
import { ReactComponent as Pause } from '../assets/images/pause.svg';
import { ReactComponent as Open } from '../assets/images/open.svg';
import { ReactComponent as Replace } from '../assets/images/replace.svg';
import randomTracks from '../helpers/random';
import randomImg from '../assets/images/random.jpg';
import actions from '../actions/index';
import '../assets/style/Random.css';

const { setTrack } = actions;

function Random({ code, setTrack }) {
  const [tracks, setTracks] = useState(null);
  const [audios, setAudios] = useState({});
  const [nowPlaying, setNowPlaying] = useState(null);
  const [spin, setSpin] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (code && tracks === null) {
      setLoading(true);
      randomTracks(code, setTracks, setLoading);
    }
    if (tracks) {
      tracks.forEach((track) => {
        audios[track.id] = new Audio(track.preview_url);
        audios[track.id].addEventListener('ended', () => {
          setNowPlaying(null);
          setTrack(null);
        });
      });
    }
  }, [code, tracks, setTrack, audios]);

  const handlePlay = (id) => {
    if (nowPlaying === null) {
      setNowPlaying(id);
      audios[id].play();
      setTrack(audios[id]);
    } else if (nowPlaying === id) {
      audios[id].pause();
      setNowPlaying(null);
      setTrack(null);
    } else {
      audios[nowPlaying].pause();
      audios[id].play();
      setNowPlaying(id);
      setTrack(audios[id]);
    }
  };

  const handleReplace = () => {
    if (nowPlaying) {
      audios[nowPlaying].pause();
      setNowPlaying(null);
    }
    setAudios({});
    setLoading(true);
    setSpin((curr) => curr + 720);
    randomTracks(code, setTracks, setLoading);
  };

  const renderTracks = () => tracks.map((track) => (
    <div className="single-track-container" key={track.id}>
      <button type="button" onClick={() => handlePlay(track.id)} className="btn btn-track">
        { nowPlaying === track.id ? <Pause /> : <Play /> }
        <span>{ track.name.length > 27 ? `${track.name.slice(0, 27)}...` : track.name }</span>
      </button>
      <a className="btn open-trending" href={track.uri}>
        <Open />
      </a>
    </div>
  ));

  return (
    <div className="Random">
      <div className="cover-img" style={{ backgroundImage: `url(${randomImg})`, backgroundSize: 'cover' }} />
      <button type="button" style={{ transform: `rotate(${spin}deg)` }} onClick={handleReplace} className="btn btn-replace">
        <Replace />
      </button>
      { loading ? <div className="center-circular"><CircularProgress /></div>
        : (
          <div className="list-tracks closed">
            { tracks ? renderTracks() : null }
          </div>
        ) }
    </div>
  );
}

Random.propTypes = {
  code: PropTypes.string,
  setTrack: PropTypes.func.isRequired,
};

Random.defaultProps = {
  code: null,
};

const mapStateToProps = ({ codeReducer: code }) => ({
  code,
});

const mapDispatchToProps = (dispatch) => ({
  setTrack: (myCode) => dispatch(setTrack(myCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Random);
