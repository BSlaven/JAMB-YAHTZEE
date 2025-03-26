import { useContext } from 'react';

import DiceContext from '../../context/DiceContext';

import classes from './Fields.module.css';

import Column from '../Column/Column';

const Fields = () => {

  const { gameColumns } = useContext(DiceContext);
  
  return (
    <div className={classes.fieldsContainer}>
      {gameColumns.map(column => {
        return <Column 
          key={column.columnName}
          column={column.columnName}
        />
      })}
    </div>
  )
}

export default Fields