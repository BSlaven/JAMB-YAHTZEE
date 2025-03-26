import { createContext, useState } from "react";

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

  return <DiceContext.Provider value={{
      diceValues,
      dice,
      gameTotals,
      gameColumns
    }}>
    {children}
  </DiceContext.Provider>
}

export default DiceContext;