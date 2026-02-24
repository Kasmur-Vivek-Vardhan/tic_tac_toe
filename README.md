# Tic-Tac-Toe Game

A modern, interactive Tic-Tac-Toe game built with HTML, CSS, and JavaScript. Features both two-player and single-player (vs AI) modes with a clean, responsive design.

## 🎮 Features

- **Two Game Modes:**
  - Two Player: Play against a friend
  - Single Player: Challenge the AI opponent

- **Smart AI:**
  - AI tries to win when possible
  - Blocks player winning moves
  - Uses strategic positioning (center, corners, edges)

- **Interactive UI:**
  - Smooth animations and transitions
  - Responsive design for mobile and desktop
  - Real-time score tracking
  - Win/draw notifications with modal popups

- **Game Features:**
  - Score persistence (saved in browser storage)
  - Winning combination highlighting
  - Reset and new game options
  - Keyboard-friendly interface

## 🚀 How to Play

1. **Choose Game Mode:**
   - Click "Two Player" to play with a friend
   - Click "vs AI" to challenge the computer

2. **Make Your Move:**
   - Click any empty cell to place your mark (X or O)
   - In two-player mode, players alternate turns
   - In AI mode, you play as X and the AI plays as O

3. **Win Conditions:**
   - Get three of your marks in a row (horizontal, vertical, or diagonal)
   - If all cells are filled without a winner, it's a draw

4. **Game Controls:**
   - **Reset Game**: Clear the board but keep scores
   - **New Game**: Start fresh with reset scores

## 🛠️ Installation

### Option 1: Direct Download
1. Download all files to a folder on your computer
2. Open `index.html` in any modern web browser

### Option 2: Local Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📂 Project Structure

```
tic-tac-toe/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── script.js           # Game logic and AI
└── README.md          # Project documentation
```

## 🎯 AI Strategy

The AI opponent uses a strategic approach:

1. **Win**: If AI can win in one move, it takes it
2. **Block**: If player can win next turn, AI blocks them
3. **Center**: Takes the center position if available
4. **Corners**: Preferentially takes corner positions
5. **Random**: Takes any remaining position

## 🎨 Design Features

- **Modern UI**: Clean, card-based design with gradients
- **Responsive**: Works on phones, tablets, and desktops
- **Animations**: Smooth hover effects and winning celebrations
- **Accessibility**: Clear contrast and intuitive navigation

## 🔧 Customization

The game is built with modular CSS and JavaScript, making it easy to customize:

- **Colors**: Modify the CSS gradient and color variables
- **Animations**: Adjust transition timings and effects
- **AI Difficulty**: Modify the AI strategy in the `getBestMove()` function
- **Scoring**: Add new scoring systems or statistics

## 🌐 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari  
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

---

**Enjoy playing Tic-Tac-Toe!** 🎉
