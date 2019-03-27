import React from 'react';
import Anime from 'react-anime';
import styled from 'styled-components';

const createArrayLengthN = n => Array.from(new Array(n));

const FireworksStyles = styled.div`
  .payload {
    width: 1px;
    height: 15px;
    background: peachpuff;
    position: absolute;
  }
  .explosion {
    width: 4px;
    height: 3px;
    background: tomato;
    position: absolute;
    opacity: 0;
  }
`;
export const DURATION = 400;
export const DELAY = 200;
const PAYLOADS = 10;
const FRAGMENTS = 10;
const payloadsArray = createArrayLengthN(PAYLOADS);
const fragmentsArray = createArrayLengthN(FRAGMENTS);

export const Firework = React.memo(({ height }) => {
  const getPayloadProps = index => {
    return {
      opacity: [0.7, 0, 0],
      translateY: [0, height * 1.2],
      delay: index * DELAY,
      easing: 'easeOutSine',
      loop: false,
      duration: DURATION * 2,
    };
  };

  const getExplosionProps = ({ payloadIndex, fragmentsIndex }) => {
    return {
      opacity: [0, 1, 0],
      translateY: [height, height + 10],
      rotate: [
        fragmentsIndex * 30 * Math.random(),
        fragmentsIndex * 30 * Math.random(),
      ],
      scaleX: [Math.random(), 4 * Math.random()],
      translateX: [0, 40],
      easing: 'easeOutCubic',
      loop: false,
      delay: (DURATION + payloadIndex * DELAY) / PAYLOADS,
      duration: DURATION,
    };
  };

  return (
    <FireworksStyles className="firework">
      {payloadsArray.map((item, payloadIndex) => (
        <div key={Math.random()}>
          <Anime {...getPayloadProps(payloadIndex)}>
            <div className="payload" />
          </Anime>
          <div className="fragments">
            {fragmentsArray.map((item, fragmentsIndex) => (
              <div key={Math.random()}>
                <Anime {...getExplosionProps({ payloadIndex, fragmentsIndex })}>
                  <div className="explosion" />
                </Anime>
              </div>
            ))}
          </div>
        </div>
      ))}
    </FireworksStyles>
  );
});
