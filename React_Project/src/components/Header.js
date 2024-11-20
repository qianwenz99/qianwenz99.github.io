import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-logo">Minesweeper</h1>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/rules">Rules</Link></li>
                    <li><Link to="/game/easy">Easy</Link></li>
                    <li><Link to="/game/medium">Medium</Link></li>
                    <li><Link to="/game/hard">Hard</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
