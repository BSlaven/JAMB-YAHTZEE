import { useContext, useEffect } from 'react';

import { ColumnContext } from '../../context/DiceContext';

import classes from './Fields.module.css';

import Column from '../Column/Column';

const Fields = ({ isOpponent = false }) => {

  const { columnsTotals, gameColumns } = useContext(ColumnContext);
  
  const filteredColumns = Object.values(columnsTotals).filter(item => !item.isDefault);
  
  useEffect(() => {
    const simpleColumns = gameColumns.map(item => {
      return {
        columnName: item.columnName,
        columnData: [
          { name: 'ones', fieldDisplay: 1 },
          { name: 'twos', fieldDisplay: 2 },
          { name: 'threes', fieldDisplay: 3 },
          { name: 'fours', fieldDisplay: 4 },
          { name: 'fives', fieldDisplay: 5 },
          { name: 'sixes', fieldDisplay: 6 },
          { name: 'numbersTotals', fieldDisplay: 'ukupno', value: 0 },
          { name: 'maximum', fieldDisplay: 'max' },
          { name: 'minimum', fieldDisplay: 'min' },
          { name: 'differenceTotal', fieldDisplay: 'razlika', value: 0 },
          { name: 'kenta', fieldDisplay: 'kenta' },
          { name: 'triling', fieldDisplay: 'triling' },
          { name: 'ful', fieldDisplay: 'ful' },
          { name: 'poker', fieldDisplay: 'poker' },
          { name: 'jamb', fieldDisplay: 'jamb' },
          { name: 'setsTotal', fieldDisplay: 'ukupno', value: 0 }
        ]
      }
    });

    localStorage.setItem('simpleColumns', JSON.stringify(simpleColumns));
  }, []);
  
  const numbersTotals = filteredColumns
    .map(item => item.numbersTotals)
    .reduce((acc, curr) => acc + curr);

  const differencesTotals = filteredColumns
    .map(item => item.differenceTotal)
    .reduce((acc, curr) => acc + curr);

  const setsTotals = filteredColumns
    .map(item => item.setsTotal)
    .reduce((acc, curr) => acc + curr);
  
  return (
    <div className={classes.fieldsContainer}>
      {gameColumns.map(column => {
        return <Column
          key={column.columnName}
          column={column}
          isOpponent={isOpponent}
        />
      })}

      <aside className={classes.totalsContainer}>
        <div className={`${classes.totals} ${classes.numbersTotals}`}>{numbersTotals}</div>
        <div className={`${classes.totals} ${classes.differencesTotals}`}>{differencesTotals}</div>
        <div className={`${classes.totals} ${classes.setsTotals}`}>{setsTotals}</div>
      </aside>
      <div className={`${classes.totals} ${classes.totalsTotal}`}>{numbersTotals + differencesTotals + setsTotals}</div>
    </div>
  )
}

export default Fields