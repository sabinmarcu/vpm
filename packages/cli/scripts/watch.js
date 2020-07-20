const chokidar = require('chokidar');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '../../');
const queue = [];
const watch = () => {
  const watcher = chokidar.watch(path.resolve(__dirname, ROOT, '**/*[^.d].ts{,x}'), {
    ignored: /(^|[\/\\])\../,
    persistent: true
  }).on('all', (event, p) => {
    queue.forEach(child => child.kill('SIGINT'));
    console.log("Rebuilding");
    queue.push(spawn('yarn', ['build']));
  });
  console.log("Watching");
};

module.exports = watch;

if (!module.parent) {
  watch();
}