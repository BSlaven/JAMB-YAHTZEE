import { useEffect, useState } from "react";

import { CgDice2, CgDice1, CgDice3, CgDice4, CgDice5, CgDice6 } from "react-icons/cg";

const diceIcons = {
  input_dice_one: <CgDice1 />,
  input_dice_two: <CgDice2 />,
  input_dice_three: <CgDice3 />,
  input_dice_four: <CgDice4 />,
  input_dice_five: <CgDice5 />,
  input_dice_six: <CgDice6 />
}

const Dice = () => {

  const [ rollNumber, setRollNumber ] = useState(1);

  const [ currentDice, setCurrentDice] = useState({
    input_dice_one: {
      label: 'input_dice_one',
      value: 1,
      checked: false
    },
    input_dice_two: {
      label: 'input_dice_two',
      value: 2,
      checked: true
    },
    input_dice_three: {
      label: 'input_dice_three',
      value: 3,
      checked: false
    },
    input_dice_four: {
      label: 'input_dice_four',
      value: 4,
      checked: true
    },
    input_dice_five: {
      label: 'input_dice_five',
      value: 5,
      checked: true
    },
    input_dice_six: {
      label: 'input_dice_six',
      value: 6,
      checked: false
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
        label: item[0]
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
    <section className='dice_cointainer'>
      <div className="dice">
        <div className="input_control">
          <label htmlFor="input_dice_one"></label>
          <input
            type="checkbox"
            name="input_dice_one"
            id="input_dice_one"
          />
        </div>
        <div className="input_control">
          <label htmlFor="input_dice_two"></label>
          <input 
            type="checkbox"
            name="input_dice_two"
            id="input_dice_two" />
        </div>
        <div className="input_control">
          <label htmlFor="input_dice_three"></label>
          <input 
            type="checkbox"
            name="input_dice_three"
            id="input_dice_three" />
        </div>
        <div className="input_control">
          <label htmlFor="input_dice_four"></label>
          <input 
            type="checkbox"
            name="input_dice_four"
            id="input_dice_four" />
        </div>
        <div className="input_control">
          <label htmlFor="input_dice_five"></label>
          <input 
            type="checkbox"
            name="input_dice_five"
            id="input_dice_five" />
        </div>
        <div className="input_control">
          <label htmlFor="input_dice_six"></label>
          <input 
            type="checkbox"
            name="input_dice_six"
            id="input_dice_six" />
        </div>
      </div>
      <button 
        className="roll_button"
        onClick={() => rollDice()}
        disabled={rollNumber > 3}
      >
        ROLL {rollNumber <= 3 ? rollNumber : 3}
      </button>
    </section>
  )
}

export default Dice