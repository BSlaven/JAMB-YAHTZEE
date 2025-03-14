import { BrowserRouter as Router, Routes, Route, Link } from "react-router";

import './App.css';

import Home from "./components/Home/Home";
import Game from "./components/Game/Game";

function App() {
  return (
    <Router>
      <h1 className='game_title'>
        <Link to={'/'}>
          IGRAJTE JAMB
        </Link>
      </h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Game />} />
      </Routes>
    </Router>
  )
}

export default App
