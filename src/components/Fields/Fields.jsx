import classes from './Fields.module.css';

import Column from '../Column/Column';

const columns = [ 'downColumn', 'freeColumn', 'upColumn', 'announcementColumn']

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