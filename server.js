const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const db = require('./db/db.json')
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, deleteToFile } = require('./helperFunctions/fsUtils')

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ACCEPTANCE CRITERIA --- WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

// ACCEPTANCE CRITERIA --- WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

// reading notes
app.get('/api/notes', (req, res) => {
    console.log(`${req.method} request received to get note, line 
27 server.js`);
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)));
})

// posting notes
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note, line 33 server.js`);

    const { title, text } = req.body;
    
    if (title && text) {

        const newNote = { 
            title, 
            text,
            id: uuidv4()
        };
        console.log('type for newNote is ', typeof newNote, newNote)
        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(`new note is added ${response}`);
    } else {
        res.json('Error in posting review');
    }
});

// deleting notes
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    deleteToFile(id, './db/db.json');
    const saveNotes = db;
    res.json(`save notes are following ${saveNotes}`);
})

app.listen(PORT, () => {
    console.log(`Currently listening at http://localhost:${PORT}`);
});