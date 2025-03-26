import { BrowserRouter as Router, Routes, Route, Link } from "react-router";

import './App.css';

import Home from "./components/Home/Home";
import Game from "./components/Game/Game";
import { DiceProvider } from "./context/DiceContext";

function App() {
  return (
    <DiceProvider>
      <Router>
        <h1 className='game_title'>
          <Link to={'/'}>
            JAMB
          </Link>
        </h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<Game />} />
        </Routes>
      </Router>
    </DiceProvider>
  )
}

export default App
