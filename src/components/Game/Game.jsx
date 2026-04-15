import { useParams } from 'react-router-dom';

import { Toaster } from 'sonner';

import classes from './Game.module.css';

import Dice from '../Dice/Dice';
import Fields from '../Fields/Fields';
import OppComponent from '../OppComponent/OppComponent';

import { io } from 'socket.io-client';

const socket = io("http://localhost:3000", {
  withCredentials: true
});

const Game = () => {

  const { gameId } = useParams();

  return (
    <div className={classes.gameContainer}>

      <Toaster visibleToasts={5} richColors position='top-left' />

      <section className={classes.playerContainer}>
        <Dice />
        <Fields />
      </section>

      <OppComponent />

    </div>
  )
}

export default Game