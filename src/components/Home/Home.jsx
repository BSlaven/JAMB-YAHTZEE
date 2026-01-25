import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { Toaster } from 'sonner';

import classes from './Home.module.css';

import DiceContext from '../../context/DiceContext';

const Home = () => {


  const navigate = useNavigate();

  const [ gameId, setGameId ] = useState('');
  const { showToast } = useContext(DiceContext);

  const enterGameHandler = () => {
    if(!gameId) {
      showToast('error', 'To polje nije dostupno!')
      return
    };

    navigate(`game/${gameId}`);
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
          <input type="checkbox" name="downColumn" id="downColumn" />
          <label htmlFor="downColumn">Dole</label>
        </div>
        <div className={classes.selection}>
          <input type="checkbox" name="freeColumn" id="freeColumn" />
          <label htmlFor="freeColumn">Sloboda</label>
        </div>
        <div className={classes.selection}>
          <input type="checkbox" name="upColumn" id="upColumn" />
          <label htmlFor="upColumn">Gore</label>
        </div>
        <div className={classes.selection}>
          <input type="checkbox" name="toMiddleColumn" id="toMiddleColumn" />
          <label htmlFor="toMiddleColumn">Do sredine</label>
        </div>
        <div className={classes.selection}>
          <input type="checkbox" name="fromMiddleColumn" id="fromMiddleColumn" />
          <label htmlFor="fromMiddleColumn">Od sredine</label>
        </div>
        <div className={classes.selection}>
          <input type="checkbox" name="announcementColumn" id="announcementColumn" />
          <label htmlFor="announcementColumn">Najava</label>
        </div>
        <div className={classes.selection}>
          <input type="checkbox" name="answerColumn" id="answerColumn" />
          <label htmlFor="answerColumn">Odjava</label>
        </div>
        <div className={classes.selection}>
          <input type="checkbox" name="handColumn" id="handColumn" />
          <label htmlFor="handColumn">Ručna</label>
        </div>
        <div className={classes.selection}>
          <input type="checkbox" name="maximumColumn" id="maximumColumn" />
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