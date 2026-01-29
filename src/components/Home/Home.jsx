import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { Toaster } from 'sonner';

import classes from './Home.module.css';

import DiceContext from '../../context/DiceContext';

const Home = () => {


  const navigate = useNavigate();

  const [ gameId, setGameId ] = useState('');
  const { showToast, handleColumnSelection, allColumns } = useContext(DiceContext);

  const enterGameHandler = () => {
    if(!gameId) {
      showToast('error', 'To polje nije dostupno!')
      return
    };

    navigate(`game/${gameId}`);
  }

  const selectColumn = columnName => {
    handleColumnSelection(columnName);
  }
  
  return (
    <main className={classes.home}>
      <Toaster visibleToasts={5} richColors position='top-left' />

      <div className={classes.inputControl}>
        <label htmlFor="game_id">Unesite ID igre</label>
        <input
          onChange={(e) => setGameId(e.target.value)}
          value={gameId}
          type="text"
          id="game_id"
          name="game_id"
          placeholder="id igre..."
        />
      </div>

      <section className={classes.selection_container}>
        <div className={classes.selection}>
          <input 
            type="checkbox"
            name="downColumn"
            id="downColumn"
            value={allColumns.find(col => col.columnName === 'downColumn').isSelected} 
            onChange={() => selectColumn('downColumn')}
          />
          <label htmlFor="downColumn">Dole</label>
        </div>
        <div className={classes.selection}>
          <input 
            type="checkbox"
            name="freeColumn"
            id="freeColumn"
            value={allColumns.find(col => col.columnName === 'freeColumn').isSelected}
            onChange={() => selectColumn('freeColumn')}
          />
          <label htmlFor="freeColumn">Sloboda</label>
        </div>
        <div className={classes.selection}>
          <input
            type="checkbox"
            name="upColumn"
            id="upColumn"
            value={allColumns.find(col => col.columnName === 'upColumn').isSelected}
            onChange={() => selectColumn('upColumn')}
          />
          <label htmlFor="upColumn">Gore</label>
        </div>
        <div className={classes.selection}>
          <input 
            type="checkbox"
            name="toMiddleColumn"
            id="toMiddleColumn"
            value={allColumns.find(col => col.columnName === 'toMiddleColumn').isSelected}
            onChange={() => selectColumn('toMiddleColumn')}
          />
          <label htmlFor="toMiddleColumn">Do sredine</label>
        </div>
        <div className={classes.selection}>
          <input
            type="checkbox"
            name="fromMiddleColumn"
            id="fromMiddleColumn"
            value={allColumns.find(col => col.columnName === 'fromMiddleColumn').isSelected}
            onChange={() => selectColumn('fromMiddleColumn')}
          />
          <label htmlFor="fromMiddleColumn">Od sredine</label>
        </div>
        <div className={classes.selection}>
          <input
            type="checkbox"
            name="announcementColumn"
            id="announcementColumn"
            value={allColumns.find(col => col.columnName === 'announcementColumn').isSelected}
            onChange={() => selectColumn('announcementColumn')}
          />
          <label htmlFor="announcementColumn">Najava</label>
        </div>
        <div className={classes.selection}>
          <input 
            type="checkbox"
            name="answerColumn"
            id="answerColumn"
            value={allColumns.find(col => col.columnName === 'answerColumn').isSelected}
            onChange={() => selectColumn('answerColumn')}
          />

          <label htmlFor="answerColumn">Odjava</label>
        </div>
        <div className={classes.selection}>
          <input
            type="checkbox"
            name="handColumn"
            id="handColumn"
            value={allColumns.find(col => col.columnName === 'handColumn').isSelected}
            onChange={() => selectColumn('handColumn')}
          />
          <label htmlFor="handColumn">Ručna</label>
        </div>
        <div className={classes.selection}>
          <input
            type="checkbox"
            name="maximumColumn"
            id="maximumColumn"
            value={allColumns.find(col => col.columnName === 'maximumColumn').isSelected}
            onChange={() => selectColumn('maximumColumn')}
          />
          <label htmlFor="maximumColumn">Maksimum</label>
        </div>
      </section>

      <button 
        className={classes.enterGameBtn}
        onClick={enterGameHandler}
      >
        Uđi u igru
      </button>
    </main>
  )
}

export default Home