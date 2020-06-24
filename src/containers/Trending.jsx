import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import actions from '../actions/index';
import { ReactComponent as Back } from '../assets/images/back.svg';
import { ReactComponent as Play } from '../assets/images/play.svg';
import { ReactComponent as Pause } from '../assets/images/pause.svg';
import { ReactComponent as Open } from '../assets/images/open.svg';
import trendigImg from '../assets/images/music.jpg';
import trendingFn from '../helpers/trending';
import '../assets/style/Trending.css';

const { getPlaylists, playlistTracks } = trendingFn;
const { setTrack } = actions;

function Trending({ code, setTrack }) {
  const [lists, setLists] = useState(null);
  const [classClosed, setClassClosed] = useState('');
  const [playlist, setPlaylist] = useState(null);
  const [listTracks, setListTracks] = useState(null);
  const [audios, setAudios] = useState({});
  const [nowPlaying, setNowPlaying] = useState(null);

  useEffect(() => {
    if (code) {
      getPlaylists(code, setLists);
    }
    if (listTracks) {
      listTracks.forEach((track) => {
          audios[track.track.id] = new Audio(track.track.preview_url);
          audios[track.track.id].addEventListener('ended', () => {
            setNowPlaying(null);
            setTrack(null);
          });
      });
    }
  }, [code, listTracks, audios, setTrack])

  const handleClick = (myplaylist) => {
    setPlaylist(myplaylist);
    playlistTracks(code, myplaylist.tracks.href, setListTracks);
    setClassClosed(' closed');
  };

  const handleBack = () => {
    if (nowPlaying) {
      audios[nowPlaying].pause();
    }
    setNowPlaying(null);
    setAudios({});
    setListTracks(null);
    setClassClosed('');
  };

  const handleListRender = () => {
    return (
      lists.map(element => {
        return (
          <button className={`btn playlist-container${classClosed}`} key={element.id} onClick={() => handleClick(element)}>
            { element.images[0] ? <div className="image-container" style={{ backgroundImage: `url(${element.images[0].url})`, backgroundSize: 'cover' }} /> : <div className="image-container" style={{ backgroundImage: `url(${trendigImg})`, backgroundSize: 'cover' }} /> }
            <span>{ element.name.length > 12 ? `${element.name.slice(0, 11)}...` : element.name }</span>
          </button>
        )
      })
    )
  };

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

  const renderTracks = () => {
    return listTracks.map(track => {
      return (
        <div className="single-track-container" key={track.track.id}>
          <button onClick={() => handlePlay(track.track.id)} className="btn btn-track">
            { nowPlaying === track.track.id ? <Pause /> : <Play /> }
            <span>{ track.track.name.length > 27 ? `${track.track.name.slice(0, 27)}...` : track.track.name }</span>
          </button>
          <a className="btn open-trending" href={track.track.uri}>
            <Open />
          </a>
        </div>
      )
    })
  };

  return (
    <div className="Trending">
      <div className="cover-img" style={{ backgroundImage: `url(${trendigImg})`, backgroundSize: 'cover' }} />
      { lists ? <div className={`options-container${classClosed}`}>{handleListRender()}</div>  : <div className="center-circular"><CircularProgress /></div> }
      <div className={`tracks-container${classClosed}`}>
        <button className="btn btn-back" onClick={handleBack}>
          <Back />
          <span>{ playlist ? playlist.name : '' }</span>
        </button>
        <div className={`list-tracks${classClosed}`}>
          { listTracks ? renderTracks() : <div className="center-circular center-white"><CircularProgress /></div> }
        </div>
      </div>
    </div>
  )
}

Trending.propTypes = {
  code: PropTypes.string,
  setTrack: PropTypes.func.isRequired,
};

Trending.defaultProps = {
  code: null,
};

const mapStateToProps = ({ codeReducer: code, trackReducer: track }) => ({
  code,
});

const mapDispatchToProps = (dispatch) => ({
  setTrack: (myCode) => dispatch(setTrack(myCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trending);
