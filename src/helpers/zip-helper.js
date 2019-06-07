var fs = require('fs');
var path = require('path');
var Zip = require('adm-zip');
var archiver = require('archiver');

module.exports = {
    createZipSync(packageName, modPath) {
        if (typeof packageName === 'undefined') {
            throw { message: 'PackageName is required' };
        }

        if (typeof modPath === 'undefined') {
            throw { message: 'ModPath is required' };
        }

        try {
            var output = fs.createWriteStream(
                './output/' + packageName + '.mcpm_pkg'
            );
        } catch (e) {
            throw {
                message: 'Exception occurred when creating mcpm_pkg file',
                error: e
            };
        }

        var archive = archiver('zip', {
            zlib: { level: 9 }
        });

        output.on('close', () => {
            console.log(archive.pointer() + ' total bytes');
            console.log('archiver has been finalized');
        });

        output.on('end', () => {
            console.log('Data has been drained');
        });

        archive.on('warning', err => {
            if (err.code === 'ENOENT') {
                // log warning
            } else {
                throw err;
            }
        });

        archive.on('error', err => {
            throw err;
        });

        archive.pipe(output);

        var stats = fs.lstatSync(modPath);

        var hasFiles = false;

        if (typeof modPath !== 'undefined') {
            this._addModSync(archive, modPath, stats.isDirectory());
            hasFiles = true;
        }

        if (hasFiles) {
            archive.finalize();
        }
    },

    _addModSync(archive, modPath, isDir) {
        if (isDir) {
            archive.directory(modPath, 'mods');
        } else {
            archive.append(fs.createReadStream(modPath), {
                name: 'mods/' + path.basename(modPath)
            });
        }
    }
};
