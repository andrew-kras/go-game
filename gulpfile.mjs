import gulp from 'gulp'
import svgSprite from 'gulp-svg-sprite'
import cheerio from 'gulp-cheerio'
import _clean from 'gulp-clean'

const clean = () => gulp.src('public/icons/sprite-*.svg', { read: false }).pipe(_clean({ force: true }))

const color = '#ffffff'

const build = (name) => () =>
    gulp
        .src(`src/assets/icons/${name}/*.svg`)
        .pipe(
            cheerio({
                run: ($) => {
                    $('[style]').removeAttr('style')
                    $('[stroke]').removeAttr('stroke').attr('style', `stroke: var(--theme-svg-color, ${color})`)
                    $("[fill]:not([fill='none'])").removeAttr('fill').attr('style', `fill: var(--theme-svg-color, ${color})`)
                },
                parserOptions: { xmlMode: true }
            })
        )
        .pipe(
            svgSprite({
                mode: {
                    symbol: {
                        dest: '.',
                        sprite: `sprite-${name}.svg`,
                        inline: false
                    }
                }
            })
        )
        .pipe(gulp.dest('public/icons'))

const copy = () => gulp.src('src/assets/icons/logo*.svg').pipe(gulp.dest('static'))

export default gulp.series(clean, build('desktop'), copy)
