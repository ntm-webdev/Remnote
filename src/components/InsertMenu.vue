<template>
    <div id="menu">
        <div id="btn-group">
            <button v-on:click="openModal('note',null)"><i class="fa fa-plus" aria-hidden="true"></i></button>
            <button v-on:click="openModal('todo',null)"><i class="fa fa-check" aria-hidden="true"></i></button>
        </div>

        <div>
            <span style="margin-left: 15px;">Use this application to keep all your ideas. You can add a note or a TO-DO, with this app it´s impossible to forget anything!!!</span>
        </div>
    </div>
</template>

<script>

    import {eb} from '../main';

    export default {
        data(){
            return {
                title: '',
                body: '',
                todo: [],
                todoSelected: false
            }
        },
        methods: {
            openModal(op, index) {
               eb.$emit('openModal', op, index);
            },
        }   
    }
</script>

<style>
    #menu {
        width: 100%;
        border: 1px solid;
        border-radius: 6px;
        padding: 4px;
        clear: both;
        overflow: hidden;
        background-color: #f1f1f3;
    }

    button:first-child {
        margin-left: 25px;
    }

    button:not(:first-child) {
        margin-left: 25px;
    }

    #btn-group {
        float:left;
    }

    #align-right {
        float: right;
    }
</style>