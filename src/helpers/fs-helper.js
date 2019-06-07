var fs = require('fs');
var path = require('path');

module.exports = {
    writeFolderSync(name) {
        var created = false;
        var dir = path.join(process.cwd(), name);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            created = true;
        }

        return created;
    },

    copyFile(source, destination) {
        return new Promise((resolve, reject) => {
            var rs = fs.createReadStream(source);

            rs.on('error', function(error) {
                reject(error);
            });

            var destinationFileName = path.basename(source);
            var ws = fs.createWriteStream(
                path.join(destination, destinationFileName)
            );

            ws.on('error', function(error) {
                reject(error);
            });

            ws.on('close', function(ex) {
                resolve(true);
            });
        });
    },

    existsSync(path) {
        return fs.existsSync(path);
    },

    writeMcpmPackageSyncÍ(mcpmPackage) {
        var created = false;
        var dir = path.join(process.cwd(), 'mcpm.json');
        var content = JSON.stringify(mcpmPackage, null, 2);

        fs.writeFileSync(dir, content, 'utf8');

        if (fs.exists(dir)) {
            created = true;
        }

        return created;
    }
};
