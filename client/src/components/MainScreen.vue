<template>
    <div id="main" style="overflow: hidden;">
        <div v-for="(note, index) in getNotes" :key="index">
            <div :class="note.type" class="notes" v-if="display == 'grid'">
                <button style="float:right;" v-on:click="removeNote(note._id)">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button style="float:right;" v-on:click="openModal(note.type, userId, note._id)">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                </button>
                <p><b>{{note.title | abbreviate('title')}}</b></p>
                <p v-if="note.type == 'note'">{{note.body | abbreviate('body')}}</p>
                <ul v-else>
                   <li v-for="(todo, index) in getTodos(note.body)" :key=index>{{todo}}</li>
                </ul>
            </div>

            <div :class="note.type" class="notes-list" v-else>
                <b>{{note.title}}</b>
                <button style="float:right;" v-on:click="removeNote(note._id)">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button style="float:right;" v-on:click="openModal(note.type, userId, note._id)">
                    <i class="fa fa-eye" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </div>
</template>
 
<script>

    import {eb} from '../main';
    import requests from '../requests';

    export default {
        data() {
            return {
                display: 'grid',
                notes: [],
                arrAux: [],
                userId: this.$route.params.userId,
            }
        },
        methods: {
            removeNote(index) {
                eb.$emit('removeNote', index);
            },
            openModal(type, userId, noteId) {
                eb.$emit('openModal', type, userId, noteId);
            },
            getTodos(t) {
                let arrAuxTodo = t.split(";");
                
                return arrAuxTodo.map((el)=>{
                    return el;
                });

            },
            async getUpdatedNotes() {
                this.notes = await requests.showAllNotes(this.userId);
                return this.notes;
            }
        },
        filters: {
            abbreviate(text, type) {
                if (type == 'title') {
                     return (text.length > 20) ? text.slice(0,15) + '...' : text;
                } else {
                    return (text.length > 30) ? text.slice(0,30) + '...' : text;
                }
            }
        },
        async created() {

            this.notes = await requests.showAllNotes(this.userId);

            eb.$on('changeDisplay', (display) => { this.display = display });
            
            eb.$on('notesUpdated', () => { 
                this.notes = this.getUpdatedNotes();
            });

            eb.$on('searchText', (text) => { 
                this.arrAux = this.notes.filter((note) => {
                    return note.title == text;
                });
            });
        },
        computed: {
            getNotes() {
                if (this.arrAux.length > 0) {
                    return this.arrAux;
                } else {
                    return this.notes;
                }
            }
        },
    }
</script>

<style>
    #main {
        background-color:  #f1f1f3;
        padding: 10px;
    }

    .notes {
        overflow: hidden;
        width: 32.3%;
        height: 180px;
        float:left;
        border: 1px solid;
        padding:10px;
        margin: 5px;
    }

    .notes-list {
        background-color: white;
        width: 100%;
        border: 1px solid;
        padding: 15px;
        margin-bottom: 10px;
    }

    .note {
        background-color: rgb(247, 240, 149);
    }

    .todo {
        background-color: darksalmon;
    }
</style>