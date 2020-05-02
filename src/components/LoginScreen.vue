<template>
    <div class="container">
        <br>
        <div class="form-group">
            <label for="user">User</label>
            <input type="text" class="form-control" name="user" id="user" v-model="user" aria-describedby="helpId" placeholder="Please enter with a name to proceed">
        </div>
        <div class="form-group">
            <a id="goHome" class="btn btn-success" v-on:click.prevent="goHome">Login</a>
        </div>
    </div>
</template>

<script>
    
    export default {
        data() {
            return {
                user: ''
            }
        },
        methods: {
            goHome() {
                if (!this.user) {
                    alert("Insert a username to proceed");
                } else {
                    this.$router.push({
                        name: 'home',
                        params: {
                            user: this.user
                        }
                    })
                }
            }
        }
    }

</script>

<style>

    #goHome {
        cursor: pointer;
        color: white;
    }

</style>