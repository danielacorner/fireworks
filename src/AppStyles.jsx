import styled from 'styled-components';

export const AppStyles = styled.div`
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
    position: absolute;
    left: calc(50% - 5px);
    bottom: -20px;
    &:not(.fireworkWrapper) {
      height: 30px;
      width: 0;
      border: 10px solid cornflowerblue;
      background: cornflowerblue;
    }
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
`;
