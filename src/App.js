import React from 'react';
import { Transition } from 'react-transition-group';
import { AppStyles } from './AppStyles';
import { DELAY, Firework } from './components/Firework';
import logo from './logo.svg';

// TODO: add order of operations ('uncomment this 1st, this 2nd...')

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
const getDistance = ({ x1, x2, y1, y2 }) =>
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

const getTransform = degrees =>
  // angleDeg ranges from 0 to 90 (vertical) then flips to -90 to 0
  `rotate(${degrees < 0 ? degrees + 270 : degrees + 90}deg)`;

const App = () => {
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [firing, setFiring] = React.useState(false);
  const [fireworksArray, setFireworksArray] = React.useState([]);
  const launcherCoords = { x: window.innerWidth / 2, y: window.innerHeight };
  const angleDeg = getAngleDeg(
    coords.x,
    coords.y,
    launcherCoords.x,
    launcherCoords.y,
  );
  const transform = React.useRef(getTransform(angleDeg));
  // TODO: multiple fireworks via useState, pass in transform to Firework, unmount after delay
  const fireworksInterval = React.useRef(null);

  const height =
    getDistance({
      x1: coords.x,
      x2: launcherCoords.x,
      y1: coords.y,
      y2: launcherCoords.y,
    }) - 35;

  const handleMouseMove = event => {
    setCoords({ x: event.pageX, y: event.pageY });
    transform.current = getTransform(
      getAngleDeg(event.pageX, event.pageY, launcherCoords.x, launcherCoords.y),
    );
  };

  const handleMouseDown = () => {
    setFiring(true);
    fireworksInterval.current = setInterval(() => {
      const newFirework = {
        key: `boom! ${Math.random()}`,
        transform: transform.current,
      };
      setFireworksArray([...fireworksArray, newFirework]);
    }, DELAY);
  };
  const handleMouseUp = event => {
    setFiring(false);
    clearInterval(fireworksInterval.current);
    setTimeout(() => setFireworksArray([]), 2000);
  };

  // TODO: pass angle in handleMouseDown to firework object, apply transform separately
  // TODO: change angle passed to firework on mousemove
  // TODO: pop fireworksArray after interval dur + delay

  return (
    <AppStyles
      // set coords on mousemove
      onMouseMove={handleMouseMove}
      // set firing on mousedown/up
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <img src={logo} className="App-logo" alt="logo" />
      <div className="launcher" style={{ transform: transform.current }}>
        {/* show a laser pointer when we're not firing */}
        {!firing && <div className="laser" style={{ height: height }} />}
        {/* change the 'pose' of the firwork when we're firing */}
      </div>
      {firing &&
        fireworksArray.map(fw => (
          <div
            key={fw.key}
            className="launcher fireworkWrapper"
            style={{ transform: fw.transform }}
          >
            <Transition mountOnEnter={true} in={firing} timeout={1200}>
              <Firework height={height + 35} />
            </Transition>
          </div>
        ))}
    </AppStyles>
  );
};

export default App;
