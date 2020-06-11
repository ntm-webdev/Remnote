const express = require('express');
const noteController = require('../controllers/noteController');

const route = express.Router();

route.post('/addNote', noteController.addNote);
route.get('/', noteController.showAllNotes);
route.get('/showNote/:idUser/:idNote', noteController.findOneNoteById);
route.post('/updateNote', noteController.updateNote);
route.post("/deleteNote", noteController.deleteNote);

module.exports = route;