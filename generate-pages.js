const fs = require('fs');
const path = require('path');
const entryMap = {};
const entryArray = [];

function* walkSync(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) {
            yield* walkSync(path.join(dir, file.name));
        } else {
            yield path.join(dir, file.name);
        }
    }
}

for (const filePath of walkSync('src/pages')) {
    if (filePath.match(/.hbs$/)) {
        entryMap[filePath.slice('src/pages/'.length)] = __dirname + '/' + filePath;
    }
    if (filePath.match(/.hbs$/)) {
        entryArray.push(filePath);
    }
}

module.exports = {
    entryMap,
    entryArray
};
