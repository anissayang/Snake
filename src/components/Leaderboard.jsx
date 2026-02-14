import React, { useEffect, useState } from 'react';

// Mock data for initial development
const MOCK_LEADERBOARD = [
    { name: 'ANISSA', score: 120, duration: 45 },
    { name: 'SNAKE_KING', score: 100, duration: 60 },
    { name: 'PIXEL_ART', score: 85, duration: 30 },
];

const Leaderboard = ({ onBack, fetchLeaderboard }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In the future this will call the API
        // For now, simulate loading
        const loadData = async () => {
            try {
                const result = await fetchLeaderboard();
                setData(result);
            } catch (e) {
                console.error("Failed to load leaderboard", e);
                setData(MOCK_LEADERBOARD); // Fallback
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [fetchLeaderboard]);

    return (
        <div className="panel">
            <h2>TOP 3 PLAYERS</h2>

            {loading ? (
                <p>LOADING...</p>
            ) : (
                <table style={{ width: '100%', marginBottom: '20px', fontSize: '0.8em', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '4px solid #5D4037' }}>
                            <th style={{ padding: '10px', textAlign: 'left' }}>#</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>NAME</th>
                            <th style={{ padding: '10px', textAlign: 'right' }}>SCORE</th>
                            <th style={{ padding: '10px', textAlign: 'right' }}>TIME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(0, 3).map((entry, index) => (
                            <tr key={index} style={{ borderBottom: '2px dashed #5D4037' }}>
                                <td style={{ padding: '10px' }}>{index + 1}</td>
                                <td style={{ padding: '10px' }}>{entry.name}</td>
                                <td style={{ padding: '10px', textAlign: 'right' }}>{entry.score}</td>
                                <td style={{ padding: '10px', textAlign: 'right' }}>{entry.duration}s</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <button onClick={onBack}>BACK TO TITLE</button>
        </div>
    );
};

export default Leaderboard;
