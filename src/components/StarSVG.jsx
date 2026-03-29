import React from 'react';

const StarSVG = ({ style }) => (
  <svg viewBox="0 0 24 24" width="40" height="40" stroke="#000" strokeWidth="2" fill="#fbcf00" strokeLinejoin="round" style={{ position: 'absolute', zIndex: 3, ...style }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default StarSVG;
