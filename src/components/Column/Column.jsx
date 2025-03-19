import { useState } from "react";

import classes from './Column.module.css';

const Column = ({ column, isRandomColumn = false }) => {

  const [ columns, setColumns ] = useState({
    ones: {
      // value: 0,
      isAvailable: true,
      name: 'ones',
      next: calculateNextField('toMiddle', 'ones', null, 'twos')
    },
    twos: {
      value: 0,
      isAvailable: false,
      name: 'twos',
      next: 'threes'
    },
    threes: {
      value: 0,
      isAvailable: false,
      name: 'threes',
      next: 'fours'
    },
    fours: {
      value: 0,
      isAvailable: false,
      name: 'fours',
      next: 'fives'
    },
    fives: {
      value: 0,
      isAvailable: false,
      name: 'fives',
      next: 'sixes'
    },
    sixes: {
      value: 0,
      isAvailable: false,
      name: 'sixes',
      next: 'maximum'
    },
    numbersTotal: {
      value: 0
    },
    maximum: {
      value: 0,
      isAvailable: false,
      name: 'maximum',
      next: 'minimum'
    },
    minimum: {
      value: 0,
      isAvailable: false,
      name: 'minimum',
      next: 'triling'
    },
    differenceTotal: {
      value: 0,
    },
    kenta: {
      value: 0,
      isAvailable: false,
      name: 'kenta',
      next: 'triling'
    },
    triling: {
      value: 0,
      isAvailable: false,
      name: 'triling',
      next: 'ful'
    },
    ful: {
      value: 0,
      isAvailable: false,
      name: 'ful',
      next: 'poker'
    },
    poker: {
      value: 0,
      isAvailable: false,
      name: 'poker',
      next: 'jamb'
    },
    jamb: {
      value: 0,
      isAvailable: false,
      name: 'jamb',
      next: null
    },
    setsTotal: {
      value: 0,
    }
  })
  
  return (
    <section className={classes.columnContainer}>
      <h4>{column[0]}</h4>
      {Object.entries(columns).map(item => {
        return <div key={item[0]} className={classes.field}>
          {item[1].value}
        </div>
      })}
    </section>
  )
}

export default Column