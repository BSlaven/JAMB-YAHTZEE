import { useContext } from 'react';

import DiceContext from '../../context/DiceContext';

import { Toaster } from 'sonner';

import classes from './Game.module.css';

import Dice from '../Dice/Dice';
import Fields from '../Fields/Fields';

const Game = () => {

  const { showToast } = useContext(DiceContext);

  return (
    <div className={classes.gameContainer}>

      <Toaster visibleToasts={5} richColors position='top-left' />
      <button
        onClick={() => showToast('success', 'može majsta!')}
      >
        toast
      </button>
      
      <Dice />
      <Fields />
    </div>
  )
}

export default Game