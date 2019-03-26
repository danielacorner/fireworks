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
    width: 2px;
    height: 25px;
    background: tomato;
    position: absolute;
    opacity: 0;
  }
`;
const duration = 400;
const payloadsArray = createArrayLengthN(10);
const fragmentsArray = createArrayLengthN(10);

export const Firework = ({ height }) => {
  const getPayloadProps = index => {
    return {
      opacity: [0.7, 0, 0],
      translateY: [0, height * 1.2],
      delay: index * 200,
      easing: 'easeOutSine',
      loop: true,
      duration: duration * 2,
    };
  };

  const getExplosionProps = ({ payloadIndex, fragmentsIndex }) => {
    return {
      opacity: [0, 1, 0],
      translateY: [height, height + 10],
      rotate: [fragmentsIndex * 0, fragmentsIndex * 40],
      scale: [0.5, 1],
      translateX: [0, 40],
      easing: 'easeOutCubic',
      loop: true,
      delay: duration + payloadIndex * 200,
      duration: duration,
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
};
