import { useState } from 'react';

import Column from '../Column/Column';

const columns = [ 'downColumn', 'freeColumn', 'upColumn', 'announcementColumn']

const Fields = () => {
  return (
    <>
      <h3>Fields</h3>
      {columns.map(column => {
        <Column column={column} />
      })}
    </>
  )
}

export default Fields