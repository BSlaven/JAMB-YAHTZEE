import { BrowserRouter as Router, Routes, Route } from "react-router";

import './App.css';

import Home from "./components/Home/Home";
import Game from "./components/Game/Game";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
    </Router>
    // <>        
    //   <h1 className='game_title'>IGRAJTE JAMB</h1>
    //   <Dice />
    // </>
  )
}

export default App
