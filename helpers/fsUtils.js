const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
/**
 * @param {string} filePath
 * @param {object} content
 * @returns {object} parsed JSON
 */

const writeToFile = (destination, content) => {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
        if (err) {
            console.error(err);
        }
        console.info(`\nData written to ${destination}`);
});
};

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

const eraseNote = (id, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            const newData = parsedData.filter((note) => note.id !== id);
            if (parsedData.length === newData.length) {
                console.log('No note found');
            }else {
                writeToFile(file, newData);
            }
        }
    });
}

module.exports = {readFromFile, writeToFile, readAndAppend, eraseNote};


 