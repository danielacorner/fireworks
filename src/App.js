import React from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import posed from 'react-pose';

// TODO: add order of operations ('uncomment this 1st, this 2nd...')

// const Firework = posed.div({
//   loaded: { opacity: 0, y: 0 },
//   fired: { opacity: 1, y: 100 },
// });
// TODO: how to get height here?
const Firework = posed.div({
  loaded: { opacity: 0, y: 0 },
  fired: { opacity: 1, y: 200 },
});
/*
 * Calculates the angle between AB and the X axis
 * A and B are points (ax,ay) and (bx,by)
 */
// https://stackoverflow.com/questions/42440588/find-inverse-tangent
function getAngleDeg(ax, ay, bx, by) {
  var angleRad = Math.atan((ay - by) / (ax - bx));
  var angleDeg = (angleRad * 180) / Math.PI;

  return angleDeg;
}
// distance between two points
// https://stackoverflow.com/questions/20916953/get-distance-between-two-points-in-canvas
const distance = ({ x1, x2, y1, y2 }) =>
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

const AppStyles = styled.div`
  overflow: hidden;
  background-color: #282c34;
  display: grid;
  align-items: center;
  height: 100vh;
  user-select: none;
  img {
    pointer-events: none;
    height: 100vh;
    width: 100%;
    opacity: 0.4;
  }

  position: relative;
  .launcher {
    height: 30px;
    width: 0;
    border: 10px solid cornflowerblue;
    background: cornflowerblue;
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 999;
  }
  .laser {
    z-index: 1;
    position: relative;
    margin-left: -2px;
    margin-top: 40px;
    width: 4px;
    /* Animating Dots & Dashes
    https://zhirzh.github.io/2017/01/27/animating-dots-&-dashes/ */
    background-image: linear-gradient(to top, red 50%, transparent 0%);
    background-size: 8px 12px;
    background-repeat: repeat-y;
    background-position: 0% right;
  }
  .firework {
    width: 2px;
    height: 20px;
    background: peachpuff;
  }
`;

const App = () => {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [firing, setFiring] = React.useState(false);
  const launcherCoords = { x: window.innerWidth / 2, y: window.innerHeight };

  const angleDeg = getAngleDeg(
    coords.x,
    coords.y,
    launcherCoords.x,
    launcherCoords.y
  );

  // angleDeg ranges from 0 to 90 (vertical) then flips to -90 to 0
  const transform = `rotate(${
    // angleDeg
    angleDeg < 0 ? angleDeg + 270 : angleDeg + 90
  }deg)`;

  const handleMouseMove = event => {
    setCoords({ x: event.pageX, y: event.pageY });
  };

  const handleMouseDown = event => {
    setFiring(true);
  };
  const handleMouseUp = event => {
    setFiring(false);
  };

  const height =
    distance({
      x1: coords.x,
      x2: launcherCoords.x,
      y1: coords.y,
      y2: launcherCoords.y,
    }) - 50;

  const LaserStyles = styled.div`
    height: ${height}px;
  `;

  return (
    <AppStyles
      // set coords on mousemove
      onMouseMove={handleMouseMove}
      // set firing on mousedown/up
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <img src={logo} className="App-logo" alt="logo" />
      <div className="launcher" style={{ transform: transform }}>
        {/* show a laser pointer when we're not firing */}
        {!firing && <LaserStyles className="laser" />}
        {/* change the 'pose' of the firwork when we're firing */}
        <Firework className="firework" pose={firing ? 'fired' : 'loaded'} />
      </div>
    </AppStyles>
  );
};

export default App;
