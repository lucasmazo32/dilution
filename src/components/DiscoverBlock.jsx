import React from 'react';
import PropTypes from 'prop-types';

export default function DiscoverBlock({ image, name, onClick }) {
  return (
    <button type="button" onClick={(e) => onClick(e)} className="discover-block btn">
      <span className="image" style={{ background: `url(${image})`, backgroundSize: 'cover' }} />
      <span className="text">{ name }</span>
    </button>
  );
}

DiscoverBlock.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
