const cpy = require('cpy');
const fs = require('fs');
const path = require('path');

function flatten(lists) {
    return lists.reduce((a, b) => a.concat(b), []);
}

function getDirectories(srcpath) {
    return fs
        .readdirSync(srcpath)
        .map((file) => path.join(srcpath, file))
        .filter((path) => fs.statSync(path).isDirectory());
}

function getDirectoriesRecursive(srcpath) {
    return [
        srcpath,
        ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))
    ];
}

const copyFilesInDirectory = async (source, destination, directory) => {
    await cpy(source, destination, {
        rename: (basename) => {
            var directoryName = directory
                .replace(/^src/g, '')
                .replace(/^\\/g, '')
                .replace(/\\/g, '_');
            var newName = directoryName
                ? directoryName + '_' + basename
                : basename;
            console.log(
                `source: ${source}, destination: ${destination}, newName: ${newName}, directory: ${directory}`
            );
            return newName;
        }
    });
};

getDirectoriesRecursive('src').forEach((dir) =>
    copyFilesInDirectory([dir + '\\*.js'], 'dist', dir)
);
