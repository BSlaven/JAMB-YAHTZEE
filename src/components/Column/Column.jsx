import { useState } from "react";

import classes from './Column.module.css';

const Column = ({ column, isRandomColumn = false }) => {

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
      isAvailable: isRandomColumn || setFieldAvailability(column, 'ones'),
      name: 'ones',
      next: setNextField(column, 'ones', null, 'twos'),
      isChecked: false,
      isPreviousChecked: false
    },
    twos: {
      numberValue: 2,
      isAvailable: isRandomColumn,
      name: 'twos',
      next: setNextField(column, 'twos', 'ones', 'threes'),
      isChecked: false,
      isPreviousChecked: false
    },
    threes: {
      numberValue: 3,
      isAvailable: isRandomColumn,
      name: 'threes',
      next: setNextField(column, 'threes', 'twos', 'fours'),
      isChecked: false,
      isPreviousChecked: false
    },
    fours: {
      numberValue: 4,
      isAvailable: isRandomColumn,
      name: 'fours',
      next: setNextField(column, 'fours', 'threes', 'fives'),
      isChecked: false,
      isPreviousChecked: false
    },
    fives: {
      numberValue: 5,
      isAvailable: isRandomColumn,
      name: 'fives',
      next: setNextField(column, 'fives', 'fours', 'sixes'),
      isChecked: false,
      isPreviousChecked: false
    },
    sixes: {
      numberValue: 6,
      isAvailable: isRandomColumn,
      name: 'sixes',
      next: setNextField(column, 'sixes', 'fives', 'maximum'),
      isChecked: false,
      isPreviousChecked: false
    },
    numbersTotal: {
      value: 0,
    },
    maximum: {
      isAvailable: isRandomColumn || setFieldAvailability(column, 'maximum'),
      name: 'maximum',
      next: setNextField(column, 'maximum', 'sixes', 'minimum'),
      isChecked: false,
      isPreviousChecked: false
    },
    minimum: {
      isAvailable: isRandomColumn || setFieldAvailability(column, 'minimum'),
      name: 'minimum',
      next: setNextField(column, 'minimum', 'maximum', 'kenta'),
      isChecked: false,
      isPreviousChecked: false
    },
    differenceTotal: {
      value: 0,
    },
    kenta: {
      isAvailable: isRandomColumn,
      name: 'kenta',
      next: setNextField(column, 'kenta', 'minimum', 'triling'),
      isChecked: false,
      isPreviousChecked: false
    },
    triling: {
      isAvailable: isRandomColumn,
      name: 'triling',
      next: setNextField(column, 'triling', 'kenta', 'ful'),
      isChecked: false,
      isPreviousChecked: false
    },
    ful: {
      isAvailable: isRandomColumn,
      name: 'ful',
      next: setNextField(column, 'ful', 'triling', 'poker'),
      isChecked: false,
      isPreviousChecked: false
    },
    poker: {
      isAvailable: isRandomColumn,
      name: 'poker',
      next: setNextField(column, 'poker', 'ful', 'jamb'),
      isChecked: false,
      isPreviousChecked: false
    },
    jamb: {
      isAvailable: isRandomColumn || setFieldAvailability(column, 'jamb'),
      name: 'jamb',
      next: setNextField(column, 'jamb', 'poker', null),
      isChecked: false,
      isPreviousChecked: false
    },
    setsTotal: {
      value: 0,
    }
  });

  const fieldClickHandler = ([ fieldName, fieldObject ]) => {
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
          isPreviousChecked: true
        }
      }
    })
  }
  
  return (
    <section className={classes.columnContainer}>
      <h4>{column[0]}</h4>
      {Object.entries(columns).map(item => {
        return (
          <div 
            key={item[0]}
            className={`
              ${classes.field}
              ${item[1].isAvailable ? `${classes.available}` : null}`
            }
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