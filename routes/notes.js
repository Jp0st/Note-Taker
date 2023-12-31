const notes = require('express').Router();
const {v4: uuidv4} = require('uuid');
const {readAndAppend, readFromFile, eraseNote} = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);
  
    const {title, text} = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.error('Error in adding note');
    }
  });

notes.delete( '/:id' , (req, res) => {
    const noteId = req.params.id;
    eraseNote(noteId, './db/db.json');
    res.json('Note deleted!');
});

module.exports = notes;