import { createContext, useState } from "react";

import { CgDice2, CgDice1, CgDice3, CgDice4, CgDice5, CgDice6 } from "react-icons/cg";

const diceIcons = {
  input_dice_1: <CgDice1 />,
  input_dice_2: <CgDice2 />,
  input_dice_3: <CgDice3 />,
  input_dice_4: <CgDice4 />,
  input_dice_5: <CgDice5 />,
  input_dice_6: <CgDice6 />
}

const DiceContext = createContext();

export const DiceProvider = ({ children }) => {

  const [ diceValues, setDiceValues ] = useState([]);

  const [ dice, setDice ] = useState({
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
    }
  });

  const [ gameColumns, setGameColumns ] = useState([
    { columnName: 'downColumn', isRandomColumn: false },
    { columnName: 'upColumn', isRandomColumn: false },
    { columnName: 'freeColumn', isRandomColumn: true },
    { columnName: 'announcementColumn', isRandomColumn: true },
  ]);
  const [ gameTotals, setGameTotals ] = useState({
    numbersTotal: 0,
    differencsTotal: 0,
    setsTotals: 0,
    totalsTotal: 0
  });

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

  return <DiceContext.Provider value={{
      diceValues,
      dice,
      gameTotals,
      gameColumns,
      checkDice
    }}>
    {children}
  </DiceContext.Provider>
}

export default DiceContext;