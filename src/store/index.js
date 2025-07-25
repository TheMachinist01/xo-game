import { createStore } from "vuex";

function checkBoard(board) {
    const symbolToNumber = { 'X': 1, 'O': -1, '': 0 };
    const scores = [];
    board = Array.from(board)

    // Rows Calculation
    board.forEach(row => {
        scores.push(row.map(col => symbolToNumber[col]).reduce((a, b) => a + b));
    });

    // Columns Calculation
    for (let col = 0; col < 3; col++) {
        scores.push(board.map(row => symbolToNumber[row[col]]).reduce((a, b) => a + b));
    }

    // Diagonals Calculation
    scores.push(board.map((row, index) => symbolToNumber[row[index]]).reduce((a, b) => a + b))
    scores.push(board.map((row, index) => symbolToNumber[row[2 - index]]).reduce((a, b) => a + b));

    const isEnded = board.flat().every(cell => cell !== '');

    if (scores.includes(3)) return 'x';
    else if (scores.includes(-3)) return 'o';
    else if (isEnded) return 'draw';
    else return 'playing'
}

const store = createStore({
    state() {
        return {
            play: false,
            gameStatus: 'playing',
            turn: 'X',
            board: [['', '', ''], ['', '', ''], ['', '', '']],
            scores: {
                'O': 0,
                'X': 0,
            }
        };
    },
    mutations: {
        startGame(state) {
            state.play = true;
        },
        stopGame(state) {
            state.play = false;
        },
        resetScores(state) {
            state.scores = { 'O': 0, 'X': 0 }
        },
        resetBoard(state) {
            state.gameStatus = 'playing';
            state.turn = 'X';
            state.board = [['', '', ''], ['', '', ''], ['', '', '']];
        },
        setMove(state, payload) {
            const { row, col } = payload;
            state.board[row][col] = state.turn;
            state.gameStatus = checkBoard(state.board);
            switch (state.gameStatus) {
                case 'playing':
                    state.turn = state.turn === 'O' ? 'X' : 'O';
                    break;
                case 'o':
                    state.scores.O++;
                    break;
                case 'x':
                    state.scores.X++;
                    break;
            }
        },
    },
    actions: {
        resetGame({ commit }) {
            commit('resetScores');
            commit('resetBoard');
        },
        quit({ commit }) {
            commit('resetScores');
            commit('resetBoard');
            commit('stopGame');
        }
    }
})

export default store;