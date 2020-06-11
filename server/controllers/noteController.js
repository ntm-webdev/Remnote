const notes = require('../models/note');

module.exports = {

    async addNote(req,res) {
        const notesData = await notes.findById(req.body.id_user);
        
        notesData.notes.push({
            title: req.body.title,
            body: req.body.body,
            type: req.body.type
        });

        notesData.save((err) => {
            if (err) return console.error(err);
        });

        res.json(await notes.find());
    },

    async showAllNotes(req, res) {
        const notesData = await notes.find();

        res.json(notesData);
    },

    async findOneNoteById(req, res) {
        const notesData = await notes.findById(req.params.idUser);
        
        res.json(notesData.notes.filter(el => {
            return el._id == req.params.idNote
        }));
    },

    async updateNote(req,res) {
        await notes.updateOne({'notes._id': req.body.id_note}, {   
                '$set': {
                    'notes.$.title': req.body.title,
                    'notes.$.body': req.body.body,
                    'notes.$.type': req.body.type
                }
            }
        );

        const notesData = await notes.find();
        res.json(notesData);
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
    }

};