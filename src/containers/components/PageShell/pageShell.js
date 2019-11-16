import React from 'react';
import { fadeIn, slideInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const styles = {
  fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  },
  slideInUp: {
    animation: 'x 1.5s',
    animationName: Radium.keyframes(slideInUp, 'slideInUp')
  }
}

const PageShell = (Page, effect = 'fadeIn') => {
  let useStyle
  switch (effect) {
    case 'fadeIn':
      useStyle = styles.fadeIn;
      break;
    case 'slideInUp':
      useStyle = styles.slideInUp;
      break;
    default:
      useStyle = styles.fadeIn;
      break;
  }

  return props => (
    <StyleRoot>
      <div style={useStyle}>
        <Page {...props} />
      </div>
    </StyleRoot>
  );
};

export default PageShell;