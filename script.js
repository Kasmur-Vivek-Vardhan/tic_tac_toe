class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameMode = 'two-player'; // 'two-player' or 'ai'
        this.gameActive = true;
        this.scores = {
            x: 0,
            o: 0,
            draw: 0
        };
        
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.bindEvents();
        this.updateDisplay();
        this.loadScores();
    }
    
    bindEvents() {
        // Board cells
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });
        
        // Mode buttons
        document.getElementById('two-player-btn').addEventListener('click', () => {
            this.setGameMode('two-player');
        });
        
        document.getElementById('ai-player-btn').addEventListener('click', () => {
            this.setGameMode('ai');
        });
        
        // Control buttons
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.resetGame();
        });
        
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.newGame();
        });
        
        // Modal buttons
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.resetGame();
            this.hideModal();
        });
        
        document.getElementById('close-modal-btn').addEventListener('click', () => {
            this.hideModal();
        });
    }
    
    handleCellClick(e) {
        const index = parseInt(e.target.dataset.index);
        
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.makeMove(index, this.currentPlayer);
        
        if (this.checkWin()) {
            this.handleWin();
            return;
        }
        
        if (this.checkDraw()) {
            this.handleDraw();
            return;
        }
        
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
        
        // AI move for AI mode
        if (this.gameMode === 'ai' && this.currentPlayer === 'O' && this.gameActive) {
            setTimeout(() => {
                this.makeAIMove();
            }, 500);
        }
    }
    
    makeMove(index, player) {
        this.board[index] = player;
        const cell = document.querySelector(`[data-index="${index}"]`);
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());
    }
    
    makeAIMove() {
        const bestMove = this.getBestMove();
        this.makeMove(bestMove, 'O');
        
        if (this.checkWin()) {
            this.handleWin();
            return;
        }
        
        if (this.checkDraw()) {
            this.handleDraw();
            return;
        }
        
        this.currentPlayer = 'X';
        this.updateDisplay();
    }
    
    getBestMove() {
        // Try to win
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'O';
                if (this.checkWinForPlayer('O')) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }
        
        // Try to block player from winning
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'X';
                if (this.checkWinForPlayer('X')) {
                    this.board[i] = '';
                    return i;
                }
                this.board[i] = '';
            }
        }
        
        // Take center if available
        if (this.board[4] === '') {
            return 4;
        }
        
        // Take corners
        const corners = [0, 2, 6, 8];
        const availableCorners = corners.filter(corner => this.board[corner] === '');
        if (availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
        
        // Take any available space
        const availableSpaces = [];
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                availableSpaces.push(i);
            }
        }
        
        return availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
    }
    
    checkWin() {
        return this.checkWinForPlayer(this.currentPlayer);
    }
    
    checkWinForPlayer(player) {
        return this.winningCombinations.some(combination => {
            return combination.every(index => this.board[index] === player);
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer.toLowerCase()]++;
        this.saveScores();
        this.highlightWinningCells();
        
        setTimeout(() => {
            this.showModal(`Player ${this.currentPlayer} Wins!`);
        }, 500);
        
        this.updateDisplay();
    }
    
    handleDraw() {
        this.gameActive = false;
        this.scores.draw++;
        this.saveScores();
        
        setTimeout(() => {
            this.showModal("It's a Draw!");
        }, 500);
        
        this.updateDisplay();
    }
    
    highlightWinningCells() {
        for (let combination of this.winningCombinations) {
            if (combination.every(index => this.board[index] === this.currentPlayer)) {
                combination.forEach(index => {
                    document.querySelector(`[data-index="${index}"]`).classList.add('winning');
                });
                break;
            }
        }
    }
    
    showModal(message) {
        document.getElementById('winner-text').textContent = message;
        document.getElementById('winner-modal').classList.remove('hidden');
    }
    
    hideModal() {
        document.getElementById('winner-modal').classList.add('hidden');
    }
    
    setGameMode(mode) {
        this.gameMode = mode;
        
        // Update button styles
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        if (mode === 'two-player') {
            document.getElementById('two-player-btn').classList.add('active');
        } else {
            document.getElementById('ai-player-btn').classList.add('active');
        }
        
        this.resetGame();
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        // Clear board display
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
        });
        
        this.updateDisplay();
    }
    
    newGame() {
        this.resetGame();
        this.scores = { x: 0, o: 0, draw: 0 };
        this.saveScores();
        this.updateDisplay();
    }
    
    updateDisplay() {
        // Update status text
        const statusText = document.getElementById('status-text');
        if (!this.gameActive) {
            statusText.textContent = 'Game Over';
        } else if (this.gameMode === 'ai' && this.currentPlayer === 'O') {
            statusText.textContent = 'AI is thinking...';
        } else {
            statusText.textContent = `Player ${this.currentPlayer}'s turn`;
        }
        
        // Update scores
        document.getElementById('score-x').textContent = this.scores.x;
        document.getElementById('score-o').textContent = this.scores.o;
        document.getElementById('score-draw').textContent = this.scores.draw;
    }
    
    saveScores() {
        localStorage.setItem('ticTacToeScores', JSON.stringify(this.scores));
    }
    
    loadScores() {
        const savedScores = localStorage.getItem('ticTacToeScores');
        if (savedScores) {
            this.scores = JSON.parse(savedScores);
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
