export const COLORS = {
    background: '#FFD1DC', // Pastel Pink
    snakeHead: '#98FF98',  // Mint Green
    snakeBody: '#7BC47B',  // Slightly darker mint
    text: '#5D4037',       // Dark Brown (better contrast on pink)
    border: '#FFFFFF',

    // Fruits
    apple: '#FF6B6B',      // Red
    banana: '#F1C40F',     // Yellow
    grape: '#9B59B6',      // Purple
    strawberry: '#E74C3C', // Darker Red
    orange: '#E67E22',     // Orange
};

export const GAME_CONFIG = {
    gridSize: 20,          // Size of each grid cell in pixels
    initialSpeed: 150,     // Game loop interval in ms (lower is faster)
    speedIncrement: 2,     // How much to speed up per fruit
    canvasWidth: 400,
    canvasHeight: 400,
};

export const FRUITS = [
    { type: 'apple', color: COLORS.apple, points: 10 },
    { type: 'banana', color: COLORS.banana, points: 15 },
    { type: 'grape', color: COLORS.grape, points: 20 },
    { type: 'strawberry', color: COLORS.strawberry, points: 25 },
    { type: 'orange', color: COLORS.orange, points: 30 },
];
