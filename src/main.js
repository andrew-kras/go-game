import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router.js'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: navigator.language.substring(0, 2),
    fallbackLocale: 'ru',
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    globalInjection: true,
    pluralizationRules: {
        // https://kazupon.github.io/vue-i18n/guide/pluralization.html#accessing-the-number-via-the-pre-defined-argument
        ru(choice, choicesLength) {
            if (choice === 0) return 0

            const teen = choice > 10 && choice < 20
            const endsWithOne = choice % 10 === 1

            if (choicesLength < 4) return !teen && endsWithOne ? 1 : 2

            if (!teen && endsWithOne) return 1

            if (!teen && choice % 10 >= 2 && choice % 10 <= 4) return 2

            return choicesLength < 4 ? 2 : 3
        }
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
