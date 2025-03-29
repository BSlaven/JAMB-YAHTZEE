import { useState, useContext } from "react";

import { ColumnContext } from "../../context/DiceContext";

import classes from './Column.module.css';

const Column = ({ column }) => {

  const { addNewTotal, columnsTotals } = useContext(ColumnContext);

  console.log(columnsTotals);

  const setNextField = (column, currentField, upField, downField) => {
    let nextField;

    if(column === 'downColumn') nextField = downField;

    if(column === 'upColumn') nextField = upField;
    
    if(column === 'toMiddle') {
      if(currentField === 'maximum' || currentField === 'minimum') return;

      switch(currentField) {
        case 'ones':
        case 'twos':
        case 'threes':
        case 'fours':
        case 'fives':
        case 'sixes':
          nextField = downField
          break;
        case 'kenta':
        case 'triling':
        case 'full':
        case 'poker':
        case 'jamb':
          nextField = upField
          break;
        default:
          nextField = null
      }
    }
    
    if(column === 'fromMiddle') {
      if(currentField === 'ones' || currentField === 'jamb') return;

      switch(currentField) {
        case 'maximum':
        case 'twos':
        case 'threes':
        case 'fours':
        case 'fives':
        case 'sixes':
          nextField = upField
          break;
        case 'kenta':
        case 'triling':
        case 'full':
        case 'poker':
        case 'jamb':
          nextField = upField
          break;
        default:
          nextField = null
      }
    }

    return nextField;
  }

  const setFieldAvailability = (column, field) => {
    if(column === 'downColumn' && field === 'ones') return true;

    if(column === 'upColumn' && field === 'jamb') return true;

    if(column === 'fromMiddle' && (field === 'maximum' || field === 'minimum')) return true;

    if(column === 'toMiddle' && (field === 'ones' || field === 'jamb')) return true;

    return false;
  }

  
  const calculateFieldValue = (field, number) => {
    const dice = [ 2, 4, 6, 6, 2, 1]
    addNewTotal('downColumn', 'numbersTotals', 44);
    
    switch(field) {
      case 'ones':
      case 'twos':
      case 'threes':
      case 'fours':
      case 'fives':
      case 'sixes':
        return dice
          .filter(item => item === number)
          .reduce((acc, curr) => acc + curr);
      
      case 'maximum':
        return dice
          .sort()
          .pop()
          .reduce((acc, curr) => acc + curr);
      
      case 'minimum':
        return dice
          .sort()
          .reverse()
          .pop()
          .reduce((acc, curr) => acc + curr);

      case 'triling':
      case 'kenta':
      case 'full':
      case 'poker':
      case 'jamb':
        return calculateSetValue(field);
    }
  }
  
  const calculateSetValue = (field) => {
    const valuesObject = {}
    for(value of dice) {
      if(!valuesObject.value) {
        valuesObject[value] = 1;
        return
      }
      valuesObject[value]++;
    }

    const mapArray = Object.entries(valuesObject);
    let multiplesOfTheSame;

    switch(field) {
      case 'triling':
        multiplesOfTheSame = mapArray.filter(item => item[1] >= 3);
        return Math.max(multiplesOfTheSame)[0] * 3 + 20;
      case 'kenta':
        const uniqueSet = new Set(...mapArray.map(item => item[1]))
        if(uniqueSet.length >= 5) return 45;
        return 45;
      case 'full':
        const filteredMap = mapArray.filter(item => item[1] >= 2);
        if(filteredMap.length === 2 && filteredMap.some(item => item[1] === 3)) {
          const total = filteredMap
            .map(item => parseInt(item[0]) * item[1])
            .reduce((acc, curr) => acc + curr)
          return total + 30;
        }
        return 0;
      case 'poker':
        multiplesOfTheSame = mapArray.filter(item => item[1] >= 4);
        if(multiplesOfTheSame.length === 0) return 0;
        return multiplesOfTheSame[0] * 4 + 40;
      case 'jamb':
        multiplesOfTheSame = mapArray.filter(item => item[1] >= 5);
        if(multiplesOfTheSame.length === 0) return 0;
        return multiplesOfTheSame[0] * 5 + 50;
      default:
        return 0;
    }
  }

  const [ columns, setColumns ] = useState({
    ones: {
      numberValue: 1,
      isAvailable: column.isRandomColumn || setFieldAvailability(column.columnName, 'ones'),
      name: 'ones',
      fieldDisplay: 1,
      next: setNextField(column.columnName, 'ones', null, 'twos'),
      isChecked: false,
      isPreviousChecked: false
    },
    twos: {
      numberValue: 2,
      isAvailable: column.isRandomColumn,
      name: 'twos',
      fieldDisplay: 2,
      next: setNextField(column.columnName, 'twos', 'ones', 'threes'),
      isChecked: false,
      isPreviousChecked: false
    },
    threes: {
      numberValue: 3,
      isAvailable: column.isRandomColumn,
      name: 'threes',
      fieldDisplay: 3,
      next: setNextField(column.columnName, 'threes', 'twos', 'fours'),
      isChecked: false,
      isPreviousChecked: false
    },
    fours: {
      numberValue: 4,
      isAvailable: column.isRandomColumn,
      name: 'fours',
      fieldDisplay: 4,
      next: setNextField(column.columnName, 'fours', 'threes', 'fives'),
      isChecked: false,
      isPreviousChecked: false
    },
    fives: {
      numberValue: 5,
      isAvailable: column.isRandomColumn,
      name: 'fives',
      fieldDisplay: 5,
      next: setNextField(column.columnName, 'fives', 'fours', 'sixes'),
      isChecked: false,
      isPreviousChecked: false
    },
    sixes: {
      numberValue: 6,
      isAvailable: column.isRandomColumn,
      name: 'sixes',
      fieldDisplay: 6,
      next: setNextField(column.columnName, 'sixes', 'fives', 'maximum'),
      isChecked: false,
      isPreviousChecked: false
    },
    numbersTotal: {
      value: 0,
      fieldDisplay: 'ukupno',
    },
    maximum: {
      isAvailable: column.isRandomColumn || setFieldAvailability(column.columnName, 'maximum'),
      name: 'maximum',
      fieldDisplay: 'max',
      next: setNextField(column.columnName, 'maximum', 'sixes', 'minimum'),
      isChecked: false,
      isPreviousChecked: false
    },
    minimum: {
      isAvailable: column.isRandomColumn || setFieldAvailability(column.columnName, 'minimum'),
      name: 'minimum',
      fieldDisplay: 'min',
      next: setNextField(column.columnName, 'minimum', 'maximum', 'kenta'),
      isChecked: false,
      isPreviousChecked: false
    },
    differenceTotal: {
      value: 0,
      fieldDisplay: 'razlika',
    },
    kenta: {
      isAvailable: column.isRandomColumn,
      name: 'kenta',
      fieldDisplay: 'kenta',
      next: setNextField(column.columnName, 'kenta', 'minimum', 'triling'),
      isChecked: false,
      isPreviousChecked: false
    },
    triling: {
      isAvailable: column.isRandomColumn,
      name: 'triling',
      fieldDisplay: 'triling',
      next: setNextField(column.columnName, 'triling', 'kenta', 'ful'),
      isChecked: false,
      isPreviousChecked: false
    },
    ful: {
      isAvailable: column.isRandomColumn,
      name: 'ful',
      fieldDisplay: 'ful',
      next: setNextField(column.columnName, 'ful', 'triling', 'poker'),
      isChecked: false,
      isPreviousChecked: false
    },
    poker: {
      isAvailable: column.isRandomColumn,
      name: 'poker',
      fieldDisplay: 'poker',
      next: setNextField(column.columnName, 'poker', 'ful', 'jamb'),
      isChecked: false,
      isPreviousChecked: false
    },
    jamb: {
      isAvailable: column.isRandomColumn || setFieldAvailability(column.columnName, 'jamb'),
      name: 'jamb',
      fieldDisplay: 'jamb',
      next: setNextField(column.columnName, 'jamb', 'poker', null),
      isChecked: false,
      isPreviousChecked: false
    },
    setsTotal: {
      value: 0,
      fieldDisplay: 'ukupno',
    }
  });

  const fieldClickHandler = ([ fieldName, fieldObject ]) => {
    if(!fieldObject.isAvailable) return;

    const next = columns[fieldObject.next].name;

    setColumns(prev => {
      return {
        ...prev,
        [fieldName]: {
          ...fieldObject,
          isChecked: true,
          value: calculateFieldValue(fieldName, fieldObject.numberValue)
        },
        [next]: {
          ...columns[next],
          isPreviousChecked: true,
          isAvailable: true
        }
      }
    })
  }

  const unclickable = element => {
    return (element === 'ukupno' || element === 'razlika')
  }
  
  return (
    <section className={classes.columnContainer}>
      <h4>{column.columnName[0]}</h4>
      {Object.entries(columns).map(item => {
        if(column.isDefault) {
          return <div 
            key={item[0]}
            className={`
              ${classes.field}
              ${classes.default}
              ${unclickable(item[1].fieldDisplay) ? `${classes.dark}` : null}
            `}
          >
            {item[1].fieldDisplay}
          </div>
        }

        return (
          <div 
            key={item[0]}
            className={`
              ${classes.field}
              ${(item[1].isAvailable && !item[1].isChecked) ? `${classes.available}` : null}
              ${unclickable(item[1].fieldDisplay) ? `${classes.dark}` : null}
            `}
            onClick={() => fieldClickHandler(item)}
          >
            {item[1].isChecked ? item[1].value : null}
          </div>
        )
      })}
    </section>
  )
}

export default Column