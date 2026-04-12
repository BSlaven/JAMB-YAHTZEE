import { useState, useEffect,useContext } from 'react';

import Column from '../Column/Column';

import classes from './OppComponent.module.css';

import DiceContext from "../../context/DiceContext";

import { io } from 'socket.io-client';

const socket = io("http://localhost:3000", {
  withCredentials: true
});

const OppComponent = () => {

  const { dice, diceIcons, showToast } = useContext(DiceContext);

  const [ rollNumber, setRollNumber ] = useState(1)

  const [ opponentData, setOpponentData ] = useState(null);
  const [ opponentDice, setOpponentDice ] = useState(dice);

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
    .map(column => column.find(row => row.fieldDisplay === 'ukupnoSetovi'))
    .map(field => field.value)
    .reduce((acc, curr) => acc + curr)

  useEffect(() => {
    socket.on('opponentData', (data) => {
      setOpponentData(data);
    });

    socket.on('newDiceValues', (data) => {
      setOpponentDice(data.diceWithoutIcons);
      setRollNumber(data.rollNumber);
    });

    return () => {
      socket.off('opponentData');
    }
  }, [])

  useEffect(() => {
    if(numbersTotals || differencesTotals || setsTotals) {
      showToast('info', 'Tvoj potez!');
    };
  }, [numbersTotals, differencesTotals, setsTotals])


  return (
    <div>
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
          {opponentData?.map(column => {
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