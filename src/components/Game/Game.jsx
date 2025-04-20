import classes from './Game.module.css';

import Dice from '../Dice/Dice';
import Fields from '../Fields/Fields';
import { toast, Toaster } from 'sonner';

const Game = () => {

  return (
    <div className={classes.gameContainer}>

      <Toaster visibleToasts={5} richColors position='top-left' />
      <button
        onClick={() => {
          return toast.success('dobro je majstore!')
        }}
      >toast</button>
      
      <Dice />
      <Fields />
    </div>
  )
}

export default Game