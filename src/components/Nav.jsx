import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../actions/index';
import { ReactComponent as Logo } from '../assets/images/discover.svg';
import { ReactComponent as Back } from '../assets/images/back.svg';
import '../assets/style/Nav.css';

const { setTrack } = actions;

function Nav({ track, setTrack }) {
  const [backClass, setBackClass] = useState('');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      setBackClass('closed');
      if (track) {
        track.pause();
        setTrack(null);
      }
    } else {
      setBackClass('');
    }
  }, [location.pathname, setTrack, track])

  const handleClick = () => {
    history.push('/');
    if (track) {
      track.pause();
      setTrack(null);
    }
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

Nav.propTypes = {
  code: PropTypes.string,
  setTrack: PropTypes.func.isRequired,
};

Nav.defaultProps = {
  code: null,
};

const mapStateToProps = ({ trackReducer: track }) => ({
  track,
});

const mapDispatchToProps = (dispatch) => ({
  setTrack: (myCode) => dispatch(setTrack(myCode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
