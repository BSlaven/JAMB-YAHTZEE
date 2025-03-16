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