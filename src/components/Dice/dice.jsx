import { useEffect, useState, useContext } from "react";

import classes from './Dice.module.css';

import DiceContext from "../../context/DiceContext";

const Dice = () => {

  const [ rollNumber, setRollNumber ] = useState(1);

  const { dice, checkDice } = useContext(DiceContext);

  // useEffect(() => {
  //   console.log('PROMIJENIO SI STATE JUNAČE');
  //   console.log(currentDice);
  // }, [currentDice])

  const rollDice = () => {
    const newDiceValues = {};
    const uncheckedDice = Object.entries(dice).filter(item => !item[1].checked);

    uncheckedDice.forEach(item => {
      const newRandomValue = Math.floor(Math.random() * 6) + 1;
      newDiceValues[item[0]] = {
        checked: false,
        value: newRandomValue,
        label: item[0],
        icon: diceIcons[`input_dice_${newRandomValue}`]
      }
    })
    
    setCurrentDice(prevDice => {
      return {
        ...prevDice,
        ...newDiceValues
      }
    });

    setRollNumber(prev => prev + 1);
  }
  
  return (
    <div className={classes.diceContainer}>
      <div
        onClick={() => checkDice('input_dice_one')}
        className={`${classes.singleDiceContainer} ${dice.input_dice_one.checked ? classes.checked : null}`}
      >
        {dice.input_dice_one.icon}
      </div>
      <div 
        onClick={() => checkDice('input_dice_two')}
        className={`${classes.singleDiceContainer} ${dice.input_dice_two.checked ? classes.checked : null}`}
      >
        {dice.input_dice_two.icon}
      </div>
      <div 
        onClick={() => checkDice('input_dice_three')}
        className={`${classes.singleDiceContainer} ${dice.input_dice_three.checked ? classes.checked : null}`}
      >
        {dice.input_dice_three.icon}
      </div>
      <div 
        onClick={() => checkDice('input_dice_four')}
        className={`${classes.singleDiceContainer} ${dice.input_dice_four.checked ? classes.checked : null}`}
      >
        {dice.input_dice_four.icon}
      </div>
      <div
        onClick={() => checkDice('input_dice_five')}
        className={`${classes.singleDiceContainer} ${dice.input_dice_five.checked ? classes.checked : null}`}
      >
        {dice.input_dice_five.icon}
      </div>
      <div
        onClick={() => checkDice('input_dice_six')}
        className={`${classes.singleDiceContainer} ${dice.input_dice_six.checked ? classes.checked : null}`}
      >
        {dice.input_dice_six.icon}
      </div>
      <button 
        className={classes.rollButton}
        onClick={() => rollDice()}
        disabled={rollNumber > 3}
      >
        ROLL {rollNumber <= 3 ? rollNumber : 3}
      </button>
    </div>
  )
}

export default Dice