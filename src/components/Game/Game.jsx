import classes from './Game.module.css';

import Dice from '../Dice/Dice';
import Fields from '../Fields/Fields';

const Game = () => {
  return (
    <div className={classes.gameContainer}>
      <Dice />
      <Fields />
    </div>
  )
}

export default Game