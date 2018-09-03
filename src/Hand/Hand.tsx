import * as React from 'react';

interface IProps {
  isGamePlaying: boolean;
}

const Hand = (props: IProps) => {
  if (props.isGamePlaying) {
    return <div>Game Playing</div>;
  } else {
    return <div>Waiting for game to start...</div>;
  }
};

export default Hand;
