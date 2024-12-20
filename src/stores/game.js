import { defineStore } from 'pinia'

export const GETTER_SIZE = 'getterSize'
export const GETTER_BOARD = 'getterBoard'
export const GETTER_CURRENT_PLAYER = 'getterCurrentPlayer'
export const GETTER_SCORE = 'getterScore'

export const ACTION_SELECT_BOARD_SIZE = 'actionSelectBoardSize'
export const ACTION_MAKE_MOVE = 'actionMakeMove'
export const ACTION_RESET_GAME = 'actionResetGame'
export const ACTION_UNDO_MOVE = 'actionUndoMove'
export const ACTION_PASS_TURN = 'actionPassTurn'
export const ACTION_CALCULATE_SCORE = 'actionCalculateScore'

export default defineStore('game', {
    state: () => ({
        size: '',
        board: [],
        currentPlayer: 'black',
        history: [],
        score: { black: 0, white: 0 },
        passes: 0,
        forbiddenCells: [],
        komi: 6.5
    }),

    getters: {
        [GETTER_SIZE]: state => state.size,
        [GETTER_BOARD]: state => state.board,
        [GETTER_CURRENT_PLAYER]: state => state.currentPlayer,
        [GETTER_SCORE]: state => state.score
    },

    actions: {
        async [ACTION_SELECT_BOARD_SIZE](value) {
            this.size = value
            if (this.size === 'small' || this.size === 'medium') {
                this.komi = 4.5
            } else if (this.size === 'large') {
                this.komi = 6.5
            }
        },

        [ACTION_RESET_GAME]() {
            const size = this.size === 'small' ? 9 : this.size === 'medium' ? 13 : 19
            this.board = Array.from({ length: size }, (_, row) =>
                Array.from({ length: size }, (_, col) => ({ id: `${row}-${col}`, value: null }))
            )
            this.currentPlayer = 'black'
            this.history = []
            this.score = { black: 0, white: 0 }
            this.passes = 0
            this.forbiddenCells = []
        },

        [ACTION_MAKE_MOVE](cellId) {
            if (this.forbiddenCells.includes(cellId)) return

            const [row, col] = cellId.split('-').map(Number)
            if (!this.board[row][col].value) {
                this.history.push(JSON.parse(JSON.stringify(this.board)))
                this.board[row][col].value = this.currentPlayer
                this.checkCaptures(row, col)

                this.updateForbiddenCells()

                this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black'
                this.passes = 0
            }
        },

        [ACTION_UNDO_MOVE]() {
            if (this.history.length > 0) {
                this.board = this.history.pop()
                this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black'
                this.passes = 0
                this.updateForbiddenCells()
            }
        },

        [ACTION_PASS_TURN]() {
            this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black'
            this.passes++
            if (this.passes >= 2) {
                this[ACTION_CALCULATE_SCORE]()
            }
        },

        [ACTION_CALCULATE_SCORE]() {
            const territory = { black: 0, white: 0 }
            const size = this.board.length

            for (let row = 0; row < size; row++) {
                for (let col = 0; col < size; col++) {
                    if (!this.board[row][col].value) {
                        const surroundedBy = this.getSurroundingPlayer(row, col)
                        if (surroundedBy) territory[surroundedBy]++
                    }
                }
            }

            this.score.black += territory.black
            this.score.white += territory.white + this.komi
            alert(`Game Over! Black: ${this.score.black}, White: ${this.score.white}`)
        },

        checkCaptures(row, col) {
            const opponent = this.currentPlayer === 'black' ? 'white' : 'black'
            const directions = [
                [-1, 0], [1, 0], [0, -1], [0, 1]
            ]

            for (const [dx, dy] of directions) {
                const neighborRow = row + dx
                const neighborCol = col + dy
                if (
                    neighborRow >= 0 && neighborRow < this.board.length &&
                    neighborCol >= 0 && neighborCol < this.board.length &&
                    this.board[neighborRow][neighborCol].value === opponent
                ) {
                    const captured = this.isCaptured(neighborRow, neighborCol)
                    if (captured) this.removeStones(captured)
                }
            }
        },

        isCaptured(row, col, visited = new Set()) {
            const key = `${row}-${col}`
            if (visited.has(key)) return []
            visited.add(key)

            const stone = this.board[row][col]
            if (!stone.value) return false

            const group = [{ row, col }]
            const directions = [
                [-1, 0], [1, 0], [0, -1], [0, 1]
            ]

            for (const [dx, dy] of directions) {
                const neighborRow = row + dx
                const neighborCol = col + dy

                if (
                    neighborRow < 0 || neighborRow >= this.board.length ||
                    neighborCol < 0 || neighborCol >= this.board.length
                ) continue

                const neighbor = this.board[neighborRow][neighborCol]

                if (!neighbor.value) return false
                if (neighbor.value === stone.value) {
                    const subGroup = this.isCaptured(neighborRow, neighborCol, visited)
                    if (!subGroup) return false
                    group.push(...subGroup)
                }
            }

            return group
        },

        removeStones(stones) {
            stones.forEach(({ row, col }) => {
                this.board[row][col].value = null
                this.score[this.currentPlayer]++
                this.forbiddenCells.push(`${row}-${col}`)
            })
        },

        getSurroundingPlayer(row, col, visited = new Set()) {
            const key = `${row}-${col}`
            if (visited.has(key)) return null
            visited.add(key)

            const directions = [
                [-1, 0], [1, 0], [0, -1], [0, 1]
            ]

            let surroundingPlayer = null

            for (const [dx, dy] of directions) {
                const neighborRow = row + dx
                const neighborCol = col + dy

                if (
                    neighborRow < 0 || neighborRow >= this.board.length ||
                    neighborCol < 0 || neighborCol >= this.board.length
                ) continue

                const neighbor = this.board[neighborRow][neighborCol]

                if (!neighbor.value) return null
                if (!surroundingPlayer) surroundingPlayer = neighbor.value
                if (surroundingPlayer !== neighbor.value) return null
            }

            return surroundingPlayer
        },

        updateForbiddenCells() {
            this.forbiddenCells = this.forbiddenCells.filter(cellId => {
                const [row, col] = cellId.split('-').map(Number)
                return this.board[row][col].value === null
            })
        }
    }
})
