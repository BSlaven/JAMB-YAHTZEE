import { useEffect, useState } from "react";

import classes from './Dice.module.css';

import { CgDice2, CgDice1, CgDice3, CgDice4, CgDice5, CgDice6 } from "react-icons/cg";

const diceIcons = {
  input_dice_1: <CgDice1 />,
  input_dice_2: <CgDice2 />,
  input_dice_3: <CgDice3 />,
  input_dice_4: <CgDice4 />,
  input_dice_5: <CgDice5 />,
  input_dice_6: <CgDice6 />
}

const Dice = () => {

  const [ rollNumber, setRollNumber ] = useState(1);

  const [ currentDice, setCurrentDice] = useState({
    input_dice_one: {
      label: 'input_dice_one',
      value: 1,
      checked: false,
      icon: diceIcons.input_dice_1
    },
    input_dice_two: {
      label: 'input_dice_two',
      value: 2,
      checked: true,
      icon: diceIcons.input_dice_2
    },
    input_dice_three: {
      label: 'input_dice_three',
      value: 3,
      checked: false,
      icon: diceIcons.input_dice_3
    },
    input_dice_four: {
      label: 'input_dice_four',
      value: 4,
      checked: true,
      icon: diceIcons.input_dice_4
    },
    input_dice_five: {
      label: 'input_dice_five',
      value: 5,
      checked: true,
      icon: diceIcons.input_dice_5
    },
    input_dice_six: {
      label: 'input_dice_six',
      value: 6,
      checked: false,
      icon: diceIcons.input_dice_6
    },
});

  // useEffect(() => {
  //   console.log('PROMIJENIO SI STATE JUNAČE');
  //   console.log(currentDice);
  // }, [currentDice])

  const rollDice = () => {
    const newDiceValues = {};
    const uncheckedDice = Object.entries(currentDice).filter(item => !item[1].checked);

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

  const checkDice = diceName => {
    if(rollNumber < 2) return;

    setCurrentDice(prevDice => {
      return {
        ...prevDice,
        [diceName]: {
          ...prevDice[diceName],
          checked: !prevDice[diceName].checked
        }
      }
    })
  }
  
  return (
    <div className={classes.diceContainer}>
      <div
        onClick={() => checkDice('input_dice_one')}
        className={`${classes.singleDiceContainer} ${currentDice.input_dice_one.checked ? classes.checked : null}`}
      >
        {currentDice.input_dice_one.icon}
      </div>
      <div 
        onClick={() => checkDice('input_dice_two')}
        className={`${classes.singleDiceContainer} ${currentDice.input_dice_two.checked ? classes.checked : null}`}
      >
        {currentDice.input_dice_two.icon}
      </div>
      <div 
        onClick={() => checkDice('input_dice_three')}
        className={`${classes.singleDiceContainer} ${currentDice.input_dice_three.checked ? classes.checked : null}`}
      >
        {currentDice.input_dice_three.icon}
      </div>
      <div 
        onClick={() => checkDice('input_dice_four')}
        className={`${classes.singleDiceContainer} ${currentDice.input_dice_four.checked ? classes.checked : null}`}
      >
        {currentDice.input_dice_four.icon}
      </div>
      <div
        onClick={() => checkDice('input_dice_five')}
        className={`${classes.singleDiceContainer} ${currentDice.input_dice_five.checked ? classes.checked : null}`}
      >
        {currentDice.input_dice_five.icon}
      </div>
      <div
        onClick={() => checkDice('input_dice_six')}
        className={`${classes.singleDiceContainer} ${currentDice.input_dice_six.checked ? classes.checked : null}`}
      >
        {currentDice.input_dice_six.icon}
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