import { useContext, useEffect } from 'react';

import { ColumnContext } from '../../context/DiceContext';

import classes from './Fields.module.css';

import Column from '../Column/Column';

const Fields = () => {

  const { columnsTotals, gameColumns } = useContext(ColumnContext);
  
  const filteredColumns = Object.values(columnsTotals).filter(item => !item.isDefault);
  
  useEffect(() => {
    const simpleColumns = gameColumns.map(item => {
      
      return {
        ones: {
          columnName: item.columnName,
          fieldDisplay: 'ones',
          isChecked: false,
          value: 0
        },
        twos: {
          columnName: item.columnName,
          fieldDisplay: 'twos',
          isChecked: false,
          value: 0
        },
        threes: {
          columnName: item.columnName,
          fieldDisplay: 'threes',
          isChecked: false,
          value: 0
        },
        fours: {
          columnName: item.columnName,
          fieldDisplay: 'fours',
          isChecked: false,
          value: 0
        },
        fives: {
          columnName: item.columnName,
          fieldDisplay: 'fives',
          isChecked: false,
          value: 0
        },
        sixes: {
          columnName: item.columnName,
          fieldDisplay: 'sixes',
          isChecked: false,
          value: 0
        },
        numbersTotals: {
          columnName: item.columnName,
          fieldDisplay: 'numbersTotals',
          isChecked: false,
          value: 0
        },
        maximum: {
          columnName: item.columnName,
          fieldDisplay: 'max',
          isChecked: false,
          value: 0
        },
        minimum: {
          columnName: item.columnName,
          fieldDisplay: 'min',
          isChecked: false,
          value: 0
        },
        differenceTotal: {
          columnName: item.columnName,
          fieldDisplay: 'differenceTotal',
          isChecked: false,
          value: 0
        },
        kenta: {
          columnName: item.columnName,
          fieldDisplay: 'kenta',
          isChecked: false,
          value: 0
        },
        triling: {
          columnName: item.columnName,
          fieldDisplay: 'triling',
          isChecked: false,
          value: 0
        },
        ful: {
          columnName: item.columnName,
          fieldDisplay: 'full',
          isChecked: false,
          value: 0
        },
        poker: {
          columnName: item.columnName,
          fieldDisplay: 'poker',
          isChecked: false,
          value: 0
        },
        jamb: {
          columnName: item.columnName,
          fieldDisplay: 'jamb',
          isChecked: false,
          value: 0
        },
        setsTotal: {
          columnName: item.columnName,
          fieldDisplay: 'setsTotal',
          isChecked: false,
          value: 0
        }
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