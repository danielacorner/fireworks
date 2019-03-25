import React from 'react';
// import { TransitionGroup } from 'react-transition-group';
// import anime from 'animejs';
import Anime from 'react-anime';

export const Firework = ({ height, array }) => {
  const animeProps = {
    opacity: [0, 1],
    translateY: [0, height],
    delay: (el, i) => i * 200,
  };

  return (
    <Anime key={Math.random()} {...animeProps}>
      {array.map((item, i) => (
        <div key={i} className="firework" />
      ))}
    </Anime>
  );
};
