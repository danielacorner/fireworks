import React from 'react';
import styled from 'styled-components';
import logo from './logo.svg';

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

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  position: relative;
  .fireworkLauncher {
    height: 30px;
    width: 0;
    border: 10px solid cornflowerblue;
    background: cornflowerblue;
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 999;
  }
  .fireworks {
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

    animation-name: border-dance;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    @keyframes border-dance {
      from {
        background-position: 0% right;
      }
      to {
        background-position: 100% right;
      }
    }
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
    launcherCoords.y,
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
    setFiring(!firing);
  };

  const FireworksStyles = styled.div`
    height: ${distance({
      x1: coords.x,
      x2: launcherCoords.x,
      y1: coords.y,
      y2: launcherCoords.y,
    }) - 50}px;
  `;

  return (
    <AppStyles onMouseMove={handleMouseMove} onMouseDown={handleMouseDown}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div
        className={`fireworkLauncher ${firing ? 'firing' : ''}`}
        style={{ transform: transform }}
      >
        {firing && <FireworksStyles className="fireworks" />}
      </div>
    </AppStyles>
  );
};

export default App;
