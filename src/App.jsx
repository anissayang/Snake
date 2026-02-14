import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameCanvas from './components/GameCanvas';
import GameOverScreen from './components/GameOverScreen';
import Leaderboard from './components/Leaderboard';
import { saveScore, getLeaderboard } from './services/api';

function App() {
    const [gameState, setGameState] = useState('START'); // START, PLAYING, GAMEOVER, LEADERBOARD
    const [playerName, setPlayerName] = useState('');
    const [score, setScore] = useState(0);
    const [duration, setDuration] = useState(0);

    const startGame = (name) => {
        setPlayerName(name);
        setGameState('PLAYING');
    };

    const handleGameOver = (finalScore, finalDuration) => {
        setScore(finalScore);
        setDuration(finalDuration);
        setGameState('GAMEOVER');

        // Fire and forget save
        if (playerName) {
            saveScore(playerName, finalScore, finalDuration).catch(err => console.error(err));
        }
    };

    const restartGame = () => {
        setScore(0);
        setDuration(0);
        setGameState('PLAYING');
    };

    const viewLeaderboard = () => {
        setGameState('LEADERBOARD');
    };

    const backToStart = () => {
        setGameState('START');
    };

    return (
        <div className="App">
            {gameState === 'START' && <StartScreen onStart={startGame} />}
            {gameState === 'PLAYING' && <GameCanvas onGameOver={handleGameOver} />}
            {gameState === 'GAMEOVER' && (
                <GameOverScreen
                    score={score}
                    duration={duration}
                    onRestart={restartGame}
                    onViewLeaderboard={viewLeaderboard}
                />
            )}
            {gameState === 'LEADERBOARD' && (
                <Leaderboard
                    onBack={backToStart}
                    fetchLeaderboard={getLeaderboard}
                />
            )}
        </div>
    );
}

export default App;
