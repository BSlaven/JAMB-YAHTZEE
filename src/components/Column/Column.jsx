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

  const [ columns, setColumns ] = useState({
    ones: {
      // value: 0,
      isAvailable: true,
      name: 'ones',
      next: setNextField(column, 'ones', null, 'twos'),
      isChecked: false,
      isPreviousChecked: false
    },
    twos: {
      value: 0,
      isAvailable: false,
      name: 'twos',
      next: setNextField(column, 'twos', 'ones', 'threes'),
      isChecked: false,
      isPreviousChecked: false
    },
    threes: {
      value: 0,
      isAvailable: false,
      name: 'threes',
      next: setNextField(column, 'threes', 'twos', 'fours'),
      isChecked: false,
      isPreviousChecked: false
    },
    fours: {
      value: 0,
      isAvailable: false,
      name: 'fours',
      next: setNextField(column, 'fours', 'threes', 'fives'),
      isChecked: false,
      isPreviousChecked: false
    },
    fives: {
      value: 0,
      isAvailable: false,
      name: 'fives',
      next: setNextField(column, 'fives', 'fours', 'sixes'),
      isChecked: false,
      isPreviousChecked: false
    },
    sixes: {
      value: 0,
      isAvailable: false,
      name: 'sixes',
      next: setNextField(column, 'sixes', 'fives', 'maximum'),
      isChecked: false,
      isPreviousChecked: false
    },
    numbersTotal: {
      value: 0
    },
    maximum: {
      value: 0,
      isAvailable: false,
      name: 'maximum',
      next: setNextField(column, 'maximum', 'sixes', 'minimum'),
      isChecked: false,
      isPreviousChecked: false
    },
    minimum: {
      value: 0,
      isAvailable: false,
      name: 'minimum',
      next: setNextField(column, 'minimum', 'maximum', 'kenta'),
      isChecked: false,
      isPreviousChecked: false
    },
    differenceTotal: {
      value: 0,
    },
    kenta: {
      value: 0,
      isAvailable: false,
      name: 'kenta',
      next: setNextField(column, 'kenta', 'minimum', 'triling'),
      isChecked: false,
      isPreviousChecked: false
    },
    triling: {
      value: 0,
      isAvailable: false,
      name: 'triling',
      next: setNextField(column, 'triling', 'kenta', 'ful'),
      isChecked: false,
      isPreviousChecked: false
    },
    ful: {
      value: 0,
      isAvailable: false,
      name: 'ful',
      next: setNextField(column, 'ful', 'triling', 'poker'),
      isChecked: false,
      isPreviousChecked: false
    },
    poker: {
      value: 0,
      isAvailable: false,
      name: 'poker',
      next: setNextField(column, 'poker', 'ful', 'jamb'),
      isChecked: false,
      isPreviousChecked: false
    },
    jamb: {
      value: 0,
      isAvailable: false,
      name: 'jamb',
      next: setNextField(column, 'jamb', 'poker', null),
      isChecked: false,
      isPreviousChecked: false
    },
    setsTotal: {
      value: 0,
    }
  })
  
  return (
    <section className={classes.columnContainer}>
      <h4>{column[0]}</h4>
      {Object.entries(columns).map(item => {
        console.log(item[0], item[1].next);
        return <div key={item[0]} className={classes.field}>
          {item[0]}
        </div>
      })}
    </section>
  )
}

export default Column