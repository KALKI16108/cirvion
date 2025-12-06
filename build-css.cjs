const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const fs = require('fs');

const log = (msg) => fs.appendFileSync('build-log.txt', msg + '\n');

try {
    if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist');
    }

    const css = fs.readFileSync('src/index.css', 'utf8');
    const config = require('./tailwind.config.cjs');

    log('Starting processing...');
    postcss([tailwindcss(config), autoprefixer])
        .process(css, { from: 'src/index.css', to: 'dist/output.css' })
        .then(result => {
            fs.writeFileSync('dist/output.css', result.css);
            log('Success');
        })
        .catch(error => {
            log('Error: ' + error.message);
            log(error.stack);
        });
} catch (e) {
    log('Sync Error: ' + e.message);
    log(e.stack);
}
