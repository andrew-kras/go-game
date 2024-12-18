import { createRouter, createWebHistory } from 'vue-router'

import gameView from "@/views/gameView.vue"
import homeView from "@/views/homeView.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: homeView
        },
        {
            path: '/game',
            name: 'game',
            component: gameView
        }
    ]
})

export default router
