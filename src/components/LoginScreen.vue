<template>
    <div class="container">
        <br>
        <div class="form-group">
            <label for="">User</label>
            <input type="text" class="form-control" name="user" id="user" v-model="user" aria-describedby="helpId" placeholder="Please enter with a name to proceed">
        </div>
        <div class="form-group">
            <router-link class="btn btn-success" :to="{name: 'home', params: {user: user}}">Login</router-link>
        </div>
    </div>
</template>

<script>
    
    export default {
        data() {
            return {
                user: ''
            }
        }
    }

</script>