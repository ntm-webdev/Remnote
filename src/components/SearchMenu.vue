<template>
    <div id="search">
        <div class="dropdown" style="display:inline">
            <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-bars" aria-hidden="true"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a id="router-link" v-on:click.prevent="backLogin">Back to Login</a>
            </div>
        </div>
    
        <input type="search" v-on:input="search" id="search-note" placeholder="Search your notes" v-model="searchText">

        <span><i style="cursor: pointer;" v-on:click="changeDisplay('list')" class="fa fa-list" aria-hidden="true" ref="iconList"></i></span>
        <span><i style="cursor: pointer;" v-on:click="changeDisplay('grid')" class="fa fa-th-large selectedDisplay" aria-hidden="true" ref="iconGrid"></i></span>
        <i class="fa fa-user" aria-hidden="true"> Welcome, {{username}}</i>
    </div>
</template>

<script>

    import {eb} from '../main';

    export default {
        data() {
            return {
                username: this.$route.params.user,
                searchText: ''
            }
        }, 
        methods:{
            changeDisplay(type) {

                eb.$emit('changeDisplay', type);

                if (type == "list") {
                    this.$refs.iconList.classList.add("selectedDisplay"); 
                    this.$refs.iconGrid.classList.remove("selectedDisplay");
                } else {
                    this.$refs.iconList.classList.remove("selectedDisplay"); 
                    this.$refs.iconGrid.classList.add("selectedDisplay");
                }
            },
            search() {
                eb.$emit('searchText', this.searchText);
            },
            backLogin() {
                this.$router.push({
                    name: 'login',
                })
            }
        }
    }
</script>

<style>
    
    #search {
        width: 100%;
        background-color:  #f1f1f3;
        border: 1px solid;
        border-radius: 6px;
        padding: 8px;
    }

    i:first-child{
        margin-left: 25px;
    }

    i:not(:first-child) {
        margin-left: 80px;
    }

    #search-note {
        margin-left: 30px;
        width: 50%;
    }

    #router-link {
        display: block; 
        width: 100%; 
        padding: .25rem 1.5rem; 
        clear: both; 
        font-weight: 400; 
        color: #212529; 
        text-align: inherit; 
        white-space: nowrap;
        background-color: transparent;
        border: 0;
        cursor: pointer;
    }

    .selectedDisplay {
        border: 3px solid;
        padding: 2px;
    }

</style>