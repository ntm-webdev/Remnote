const axios = require('axios');
const url = 'http://localhost:3000/';

class Requests {

    static async showAllNotes(userId) {
        const notes = await axios.get(url+userId);

        const data = notes.data.map((el) => {
            return el.notes;
        });

        return data[0];
    }

    static async findOneNoteById(userId, noteId) {
        const notes = await axios.get(url+'findOneNoteById/'+userId+'/'+noteId);

        return notes.data;
    }

    static async addNote(obj) {
        await axios.post(url+'addNote/', obj);
    }

    static async updateNote(obj) {
        await axios.post(url+'updateNote/', obj);
    }

    static async deleteNote(obj) {
        await axios.post(url+'deleteNote/', obj);
    }

    static async registerAccount(obj) {
        const account = await axios.post(url+'registerAccount/', obj);
        
        return account.data;
    }

    static async validateLogin(obj) {
        const account = await axios.post(url+'validateLogin/', obj);
        return account.data[0];
    }
 
}

export default Requests;