const axios = require('axios');
const url = 'http://localhost:3000/';

class Requests {

    static async showAllNotes() {
        const notes = await axios.get(url);

        const data = notes.data.map((el) => {
            return el.notes;
        });

        return data[0];
    }

    static async findOneNoteById(idUser, idNote) {
        const notes = await axios.get(url+'showNote/'+idUser+'/'+idNote);

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
 
}

export default Requests;