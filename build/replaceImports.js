const fs = require('fs');
const nodeDir = require('node-dir');
const prettier = require('prettier');

nodeDir.readFiles(
  './dist', // the root path

  // an options object
  {
    match: /.js$/, // only match Javascript files
    recursive: false, // only the root dir
  },

  function (err, content, filename, next) {
    if (err) {
      console.log(err);
    } else {
      const regex = /(require\(')(.*)('\))/g;

      function replacer(match, p1, p2, p3, offset, string) {
        return p1 + p2.replace(/\.\//g, '').replace(/\//g, '_') + p3;
      }

      fs.readFile(filename, 'utf8', function (err, data) {
        if (err) return console.log(err);

        var result = data.replace(regex, replacer);
        fs.writeFile(filename, result, 'utf8', function (err) {
          if (err) return console.log(err);
        });
      });
      next();
    }
  }
);
