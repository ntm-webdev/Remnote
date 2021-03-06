const express = require('express');
const noteController = require('../controllers/noteController');

const route = express.Router();

route.post('/addNote', noteController.addNote);
route.get('/:userId', noteController.showAllNotes);
route.get('/findOneNoteById/:userId/:noteId', noteController.findOneNoteById);
route.post('/updateNote', noteController.updateNote);
route.post("/deleteNote", noteController.deleteNote);
route.post("/registerAccount", noteController.registerAccount);
route.post("/validateLogin", noteController.validateLogin);

module.exports = route;