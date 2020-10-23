const fs = require('fs');
const nodeDir = require('node-dir');
const prettier = require('prettier');

nodeDir.readFiles(
  './dist', // the root path

  // an options object
  {
    match: /.js$/, // only match JavaScript files
    recursive: false, // only the root dir
  },

  function (err, content, filename, next) {
    if (err) {
      console.log(err);
    } else {
      fs.readFile(filename, 'utf8', function (err, data) {
        if (err) return console.log(err);
        var result = prettier.format(data, {
          parser: 'babel',
          singleQuote: true,
          tabWidth: 2,
          useTabs: false,
          arrowParens: 'avoid',
          printWidth: 120,
        });
        fs.writeFile(filename, result, 'utf8', function (err) {
          if (err) return console.log(err);
        });
      });
    }
  }
);
