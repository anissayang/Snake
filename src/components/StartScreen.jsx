import React, { useState } from 'react';

const StartScreen = ({ onStart }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onStart(name.trim());
        }
    };

    return (
        <div className="panel">
            <h1>PIXEL SNAKE</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '10px', fontSize: '0.8em' }}>ENTER YOUR NAME:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={15}
                    placeholder="PLAYER 1"
                    autoFocus
                />
                <button type="submit">START GAME</button>
            </form>
        </div>
    );
};

export default StartScreen;
