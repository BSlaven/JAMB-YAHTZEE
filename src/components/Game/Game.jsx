import { useEffect, useContext } from 'react';

import { useParams } from 'react-router';

import { Toaster } from 'sonner';

import classes from './Game.module.css';

import Dice from '../Dice/Dice';
import Fields from '../Fields/Fields';
import OppComponent from '../OppComponent/OppComponent';

import DiceContext from '../../context/DiceContext';

const Game = () => {

  const { roomId } = useParams();

  const { socket, handleJoinRoom } = useContext(DiceContext);

  useEffect(() => {
    handleJoinRoom(roomId);

    return () => {
      socket.emit('leave_game', { roomId });
    }
  }, [roomId])

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