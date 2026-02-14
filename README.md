# Pixel Art Snake Game 🐍🍎

A vibrant, retro-style Snake game built with **React** and **Google Apps Script**.

![Snake Game Banner](https://via.placeholder.com/800x400.png?text=Pixel+Art+Snake+Game)

## 🎮 Features

- **Classic Gameplay**: Navigate the snake to eat fruits and grow longer.
- **8-Bit Aesthetic**: Cute pixel art style with a pastel pink implementation.
- **Fruit System**: Randomly spawning fruits (Apple, Banana, Grape, Strawberry, Orange) with different points.
- **Juice Effects**: Particle "splash" animations when eating fruits.
- **Leaderboard**: Real-time top 3 high scores powered by Google Sheets.

## 🛠 Tech Stack

- **Frontend**: React.js, Vite
- **Graphics**: HTML5 Canvas API
- **Backend**: Google Apps Script (GAS)
- **Database**: Google Sheets
- **Styling**: CSS3, Google Fonts ("Press Start 2P")

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/pixel-art-snake.git
    cd pixel-art-snake
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:5175](http://localhost:5175) to view it in the browser.

## ⚙️ Backend Configuration

This project uses **Google Sheets** to store leaderboard data.

1.  Create a Google Sheet and attach the script found in `backend/Code.gs`.
2.  Deploy the script as a Web App.
3.  Update the `API_URL` in `src/services/api.js` with your deployment URL.

👉 **See [DEPLOYMENT.md](DEPLOYMENT.md) for full backend setup instructions.**

## 📦 Build for Production

To create a production build for deployment (e.g., to Netlify or Vercel):

```bash
npm run build
```

This will generate a `dist` folder containing the static assets.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Based on the Vibe Coding methodology. Made with ❤️ by **Anissa**.
