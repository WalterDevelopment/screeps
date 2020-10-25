var config = require('../.screeps.json');
var https = require('https');
var nodeDir = require('node-dir');
var path = require('path');
var fs = require('fs');
const { env } = require('process');

const screepsEmail = env.email ? env.email : config.email;
const screepsPassword = env.password ? env.password : config.password;
const screepsBranch = env.branch ? env.branch : config.branch;

let modules = {};

function base64_encode(file) {
    // read binary data
    var fileContents = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return Buffer.from(fileContents).toString('base64');
}

nodeDir.readFiles(
    './dist', // the root path

    // an options object
    {
        match: /.js$/, // only match JavaScript files
        recursive: false // only the root dir
    },

    function (err, content, filename, next) {
        if (err) {
            console.log(err);
        } else {
            var basename = path.basename(filename),
                ext = path.extname(basename),
                name = basename.replace(ext, '');

            if (ext === '.js') {
                modules[name] = content;
            } else {
                modules[name] = base64_encode(filename);
            }

            console.log(`${basename}, ${filename}, ${ext}, ${name}`);

            next();
        }
    },
    function () {
        var email = screepsEmail,
            password = screepsPassword,
            data = {
                branch: screepsBranch,
                modules: modules
            };

        console.log(`branch: ${screepsBranch}`);

        var req = https.request({
            hostname: 'screeps.com',
            port: 443,
            path: '/api/user/code',
            method: 'POST',
            auth: email + ':' + password,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });

        req.write(JSON.stringify(data));
        req.end();
    }
);
