const notes = require('express').Router();
const uuid = require('uuid');
const { readFromFile, readAndAppend, readAndRemove } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text }  = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid.v4()
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

notes.delete('/:id', (req, res) => {
    const noteID = req.params.id;

    if (noteID) {
        readAndRemove(noteID, './db/db.json');
        res.json('Note deleted successfully 💣');
    } else {
        res.error('Error in deleting note');
    }
});

module.exports = notes;