import { useContext } from 'react';

import { ColumnContext } from '../../context/DiceContext';

import classes from './Fields.module.css';

import Column from '../Column/Column';

const Fields = () => {

  const gameColumns = useContext(ColumnContext);
  
  return (
    <div className={classes.fieldsContainer}>
      {gameColumns.map(column => {
        return <Column 
          key={column.columnName}
          column={column}
        />
      })}
    </div>
  )
}

export default Fields