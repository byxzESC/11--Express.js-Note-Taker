const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => {
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => {
    err ? console.error(err) : console.info(`\nData written to ${destination}, fsUtils.js line 8`)
    });
}

const readAndAppend = (content, file) => {

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            // console.log('now parsed data has', parsedData, fsUtils.js line20)
            writeToFile(file, parsedData);
        }
    });

};

const deleteToFile = (id, file) => {

    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const currentData = JSON.parse(data);
            currentData.forEach((note, index, notes) => {
                if (note.id === id) {
                    notes.splice(index, 1);
                }
            })
            writeToFile(file, currentData);
        }
    });
    
}


module.exports = { readFromFile, writeToFile, readAndAppend, deleteToFile };