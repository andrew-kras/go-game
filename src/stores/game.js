import { defineStore } from 'pinia'

export const GETTER_SIZE = 'getterSize'
export const GETTER_BOARD = 'getterBoard'
export const GETTER_CURRENT_PLAYER = 'getterCurrentPlayer'

export const ACTION_SELECT_BOARD_SIZE = 'actionSelectBoardSize'
export const ACTION_MAKE_MOVE = 'actionMakeMove'
export const ACTION_RESET_GAME = 'actionResetGame'

export default defineStore('game', {
    state: () => ({
        size: '',
        board: [],
        currentPlayer: 'black'
    }),

    getters: {
        [GETTER_SIZE]: state => state.size,
        [GETTER_BOARD]: (state) => state.board,
        [GETTER_CURRENT_PLAYER]: (state) => state.currentPlayer
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
        },

        [ACTION_MAKE_MOVE](cellId) {
            const [row, col] = cellId.split('-').map(Number)
            if (!this.board[row][col].value) {
                this.board[row][col].value = this.currentPlayer
                this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black'
            }
        }
    }
})
