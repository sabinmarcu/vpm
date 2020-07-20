const chokidar = require('chokidar');
const path = require('path');
const { refresh } = require('./refreshTsConfigs');
const { readJSON, log } = require('./utils');

const ROOT = path.resolve(__dirname, '../');
const watch = () => {
  const watcher = chokidar.watch('./packages/*/package.json', {
    ignored: /(^|[\/\\])\../,
    persistent: true
  }).on('all', (event, p) => {
    const fullPath = path.resolve(ROOT, p);
    log('Refreshing %s', fullPath);
    refresh(readJSON(fullPath).name)
  });
  console.log("Watching");
};

module.exports = watch;

if (!module.parent) {
  watch();
}