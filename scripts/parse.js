const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const execPromised = (cmd, cwd) => new Promise(
  (accept, reject) => {
    exec(cmd, { cwd }, (error, stdout, stderr) => {
      if (error || stderr !== '') {
        return reject(error || 'STDERR not empty');
      }
      return accept(stdout.split('\n'));
    });
  },
);

const parseWorkspaces = async (rootDir = __dirname) => {
  const output = await execPromised('yarn workspaces info', rootDir);
  output.pop();
  output.pop();
  output.shift();
  return JSON.parse(output.join('\n'));
}

module.exports = parseWorkspaces;
module.exports.parse = parseWorkspaces;

if (!module.parent) {
  parseWorkspaces();
}