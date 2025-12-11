import { useState, useEffect } from 'react';

import Dice from '../Dice/Dice';
import Fields from '../Fields/Fields';

import classes from './OppComponent.module.css'

// import { io } from 'socket.io-client';

// const socket = io("http://localhost:3000", {
//   withCredentials: true
// });

const OppComponent = () => {

  const [ opponentData, setOpponentData ] = useState(null);
  const [ opponentDice, setOpponentDice ] = useState(null);

  // useEffect(() => {
  //   socket.on('opponentData', (data) => {
  //     setOpponentData(data);
  //   });

  //   socket.on('newDiceValues', (data) => {
  //     console.log('New dice values received:', data);
  //     setOpponentDice(data);
  //   });

  //   return () => {
  //     socket.off('opponentData');
  //   }
  // }, [])

  return (
    <div>
      {/* {opponentData && <div>
        <h5>Opponent Data</h5>
        <p>Opponent numbers: {opponentData.columnNumbersTotal}</p>
        <p>Opponent diff: {opponentData.columnDifference}</p>
        <p>Opponent sets: {opponentData.columnSetsTotal}</p>
        <p>Opponent totals: {opponentData.columnNumbersTotal + opponentData.columnDifference + opponentData.columnSetsTotal}</p>
        </div>} */}
        <section className={classes.opponentContainer}>
          <Dice />
          <Fields isOpponent={true} />
        </section>
    </div>
  )
}

export default OppComponent