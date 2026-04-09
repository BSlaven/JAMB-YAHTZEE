import { useState, useEffect,useContext } from 'react';

import { CgDice2, CgDice1, CgDice3, CgDice4, CgDice5, CgDice6 } from "react-icons/cg";

import Fields from '../Fields/Fields';
import Column from '../Column/Column';

import classes from './OppComponent.module.css';

import DiceContext from "../../context/DiceContext";

import { io } from 'socket.io-client';

const socket = io("http://localhost:3000", {
  withCredentials: true
});

const diceIcons = {
  input_dice_1: <CgDice1 />,
  input_dice_2: <CgDice2 />,
  input_dice_3: <CgDice3 />,
  input_dice_4: <CgDice4 />,
  input_dice_5: <CgDice5 />,
  input_dice_6: <CgDice6 />
}

const OppComponent = () => {

  const { dice, diceIcons } = useContext(DiceContext);

  const [ rollNumber, setRollNumber ] = useState(1)

  const [ opponentData, setOpponentData ] = useState(null);
  const [ opponentDice, setOpponentDice ] = useState(dice);

  useEffect(() => {
    socket.on('opponentData', (data) => {
      console.log('Opponent data received:', data);
      setOpponentData(data);
    });

    socket.on('newDiceValues', (data) => {
      console.log('New dice values received:', data);
      setOpponentDice(data.diceWithoutIcons);
    });

    return () => {
      socket.off('opponentData');
    }
  }, [])

  const numbersTotals = opponentData
    ?.map(column => column.columnData)
    .map(column => column.find(row => row.fieldDisplay === 'ukupno'))
    .map(field => field.value)
    .reduce((acc, curr) => acc + curr)

  const differencesTotals = opponentData
    ?.map(column => column.columnData)
    .map(column => column.find(row => row.fieldDisplay === 'razlika'))
    .map(field => field.value)
    .reduce((acc, curr) => acc + curr)

  const setsTotals = opponentData
    ?.map(column => column.columnData)
    .map(column => column.find(row => row.fieldDisplay === 'setoviUkupno'))
    .map(field => field.value)
    .reduce((acc, curr) => acc + curr)

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
              Object.entries(opponentDice).map(([name, die]) => (
                <div
                  key={name}
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

          <div className={classes.fieldsContainer}>
            {opponentData.columnData.map(column => {
              return <Column
                key={column.columnName}
                column={column}
                isOpponent={true}
              />
            })}

            <aside className={classes.totalsContainer}>
              <div 
                className={`${classes.totals} ${classes.numbersTotals}`}>
                  {numbersTotals}
              </div>
              <div
                className={`${classes.totals} ${classes.differencesTotals}`}>
                  {differencesTotals}
              </div>
              <div
                className={`${classes.totals} ${classes.setsTotals}`}>
                  {setsTotals}
              </div>
            </aside>
            <div className={`${classes.totals} ${classes.totalsTotal}`}>
              {numbersTotals + differencesTotals + setsTotals}
            </div>
          </div>

        </section>
    </div>
  )
}

export default OppComponent;