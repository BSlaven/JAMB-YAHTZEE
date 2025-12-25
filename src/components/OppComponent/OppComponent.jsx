import { useState, useEffect,useContext } from 'react';

import Dice from '../Dice/Dice';
import Fields from '../Fields/Fields';

import classes from './OppComponent.module.css';

import DiceContext from "../../context/DiceContext";

// import { io } from 'socket.io-client';

// const socket = io("http://localhost:3000", {
//   withCredentials: true
// });

// const diceIcons = {
//   input_dice_1: <CgDice1 />,
//   input_dice_2: <CgDice2 />,
//   input_dice_3: <CgDice3 />,
//   input_dice_4: <CgDice4 />,
//   input_dice_5: <CgDice5 />,
//   input_dice_6: <CgDice6 />
// }

const OppComponent = () => {

  const { dice, diceIcons } = useContext(DiceContext);

  const [ rollNumber, setRollNumber ] = useState(3)

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
          <div className={classes.diceContainer}>
            {
              Object.entries(dice).map(([name, die]) => (
                <div
              className={`${classes.singleDiceContainer} ${die.checked ? classes.checked : null}`}
            >
              {diceIcons[`input_dice_${die.value}`]}
            </div>
              ))
            }
            <button 
              className={classes.rollButton}
            >
              ROLL {rollNumber <= 3 ? rollNumber : 3}
            </button>
          </div>
          {/* <Dice /> */}
          <Fields isOpponent={true} />
        </section>
    </div>
  )
}

export default OppComponent;