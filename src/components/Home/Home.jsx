import { useState } from "react";
import { useNavigate } from "react-router";

import classes from './Home.module.css';

const Home = () => {

  const navigate = useNavigate();

  const [ gameId, setGameId ] = useState('');

  const enterGameHandler = () => {
    if(!gameId) return;

    navigate(`game/${gameId}`);
  }
  
  return (
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

      <input type="checkbox" id="downColumn" name="downColumn" />
      <label htmlFor="downColumn">Dole</label>

      <input type="checkbox" id="freeColumn" name="freeColumn" />
      <label htmlFor="freeColumn">Sloboda</label>
      
      <input type="checkbox" id="upColumn" name="upColumn" />
      <label htmlFor="upColumn">Gore</label>

      <input type="checkbox" id="announcementColumn" name="announcementColumn" />
      <label htmlFor="announcementColumn">Najava</label>

      <input type="checkbox" id="fromMiddleColumn" name="fromMiddleColumn" />
      <label htmlFor="fromMiddleColumn">Od sredine</label>
      
      <input type="checkbox" id="fromMiddleColumn" name="fromMiddleColumn" />
      <label htmlFor="fromMiddleColumn">Do sredine</label>

      <input type="checkbox" id="handColumn" name="handColumn" />
      <label htmlFor="handColumn">Ručna</label>

      <input type="checkbox" id="answerColumn" name="answerColumn" />
      <label htmlFor="answerColumn">Odjava</label>

      <input type="checkbox" id="maximumColumn" name="maximumColumn" />
      <label htmlFor="maximumColumn">Maksimum</label>


      <button 
        className={classes.enterGameBtn}
        onClick={enterGameHandler}
      >
        Uđi u igru
      </button>
    </div>
  )
}

export default Home