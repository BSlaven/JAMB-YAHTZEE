import { useContext } from 'react';

import { ColumnContext } from '../../context/DiceContext';

import classes from './Fields.module.css';

import Column from '../Column/Column';

const Fields = () => {

  const { gameColumns } = useContext(ColumnContext);

  const filteredColumns = Object.values(gameColumns).filter(item => !item.isDefault);

  const numbersTotals = filteredColumns
    .map(item => item.columnNumbersTotal)
    .reduce((acc, curr) => acc + curr);

    const differencesTotals = filteredColumns
      .map(item => item.columnDifference)
      .reduce((acc, curr) => acc + curr);

    const setsTotals = filteredColumns
      .map(item => item.columnSetsTotal)
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