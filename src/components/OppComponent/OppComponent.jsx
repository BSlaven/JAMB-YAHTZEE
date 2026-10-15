import { useState, useEffect,useContext } from 'react';

import Column from '../Column/Column';

import classes from './OppComponent.module.css';

import DiceContext from "../../context/DiceContext";

const OppComponent = () => {

  const { dice, diceIcons, showToast, socket } = useContext(DiceContext);

  const [ rollNumber, setRollNumber ] = useState(1)

  const [ opponentData, setOpponentData ] = useState(null);
  const [ opponentDice, setOpponentDice ] = useState(dice);

  // Safe Total Calculations
  const calculateTotal = (fieldKey) => {
    if (!opponentData || !Array.isArray(opponentData)) return 0;

    return opponentData
      .map(col => col.columnData?.find(row => row.fieldDisplay === fieldKey)?.value || 0)
      .reduce((acc, curr) => acc + curr, 0);
  };

  const numbersTotals = calculateTotal('ukupno');
  const differencesTotals = calculateTotal('razlika');
  const setsTotals = calculateTotal('ukupnoSetovi');

  useEffect(() => {
    if(!socket) return;

    const handleOpponentData = (data) => {
      console.log('dobio si podatke')
      console.log('opponentData received: ', data);
      setOpponentData(data);
    };

    const handleNewDiceValues = (data) => {
      console.log('newDiceValues received: ', data);
      setOpponentDice(data.diceWithoutIcons);
      setRollNumber(data.rollNumber);
    };

    socket.on('opponentData', handleOpponentData);
    socket.on('newDiceValues', handleNewDiceValues);

    return () => {
      socket.off('opponentData', handleOpponentData);
      socket.off('newDiceValues', handleNewDiceValues);
    }
  }, [socket, showToast]);

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