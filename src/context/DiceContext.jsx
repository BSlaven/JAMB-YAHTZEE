import { createContext, useEffect, useState } from "react";

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
export const ColumnContext = createContext();

export const DiceProvider = ({ children }) => {

  const [ diceValues, setDiceValues ] = useState([]);

  const [ rollNumber, setRollNumber ] = useState(1);

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
    { 
      columnName: 'defaultColumn',
      isRandomColumn: false,
      isDefault: true,
    },
    { 
      columnName: 'downColumn',
      isRandomColumn: false,
      columnNumbersTotal: 0,
      columnDifference: 0,
      columnSetsTotal: 0
    },
    { 
      columnName: 'upColumn',
      isRandomColumn: false,
      columnNumbersTotal: 0,
      columnDifference: 0,
      columnSetsTotal: 0
    },
    { 
      columnName: 'freeColumn',
      isRandomColumn: true,
      columnNumbersTotal: 0,
      columnDifference: 0,
      columnSetsTotal: 0
    },
    { 
      columnName: 'announcementColumn',
      isRandomColumn: true,
      columnNumbersTotal: 0,
      columnDifference: 0,
      columnSetsTotal: 0
    }
  ]);

  const [ columnsTotals, setColumnsTotals ] = useState({
    downColumn: {
      numbersTotals: 0,
      differencesTotals: 0,
      setsTotals: 0
    },
    upColumn: {
      numbersTotals: 0,
      differencesTotals: 0,
      setsTotals: 0
    },
    freeColumn: {
      numbersTotals: 0,
      differencesTotals: 0,
      setsTotals: 0
    },
    announcementColumn: {
      numbersTotals: 0,
      differencesTotals: 0,
      setsTotals: 0
    }
  });

  const addNewTotal = (columnName, newTotalField, addValue) => {
    console.log(columnName, newTotalField, addValue);

    const currentValue = columnsTotals[columnName][newTotalField]
    
    setColumnsTotals(prev => {
      return {
        ...prev,
        [columnName]: {
          ...prev[columnName],
          [newTotalField]: currentValue + addValue
        }
      }
    })
  }

  const numbersTotals = gameColumns
    .map(item => item.columnNumbersTotal)
    .reduce((acc, curr) => acc + curr);

  const differencesTotals = gameColumns
    .map(item => item.columnDifference)
    .reduce((acc, curr) => acc + curr);

  const setsTotals = gameColumns
    .map(item => item.columnSetsTotal)
    .reduce((acc, curr) => acc + curr);

  const checkDice = diceName => {
    if(rollNumber < 2) return;

    setDice(prevDice => {
      return {
        ...prevDice,
        [diceName]: {
          ...prevDice[diceName],
          checked: !prevDice[diceName].checked
        }
      }
    })
  }

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
    
    setDice(prevDice => {
      return {
        ...prevDice,
        ...newDiceValues
      }
    });

    setRollNumber(prev => prev + 1);
  }

  return <DiceContext.Provider value={{
      diceValues,
      dice,
      numbersTotals,
      differencesTotals,
      setsTotals,
      rollNumber,
      checkDice,
      rollDice,
    }}>
      <ColumnContext.Provider value={{
        gameColumns,
        columnsTotals,
        addNewTotal,
      }}>
        {children}
      </ColumnContext.Provider>
  </DiceContext.Provider>
}

export default DiceContext;