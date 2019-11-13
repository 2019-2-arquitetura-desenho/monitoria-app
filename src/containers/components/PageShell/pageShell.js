import React from 'react';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const styles = {
  fadeIn: {
    animation: 'x 1s',
    animationName: Radium.keyframes(fadeIn, 'fadeIn')
  }
}

const PageShell = (Page) => {
  return props => (
    <StyleRoot>
      <div style={styles.fadeIn}>
        <Page {...props} />
      </div>
    </StyleRoot>
  );
};

export default PageShell;