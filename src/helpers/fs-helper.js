var fs = require('fs');
var path = require('path');

module.exports = {
    writeFolder(name) {
        var created = false;
        var dir = path.join(process.cwd(), name);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            created = true;
        }

        return created;
    },

    writeMcpmPackage(mcpmPackage) {
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
