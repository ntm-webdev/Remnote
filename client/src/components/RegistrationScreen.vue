<template>
    <div class="container">
        <br>
        <div class="form-group">
            <label for="user">Username</label>
            <input type="text" class="form-control" name="username" id="username" v-model="username" placeholder="Please enter with your username">
        </div>

        <div class="form-group">
            <label for="user">Password</label>
            <input type="password" class="form-control" name="pwd" id="pwd" v-model="pwd" placeholder="Please enter with your password">
        </div>

        <div class="form-group">
            <label for="user">Confirm your password</label>
            <input type="password" class="form-control" name="cpwd" id="cpwd" v-model="cpwd" placeholder="Please confirm your password">
        </div>

        <div class="alert alert-danger" role="alert" v-for="(error, index) in errors" :key="index">
            <p v-if="error != ''">{{error}}</p>
        </div>

        <div v-if="success != ''" class="alert alert-success" role="alert">
            <p>{{success}}</p>
        </div>

        <br>
        <div class="form-group">
            <a id="button" class="btn btn-success" v-on:click.prevent="register">Register</a>
        </div>
    </div>
</template>

<script>

    import request from '../requests';

    export default {
        data() {
            return {
                errors: [],
                success: '',
                pwd: '',
                cpwd:'',
                username:''
            }
        },

        methods: {
            validation() {
                if (!this.pwd || !this.username) {
                    this.errors.splice(0, 1, 'Please fill the username and/or password'); 
                } else {
                    this.errors.splice(0, 1);

                    if (!this.cpwd) {
                        this.errors.splice(1, 1, 'Please please confirm password');
                    } else {
                        this.errors.splice(1, 1);

                        if (this.pwd != this.cpwd) {
                            this.errors.splice(2, 1, "The passwords do not correspond");
                        } else {
                            this.errors.splice(2, 1);
                        }
                    }
                } 
            },

            async register() {
                this.validation();

                if (this.errors.length <= 0) {
                    this.success = await request.registerAccount({username: this.username, pwd: this.pwd});
                    
                    window.setTimeout(() => {
                        this.$router.push({
                            name: 'login'
                        });
                    }, 2800);
                }
            }
        }
    }

</script>

<style scoped>

    #button {
        cursor: pointer;
        color: white;
    }

</style>