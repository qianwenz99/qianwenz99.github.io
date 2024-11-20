import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import RulesPage from './components/RulesPage';
import GamePage from './components/GamePage';
import './App.css';

function App() {
    return (
        <Router>
            <nav>
                <div className="left">
                    <Link to="/">Minesweeper</Link>
                </div>
                <div className="right">
                    <Link to="/">Home</Link>
                    <Link to="/rules">Rules</Link>
                    <Link to="/game/easy">Easy</Link>
                    <Link to="/game/medium">Medium</Link>
                    <Link to="/game/hard">Hard</Link>
                </div>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/rules" element={<RulesPage />} />
                <Route path="/game/:difficulty" element={<GamePage />} />
            </Routes>
        </Router>
    );
}

export default App;

