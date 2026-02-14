# Pixel Art Snake Game 🐍🍎

A vibrant, retro-style Snake game built with **React** and **Google Apps Script**.

## 🎮 Features

- **Classic Gameplay**: Navigate the snake to eat fruits and grow longer.
- **8-Bit Aesthetic**: Cute pixel art style with a pastel pink implementation.
- **Mobile Friendly**: Fully responsive design with **Swipe gestures** and **Dynamic Viewport** support.
- **Fruit System**: Randomly spawning fruits (Apple, Banana, Grape, Strawberry, Orange) with different points.
- **Juice Effects**: Particle "splash" animations when eating fruits.
- **Leaderboard**: Real-time top 3 high scores powered by Google Sheets.

## 🛠 Tech Stack

- **Frontend**: React.js, Vite
- **Graphics**: HTML5 Canvas API
- **Deployment**: **GitHub Actions** (Auto-deploy to GitHub Pages)
- **Backend**: Google Apps Script (GAS)
- **Database**: Google Sheets
- **Styling**: CSS3, Google Fonts ("Press Start 2P")

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/anissayang/Snake.git
    cd Snake
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

## 🎮 Controls

| Device | Control |
| :--- | :--- |
| **PC** | **Arrow Keys** or **WASD** to move |
| **Mobile** | **Swipe** on screen to change direction |

## ⚙️ Backend Configuration

This project uses **Google Sheets** to store leaderboard data.

1.  Create a Google Sheet and attach the script found in `backend/Code.gs`.
2.  Deploy the script as a Web App.
3.  Update the `API_URL` in `src/services/api.js` with your deployment URL.

👉 **See [DEPLOYMENT.md](DEPLOYMENT.md) for full backend setup instructions.**

## 📦 Deployment (GitHub Pages)

This project is configured with **GitHub Actions**. Every push to `main` branch will automatically trigger a build and deploy to GitHub Pages.

1.  Go to `Settings` > `Pages`.
2.  Set `Source` to **GitHub Actions**.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

Based on the Vibe Coding methodology. Made with ❤️ by **Anissa**.
