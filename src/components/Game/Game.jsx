import { Toaster } from 'sonner';

import classes from './Game.module.css';

import Dice from '../Dice/Dice';
import Fields from '../Fields/Fields';

const Game = () => {

  return (
    <div className={classes.gameContainer}>

      <Toaster visibleToasts={5} richColors position='top-left' />
      
      <Dice />
      <Fields />

      <Dice isOpponent={true} />
      <Fields isOpponent={true} />
    </div>
  )
}

export default Game