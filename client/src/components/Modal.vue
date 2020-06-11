<template>
    <!-- The Modal -->
    <div id="myModal" class="modal" ref="modal">
        <!-- Modal content --> 
        <div class="modal-content">
            <span class="close" id="btnClose" ref="btnClose">&times;</span><br>
            <form>
                <div class="row">
                    <label for="inputName" class="col-sm-1 col-form-label"> Title</label>
                    <div class="col-sm-11">
                        <input type="text" class="form-control col-sm-8" ref= "txtTitle" id="txtTitle" v-model="notes.title">
                    </div>
                </div><br>
                
                <div style="display:none;" id="note" ref="note">
                    <div class="row" id="noteTextArea">
                        <label for="inputName" class="col-sm-1 col-form-label">Note</label>
                        <div class="col-sm-8">
                            <textarea class="form-control txtBody" rows="8" v-model="notes.body"></textarea>
                        </div>
                    </div>
                </div>

                <div style="display:none;" id="check" ref="check">
                    <div class="row" id="noteTextArea">
                        <label for="inputName" class="col-sm-1 col-form-label">Action</label>
                        <div class="col-sm-4">
                            <input class="form-control txtBody" v-model="notes.body">
                        </div>
                        <div class="col-sm-2">
                            <button v-on:click.prevent="addToDo" class="btn btn-primary">Add</button>
                        </div>
                        <div id="preview-to-dos" class="col-sm-4" ref="previewTODOS">
                            <ul id="todoUL" ref="todoUL">
                                <li v-for="(todo, index) in todo" :key="index"> {{todo}} <a href="#" v-on:click.stop.prevent="removeToDo(index)" class="text-danger"> (Remove)</a></li>
                            </ul>
                        </div>
                    </div>
                </div><br>
                
                <div class="row">
                    <div class="form-group row">
                        <div class="offset-sm-10">
                            <button type="submit" v-on:click.stop.prevent="saveNote" class="btn btn-success" id="btnSave" ref="btnSave">Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

    import {eb} from '../main';
    import requests from '../requests';

    export default {
        data() {
            return {
                index: null,
                notes: [],
                todo: [],
                userId: ''
            }
        },
        methods: {
            async openModal(op, userId, noteId) {
                this.clear(); 
                this.userId = userId;
                
                if (noteId != null) {
                    var data = await requests.findOneNoteById(userId, noteId);
                } else {
                    data = "";   
                }
                
                if (op == 'todo') {
                    this.todoSelected = true;
                    document.querySelector("#note").style.display = "none";
                    document.querySelector("#check").style.display = "block";

                    if (noteId != null) {
                        window.setTimeout(() => { document.querySelector("#txtTitle").value = data[0].title }, 5);
                        this.todo = data[0].body.split(';');
                        this.index = noteId;
                    }

                } else if (op == 'note') {
                    this.todoSelected = false;
                    document.querySelector("#check").style.display = "none";
                    document.querySelector("#note").style.display = "block";

                    if (noteId != null) {
                        this.$refs.txtTitle.value = data[0].title;
                        document.querySelectorAll('.txtBody')[0].value = data[0].body;
                        this.index = noteId;
                    }
                }
                
                //modal handling
                document.querySelector("#myModal").style.display = "block";
                document.querySelector("#btnClose").addEventListener('click', () => { this.clear() });
                window.addEventListener('click', (event) => { (event.target == document.querySelector("#myModal")) ? this.clear() : null });
            },
            async insertData(data) {
                if (this.index != null) {
                    await requests.updateNote({title: data.title, body: data.body, type: data.type, userId: this.userId, noteId: this.index});
                    this.index = null;
                } else {
                    if (!data.title || !data.body) {
                        alert('Please fill all the fields');
                        return false;
                    } else { 
                        await requests.addNote({title: data.title, body: data.body, type: data.type, userId: this.userId});
                    }
                }

                this.notes = await requests.showAllNotes(this.userId);
                eb.$emit('notesUpdated');
                this.clear();
            },
            clear() {
                document.querySelector("#myModal").style.display = "none";
                document.querySelector("#txtTitle").value = "";
                document.querySelectorAll('.txtBody')[0].value = '';
                document.querySelectorAll('.txtBody')[1].value = '';
                document.querySelector("#todoUL").innerHTML = '';
                this.index = null;
            },
            async removeNote(index) {
                await requests.deleteNote({id: index});
                this.notes = requests.showAllNotes(this.userId);
                eb.$emit('notesUpdated');
            },
            addToDo() {
                this.todo.push(this.notes.body);
                
                this.notes.body = '';
            },   
            removeToDo(index) {
                this.todoSelected = true;
                this.todo.splice(index, 1);
            }, 
            saveNote() {
                if (this.todoSelected == true || document.querySelector("#check").style.display == "block") {
                    this.insertData({title: this.notes.title, body: this.todo.join(';'), type: 'todo'});
                } else {
                    this.insertData({title: this.notes.title, body: this.notes.body, type: 'note'});
                }

                this.todoSelected = false;
                this.todo = [];
            },
        },
        created() {
            eb.$on('openModal', (op, userId, noteId) => {
                this.openModal(op, userId, noteId);
            });
            
            eb.$on('removeNote', (index) => {
                this.removeNote(index);
            });
        }
    }
</script>

<style>
    #preview-to-dos {
        height: 180px;
        width: 400px;
        border: 1px solid rgb(204, 201, 201);
        padding: 5px;
        overflow: scroll;
    }

    /* The Modal (background) */
    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 1; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    }

    /* Modal Content/Box */
    .modal-content {
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 60%; /* Could be more or less, depending on screen size */
    }

    /* The Close Button */
    .close {
        color: #aaa;
        margin-left: 700px;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover, .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
</style>