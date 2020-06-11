<template>
    <div class="container">
        <br>

        <div class="form-group">
            <label for="user">Username</label>
            <input type="text" class="form-control" name="user" id="username" v-model="username" placeholder="Please enter with your username">
        </div>

        <div class="form-group">
            <label for="user">Password</label>
            <input type="password" class="form-control" name="pwd" id="pwd" v-model="pwd" placeholder="Please enter with your password">
        </div>

        <div v-if="error != ''" class="alert alert-danger" role="alert">
          <p>{{error}}</p>
        </div>
        
        <br>
        
        <div class="form-group">
            <a id="goHome" class="btn btn-success" v-on:click="goHome">Login</a>
        </div>
        
        <br>

        <span>Not registered? <a href="#" v-on:click.prevent="registration">Create an account</a></span>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                username: '',
                pwd: '',
                error: ''
            }
        },
        methods: {
            goHome() {
                if (!this.username || !this.pwd) {
                    this.error = 'Please fill the username and/or password';
                } else {
                    this.error = '';
                    this.$router.push({
                        name: 'home',
                        params: {
                            user: this.username
                        }
                    });
                }   
            },

            registration() {
                this.$router.push({ 
                    name: 'registration'
                });
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