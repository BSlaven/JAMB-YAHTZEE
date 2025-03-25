import { useContext } from 'react';

import DiceContext from '../../context/DiceContext';

import classes from './Fields.module.css';

import Column from '../Column/Column';

// const columns = [ 'downColumn', 'freeColumn', 'upColumn', 'announcementColumn']

const Fields = () => {

  const { gameColumns } = useContext(DiceContext);

  console.log(gameColumns);  
  
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