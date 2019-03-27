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
    left: 50%;
    height: 30px;
    bottom: -20px;
    width: 0;
    &:not(.fireworkWrapper) {
      left: calc(50% - 5px);
      border: 10px solid cornflowerblue;
      background: cornflowerblue;
    }
    border: 10px solid transparent;
    z-index: 999;
  }
  .laser {
    z-index: 1;
    position: relative;
    margin-left: -1px;
    margin-top: 40px;
    width: 2px;
    /* Animating Dots & Dashes
    https://zhirzh.github.io/2017/01/27/animating-dots-&-dashes/ */
    background-image: linear-gradient(to top, red 50%, transparent 0%);
    background-size: 8px 12px;
    background-repeat: repeat-y;
    background-position: 0% right;
  }
`;
