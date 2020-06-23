import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { ReactComponent as Back } from '../assets/images/back.svg';
import { ReactComponent as Play } from '../assets/images/play.svg';
import trendigImg from '../assets/images/music.jpg';
import trendingFn from '../helpers/trending';
import '../assets/style/Trending.css';

const { getPlaylists, playlistTracks } = trendingFn;

function Trending({ code }) {
  const [lists, setLists] = useState(null);
  const [classClosed, setClassClosed] = useState('');
  const [playlist, setPlaylist] = useState(null);
  const [listTracks, setListTracks] = useState(null);
  const [audios, setAudios] = useState({});

  useEffect(() => {
    if (code) {
      getPlaylists(code, setLists);
    }
    if (playlist) {
      playlistTracks(code, playlist.tracks.href, setListTracks);
    }
  }, [code, playlist])

  const handleClick = (myplaylist) => {
    setPlaylist(myplaylist);
    setClassClosed(' closed');
  };

  const handleBack = () => {
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
            <span>{ element.name }</span>
          </button>
        )
      })
    )
  };

  const renderTracks = () => {
    return listTracks.map(track => {
      audios[track.track.id] = new Audio(track.track.preview_url);
      return (
        <button className="btn" key={track.track.id}>
          <Play />
          <span>{ track.track.name }</span>
        </button>
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
          { listTracks ? renderTracks() : null }
        </div>
      </div>
    </div>
  )
}

Trending.propTypes = {
  code: PropTypes.string,
};

Trending.defaultProps = {
  code: null,
};

const mapStateToProps = ({ codeReducer: code, trackReducer: track }) => ({
  code,
});

// const mapDispatchToProps = (dispatch) => ({
//   setTrack: (myCode) => dispatch(setTrack(myCode)),
// });

export default connect(mapStateToProps)(Trending);
