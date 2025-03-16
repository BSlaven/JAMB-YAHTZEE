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
    <section>
      <div className="input_control">
        <label htmlFor="game_id">Unesite oznaku igre</label>
        <input
          onChange={(e) => setGameId(e.target.value)}
          value={gameId}
          type="text"
          id="game_id"
          name="game_id"
          placeholder="id igre..."
        />
      </div>

      <button 
        className="enter_game_btn"
        onClick={enterGameHandler}
      >
        Uđi u igru
      </button>
    </section>
  )
}

export default Home