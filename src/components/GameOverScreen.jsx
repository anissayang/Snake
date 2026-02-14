import React from 'react';

const GameOverScreen = ({ score, duration, onRestart, onViewLeaderboard }) => {
    return (
        <div className="panel">
            <h1 style={{ color: '#E74C3C' }}>GAME OVER</h1>

            <div style={{ marginBottom: '20px', textAlign: 'left', width: '100%' }}>
                <p>SCORE: {score}</p>
                <p>TIME: {duration}s</p>
            </div>

            <button onClick={onRestart} style={{ width: '100%' }}>PLAY AGAIN</button>
            <button onClick={onViewLeaderboard} style={{ width: '100%' }}>VIEW LEADERBOARD</button>
        </div>
    );
};

export default GameOverScreen;
