const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { readFromFile, readAndAppend } = require('./helperFunctions/fsUtils')

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

// reading notes
app.get('/api/notes', (req, res) => {
    res.status(200).json(`${req.method} request received to get reviews`);
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)));
})

// posting notes
// app.post('/api/notes', (req, res) => {
//     console.info(`${req.method} request received to add a review`);
//     console.log(req.body)

//     const { title, text } = req.body;
    
//     if (title && text) {

//         const newNote = { title, text };
//         readAndAppend(newNote, 'db/db.json')
//         .then((data) => {
//             console.log(data);
//             res.json(JSON.parse(data))        
//         });

//         const response = {
//             status: 'success',
//             body: newReview,
//           };
//         res.json(response);
//     } else {
//         res.json('Error in posting review');
//     }
// });

// deleting notes








app.listen(PORT, () => {
    console.log(`Currently listening at http://localhost:${PORT}`);
});