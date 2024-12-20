import { defineStore } from 'pinia'

export const GETTER_SIZE = 'getterSize'
export const GETTER_BOARD = 'getterBoard'
export const GETTER_CURRENT_PLAYER = 'getterCurrentPlayer'

export const ACTION_SELECT_BOARD_SIZE = 'actionSelectBoardSize'
export const ACTION_MAKE_MOVE = 'actionMakeMove'
export const ACTION_RESET_GAME = 'actionResetGame'
export const ACTION_UNDO_MOVE = 'actionUndoMove'
export const ACTION_PASS_TURN = 'actionPassTurn'

export default defineStore('game', {
    state: () => ({
        size: '',
        board: [],
        currentPlayer: 'black',
        history: []
    }),

    getters: {
        [GETTER_SIZE]: state => state.size,
        [GETTER_BOARD]: state => state.board,
        [GETTER_CURRENT_PLAYER]: state => state.currentPlayer
    },

    actions: {
        async [ACTION_SELECT_BOARD_SIZE](value) {
            this.size = value
        },

        [ACTION_RESET_GAME]() {
            const size = this.size === 'small' ? 9 : this.size === 'medium' ? 13 : 19
            this.board = Array.from({ length: size }, (_, row) =>
                Array.from({ length: size }, (_, col) => ({ id: `${row}-${col}`, value: null }))
            )
            this.currentPlayer = 'black'
            this.history = []
        },

        [ACTION_MAKE_MOVE](cellId) {
            const [row, col] = cellId.split('-').map(Number)
            if (!this.board[row][col].value) {
                this.history.push(JSON.parse(JSON.stringify(this.board)))
                this.board[row][col].value = this.currentPlayer
                this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black'
            }
        },

        [ACTION_UNDO_MOVE]() {
            if (this.history.length > 0) {
                this.board = this.history.pop()
                this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black'
            }
        },

        [ACTION_PASS_TURN]() {
            this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black'
        }
    }
})
