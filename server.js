const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extends: true}));
app.use(express.static('public'));

// homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})















app.listen(3000, (req, res) => {
    console.log(`Currently listening at http://localhost:3000`);
})