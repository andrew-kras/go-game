import { defineStore } from 'pinia'

export const GETTER_SIZE = 'getterSize'

export const ACTION_SELECT_BOARD_SIZE = 'actionSelectBoardSize'

export default defineStore('game', {
    state: () => ({
        size: ''
    }),

    getters: {
        [GETTER_SIZE]: state => state.size
    },

    actions: {
        async [ACTION_SELECT_BOARD_SIZE](value) {
            this.size = value
        }
    }
})
