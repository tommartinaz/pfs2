<template>
    <b-navbar toggleable="md" type="light" variant="info">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand href="/">PFS Character Tracker</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav>
                <b-nav-item :to="{ name: 'homeLink' }" router-tag="li">Home</b-nav-item>
                <b-nav-item :to="{ name: 'characterListLink' }" router-tag="li">Characters</b-nav-item>
                <b-nav-item :to="{ name: 'scenarioListLink' }" router-tag="li">Scenarios</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

                <b-nav-item right v-b-modal.modalLogin v-if="!isLoggedIn">Login</b-nav-item>
                <b-nav-item right v-else @click="logout">Logout</b-nav-item>

            </b-navbar-nav>

        </b-collapse>
        <b-modal id="modalLogin" title="Player Login" @ok="login">
            <div class="login-form">
                <input v-model="email" type="email" placeholder="email" />
                <input v-model="password" type="password" placeholder="password" />
                <p style="color:red; font-size:30px">{{error}}</p>
            </div>
        </b-modal>
    </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: "Header",
    data() {
        return {
            email: '',
            password: '',
            error: '',
            player_id: window.localStorage.getItem('player_id')
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logoutPlayer');
        },
        login() {
            this.player_id = this.$store.dispatch('loginPlayer', {email: this.email, password: this.password})
        },
    },
    computed: {
        ...mapGetters(['isLoggedIn'])
    }
}
</script>

<style scoped>

</style>