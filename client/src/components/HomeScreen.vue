<template>
    <div class="container">
        <br>
        <sm></sm>
        <ms></ms>
        <im :userId="userId"></im>
        <m></m>
    </div>
</template>

<script>
    import sm from './SearchMenu';
    import ms from './MainScreen';
    import m from './Modal';
    import im from './InsertMenu';

    export default {
        components: {
            sm,
            ms,
            m,
            im
        },
        data() {
            return {
                userId: this.$route.params.userId,
            }
        }
    }
</script>