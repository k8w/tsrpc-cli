const chokidar = require('chokidar');
const path = require('path');

chokidar.watch(path.resolve(__dirname, 'abc'), {
    // ignored: options.ignore,
    ignoreInitial: true
}).on('all', () => {
    console.log('abc')
});