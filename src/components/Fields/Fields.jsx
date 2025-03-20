import { useState } from 'react';

import classes from './Fields.module.css';

import Column from '../Column/Column';

// const columns = [ 'downColumn', 'freeColumn', 'upColumn', 'announcementColumn']
const columns = [ 'downColumn' ]

const Fields = () => {
  
  return (
    <div className={classes.fieldsContainer}>
      {columns.map(column => {
        return <Column key={column} column={column} />
      })}
    </div>
  )
}

export default Fields