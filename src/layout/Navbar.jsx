import { Link } from "react-router";

import classes from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/game">Game</Link></li>
        <li><Link to="/rules">Rules</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;