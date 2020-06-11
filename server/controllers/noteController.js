const notes = require('../models/note');

module.exports = {

    async addNote(req,res) {
        await notes.findOneAndUpdate({_id: req.body.userId}, 
            { 
                $push: {
                    "notes": { 
                        title: req.body.title,
                        body: req.body.body,
                        type: req.body.type
                    }
                }
            }
        );

        res.send('The note was saved successfully');
    },

    async showAllNotes(req, res) {
        const notesData = await notes.find({_id: req.params.userId});

        res.json(notesData);
    },

    async findOneNoteById(req, res) {
        const notesData = await notes.findById(req.params.userId);
        
        res.json(notesData.notes.filter(el => {
            return el._id == req.params.noteId
        }));
    },

    async updateNote(req,res) {
        await notes.updateOne({'notes._id': req.body.noteId}, {   
                '$set': {
                    'notes.$.title': req.body.title,
                    'notes.$.body': req.body.body,
                    'notes.$.type': req.body.type
                }
            }
        );

        res.send('Updated successfully');
    },

    async deleteNote(req, res) {
        await notes.findOneAndUpdate({'notes._id': req.body.id}, {   
            $pull: {
                'notes': {
                    _id: req.body.id,
                }
            }
        }, {useFindAndModify: false});

        const notesData = await notes.find();
        res.json(notesData);
    },

    async registerAccount(req, res) {
        await notes.create({
            name: req.body.username,
            pwd: req.body.pwd,
            notes: []
        });

        res.send('The user was created successfully, You will be redirected to login page');
    },

    async validateLogin(req, res) {
        const user = await notes.find({name: req.body.username, pwd: req.body.pwd});

        res.json(user);
    }

};