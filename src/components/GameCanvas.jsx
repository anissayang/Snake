import React, { useRef, useEffect, useState } from 'react';
import { COLORS, GAME_CONFIG, FRUITS } from '../constants';

const GameCanvas = ({ onGameOver }) => {
    const canvasRef = useRef(null);
    const requestRef = useRef();
    const frameCountRef = useRef(0);
    const scoreRef = useRef(0);
    const startTimeRef = useRef(Date.now());

    // Game State Refs (mutable for performance in game loop)
    const snakeRef = useRef([{ x: 10, y: 10 }]); // Initial position
    const directionRef = useRef({ x: 0, y: 0 }); // Initial direction (stationary)
    const nextDirectionRef = useRef({ x: 0, y: 0 }); // Buffer for next move to prevent 180 turns
    const fruitRef = useRef(null);
    const particlesRef = useRef([]);
    const speedRef = useRef(GAME_CONFIG.initialSpeed);
    const lastUpdateRef = useRef(0);
    const gameRunningRef = useRef(true);

    // React State for UI overlays (score/time)
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);

    // Helper: Random Integer
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    // Helper: Spawn Fruit
    const spawnFruit = () => {
        let newFruit;
        let isValid = false;
        while (!isValid) {
            const typeIdx = getRandomInt(0, FRUITS.length);
            newFruit = {
                x: getRandomInt(0, GAME_CONFIG.canvasWidth / GAME_CONFIG.gridSize),
                y: getRandomInt(0, GAME_CONFIG.canvasHeight / GAME_CONFIG.gridSize),
                ...FRUITS[typeIdx]
            };
            // Check collision with snake
            // eslint-disable-next-line
            isValid = !snakeRef.current.some(segment => segment.x === newFruit.x && segment.y === newFruit.y);
        }
        fruitRef.current = newFruit;
    };

    // Helper: Create Particles
    const createExplosion = (x, y, color) => {
        for (let i = 0; i < 8; i++) {
            particlesRef.current.push({
                x: x * GAME_CONFIG.gridSize + GAME_CONFIG.gridSize / 2,
                y: y * GAME_CONFIG.gridSize + GAME_CONFIG.gridSize / 2,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 1.0,
                color: color
            });
        }
    };

    // Input Handling
    useEffect(() => {
        const handleKeyDown = (e) => {
            const currentDir = directionRef.current;
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (currentDir.y === 0) nextDirectionRef.current = { x: 0, y: -1 };
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    if (currentDir.y === 0) nextDirectionRef.current = { x: 0, y: 1 };
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (currentDir.x === 0) nextDirectionRef.current = { x: -1, y: 0 };
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (currentDir.x === 0) nextDirectionRef.current = { x: 1, y: 0 };
                    break;
                default:
                    break;
            }
            // Start game on first move if stationary
            if (currentDir.x === 0 && currentDir.y === 0 && (nextDirectionRef.current.x !== 0 || nextDirectionRef.current.y !== 0)) {
                directionRef.current = nextDirectionRef.current;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Touch Handling (Swipe)
    const touchStart = useRef(null);
    const handleTouchStart = (e) => {
        touchStart.current = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
    };

    const handleTouchEnd = (e) => {
        if (!touchStart.current) return;
        const touchEnd = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        };
        const dx = touchEnd.x - touchStart.current.x;
        const dy = touchEnd.y - touchStart.current.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (Math.abs(dx) > 30) {
                if (dx > 0 && directionRef.current.x === 0) nextDirectionRef.current = { x: 1, y: 0 };
                else if (dx < 0 && directionRef.current.x === 0) nextDirectionRef.current = { x: -1, y: 0 };
            }
        } else {
            if (Math.abs(dy) > 30) {
                if (dy > 0 && directionRef.current.y === 0) nextDirectionRef.current = { x: 0, y: 1 };
                else if (dy < 0 && directionRef.current.y === 0) nextDirectionRef.current = { x: 0, y: -1 };
            }
        }
        touchStart.current = null;
    };

    // Main Game Loop
    const gameLoop = (timestamp) => {
        if (!gameRunningRef.current) return;

        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setTime(elapsed);

        if (timestamp - lastUpdateRef.current > speedRef.current) {
            updateGame();
            lastUpdateRef.current = timestamp;
        }

        updateParticles();
        drawGame();
        requestRef.current = requestAnimationFrame(gameLoop);
    };

    const updateGame = () => {
        directionRef.current = nextDirectionRef.current;
        const dir = directionRef.current;
        if (dir.x === 0 && dir.y === 0) return;

        const head = { ...snakeRef.current[0] };
        head.x += dir.x;
        head.y += dir.y;

        const gridW = GAME_CONFIG.canvasWidth / GAME_CONFIG.gridSize;
        const gridH = GAME_CONFIG.canvasHeight / GAME_CONFIG.gridSize;

        if (head.x < 0 || head.x >= gridW || head.y < 0 || head.y >= gridH) {
            handleGameOver();
            return;
        }

        if (snakeRef.current.some(segment => segment.x === head.x && segment.y === head.y)) {
            handleGameOver();
            return;
        }

        const fruit = fruitRef.current;
        if (fruit && head.x === fruit.x && head.y === fruit.y) {
            scoreRef.current += fruit.points;
            setScore(scoreRef.current);
            createExplosion(head.x, head.y, fruit.color);
            speedRef.current = Math.max(50, speedRef.current - GAME_CONFIG.speedIncrement);
            spawnFruit();
        } else {
            snakeRef.current.pop();
        }
        snakeRef.current.unshift(head);
    };

    const updateParticles = () => {
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.05;
            if (p.life <= 0) particlesRef.current.splice(i, 1);
        }
    };

    const drawGame = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const gs = GAME_CONFIG.gridSize;

        ctx.fillStyle = COLORS.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const fruit = fruitRef.current;
        if (fruit) {
            ctx.fillStyle = fruit.color;
            ctx.beginPath();
            ctx.arc(fruit.x * gs + gs / 2, fruit.y * gs + gs / 2, gs / 2 - 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#2ECC71";
            ctx.fillRect(fruit.x * gs + gs / 2, fruit.y * gs - 2, 4, 4);
        }

        snakeRef.current.forEach((segment, index) => {
            ctx.fillStyle = index === 0 ? COLORS.snakeHead : COLORS.snakeBody;
            ctx.fillRect(segment.x * gs, segment.y * gs, gs, gs);
            if (index === 0) {
                ctx.fillStyle = "black";
                ctx.fillRect(segment.x * gs + 4, segment.y * gs + 4, 4, 4);
                ctx.fillRect(segment.x * gs + 12, segment.y * gs + 4, 4, 4);
            }
        });

        particlesRef.current.forEach(p => {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, 4, 4);
            ctx.globalAlpha = 1.0;
        });
    };

    const handleGameOver = () => {
        gameRunningRef.current = false;
        cancelAnimationFrame(requestRef.current);
        const finalDuration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        onGameOver(scoreRef.current, finalDuration);
    };

    useEffect(() => {
        spawnFruit();
        requestRef.current = requestAnimationFrame(gameLoop);
        return () => cancelAnimationFrame(requestRef.current);
        // eslint-disable-next-line
    }, []);

    return (
        <div className="game-container">
            <div className="stats-bar">
                <span>SCORE: {score}</span>
                <span>TIME: {time}s</span>
            </div>

            <div
                className="canvas-wrapper"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <canvas
                    ref={canvasRef}
                    width={GAME_CONFIG.canvasWidth}
                    height={GAME_CONFIG.canvasHeight}
                />
            </div>

            <div className="controls-hint">
                <p>PC: Arrow Keys | Mobile: Swipe to Move</p>
            </div>
        </div>
    );
};

export default GameCanvas;
