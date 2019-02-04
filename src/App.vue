<template>
    <div>
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from './components/Header';

import { mapActions } from 'vuex'
export default {
    name: "App",
    components: {
        Header,
    },
    methods: {
        ...mapActions([
            'fetchCharacters',
            'fetchAlignments',
            'fetchClasses',
            'fetchRaces',
            'fetchScenarios'
        ])
    },
    created() {
        this.fetchCharacters();
        this.fetchClasses();
        this.fetchRaces();
        this.fetchAlignments();
        this.fetchScenarios();
    }
}
</script>

<style scoped>

</style>