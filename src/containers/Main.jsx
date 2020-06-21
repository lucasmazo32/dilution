import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import featureTrack from '../helpers/featureTrack';
import music from '../assets/images/music.jpg';
import random from '../assets/images/random.jpg';
import actions from '../actions/index';
import '../assets/style/Main.css';
import DiscoverBlock from '../components/DiscoverBlock';

const { setTrack } = actions;

function Main({ code, track, setTrack }) {
  useEffect(() => {
    featureTrack(code, setTrack);
  }, [setTrack, code])

  console.log(track);

  return (
    <div className="Main">
      <Nav />
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
