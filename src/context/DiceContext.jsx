import { createContext, useEffect, useState } from "react";

import { toast } from 'sonner';

// import { io } from 'socket.io-client';

// const socket = io("http://localhost:3000", {
//   withCredentials: true
// });

import { CgDice2, CgDice1, CgDice3, CgDice4, CgDice5, CgDice6 } from "react-icons/cg";

import { FaAnglesDown } from "react-icons/fa6";
import { FaAnglesUp } from "react-icons/fa6";
import { LuArrowUpDown } from "react-icons/lu";
import { TbCircleDashedLetterO, TbCircleLetterM } from "react-icons/tb";
import { TbCircleDashedLetterN } from "react-icons/tb";
import { TbCircleDashedLetterK } from "react-icons/tb";
import { RiExpandUpDownLine } from "react-icons/ri";
import { RiContractUpDownLine } from "react-icons/ri";

const diceIcons = {
  input_dice_1: <CgDice1 />,
  input_dice_2: <CgDice2 />,
  input_dice_3: <CgDice3 />,
  input_dice_4: <CgDice4 />,
  input_dice_5: <CgDice5 />,
  input_dice_6: <CgDice6 />
}

const columnIcons = {
  defaultColumn: <TbCircleDashedLetterK />,
  downColumn: <FaAnglesDown />,
  upColumn: <FaAnglesUp />,
  freeColumn: <LuArrowUpDown />,
  fromMiddleColumn: <RiExpandUpDownLine />,
  toMiddleColumn: <RiContractUpDownLine />,
  answerColumn: <TbCircleDashedLetterO />,
  announcementColumn: <TbCircleDashedLetterN />,
  maximumColumn: <TbCircleLetterM />,
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

  // useEffect(() => {
  //   sendDiceValues();
  // }, [ dice, rollNumber ]);

  // const sendDiceValues = () => {
  //   console.log('dice', dice)
  //   socket.emit('newDiceValues', {
  //     dice, rollNumber
  //   });
  // }

  const [ allColumns, setColumns ] = useState([
    {
      columnName: 'downColumn',
      isRandomColumn: false,
      orderNumber: 1,
      isSelected: false,
    },
    {
      columnName: 'upColumn',
      isRandomColumn: false,
      orderNumber: 2,
      isSelected: false,
    },
    {
      columnName: 'freeColumn',
      isRandomColumn: true,
      orderNumber: 3,
      isSelected: false,
    },
    {
      columnName: 'toMiddleColumn',
      isRandomColumn: false,
      orderNumber: 4,
      isSelected: false,
    },
    {
      columnName: 'fromMiddleColumn',
      isRandomColumn: false,
      orderNumber: 5,
      isSelected: false,
    },
    {
      columnName: 'announcementColumn',
      isRandomColumn: false,
      orderNumber: 6,
      isSelected: false,
    },
    {
      columnName: 'answerColumn',
      isRandomColumn: true,
      orderNumber: 7,
      isSelected: false,
    },
    {
      columnName: 'handColumn',
      isRandomColumn: true,
      orderNumber: 7,
      isSelected: false,
    },
    {
      columnName: 'maximumColumn',
      isRandomColumn: true,
      orderNumber: 8,
      isSelected: false,
    }
  ]);

  const handleColumnSelection = (columnName) => {
    const columnsCopy = structuredClone(allColumns);
    const selectedColumn = columnsCopy.find(item => item.columnName === columnName);
    selectedColumn.isSelected = !selectedColumn.isSelected;
    setColumns(columnsCopy);
  }

  const gameColumns = allColumns
    .filter(item => item.isSelected)
    .sort((a, b) => a.orderNumber - b.orderNumber);

    console.log('gameColumns', gameColumns)

  const [ columnsTotals, setColumnsTotals ] = useState({
    downColumn: {
      numbersTotals: 0,
      differenceTotal: 0,
      setsTotal: 0
    },
    upColumn: {
      numbersTotals: 0,
      differenceTotal: 0,
      setsTotal: 0
    },
    freeColumn: {
      numbersTotals: 0,
      differenceTotal: 0,
      setsTotal: 0
    },
    announcementColumn: {
      numbersTotals: 0,
      differenceTotal: 0,
      setsTotal: 0
    }
  });

  const addNewTotal = (columnName, newTotalField, addValue) => {
    const currentValue = columnsTotals[columnName][newTotalField]

    if(newTotalField === 'differenceTotal') {
      setColumnsTotals(prev => {
        return {
          ...prev,
          [columnName]: {
            ...prev[columnName],
            [newTotalField]: addValue
          }
        }
      })
      return
    }

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
    .reduce((acc, curr) => acc + curr, 0);

  const differencesTotals = gameColumns
    .map(item => item.columnDifference)
    .reduce((acc, curr) => acc + curr, 0);

  const setsTotals = gameColumns
    .map(item => item.columnSetsTotal)
    .reduce((acc, curr) => acc + curr, 0);

  const checkDice = diceName => {
    if(rollNumber > 2) return;

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

  const showToast = (status, message) => {
    return toast[status](message);
  }

  return <DiceContext.Provider value={{
      diceValues,
      dice,
      diceIcons,
      numbersTotals,
      differencesTotals,
      setsTotals,
      rollNumber,
      allColumns,
      checkDice,
      rollDice,
      showToast,
      handleColumnSelection
    }}>
      <ColumnContext.Provider value={{
        gameColumns,
        columnsTotals,
        columnIcons,
        addNewTotal,
      }}>
        {children}
      </ColumnContext.Provider>
  </DiceContext.Provider>
}

export default DiceContext;