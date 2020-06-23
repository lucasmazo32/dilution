import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import trendigImg from '../assets/images/music.jpg';
import trendingFn from '../helpers/trending';
import '../assets/style/Trending.css';

const { getPlaylists } = trendingFn;

function Trending({ code }) {
  const [lists, setLists] = useState(null);

  useEffect(() => {
    if (code) {
      getPlaylists(code, setLists);
    }
  }, [code])

  const handleListRender = () => {
    return (
      lists.map(element => {
        console.log(element);
        return (
          <button className="playlist-container btn" key={element.id}>
            <div className="image-container" style={{ backgroundImage: `url(${element.images[0].url})`, backgroundSize: 'cover' }} />
            <span>{ element.name }</span>
          </button>
        )
      })
    )
  };

  return (
    <div className="Trending">
      <div className="cover-img" style={{ backgroundImage: `url(${trendigImg})`, backgroundSize: 'cover' }} />
      { lists ? <div className="options-container">{handleListRender()}</div>  : <div className="center-circular"><CircularProgress /></div> }
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
