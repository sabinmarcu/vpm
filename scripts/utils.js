const fs = require('fs');
module.exports.readJSON = (p) =>
  JSON.parse(
    fs.readFileSync(
      p,
      'utf-8'
    )
  );

module.exports.log = (...args) => process.env.DEV === 'true' && console.log(...args);