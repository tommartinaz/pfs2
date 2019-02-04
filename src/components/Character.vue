<template>
    <div class="card" style="width: 50vw">
        <div class="card-header">
            <div class="heading">
                <h2>{{character.name}} ({{alignment}})</h2>
                <div class="action-buttons">
                    <router-link :to="{ name: 'editCharacterLink', params: {character: character}}">Edit</router-link> 
                    <a  class="btn btn-danger" @click="deleteChar(character.id)">Delete</a>
                    <button class="btn btn-small btn-secondary" @click="closeCharacter">x</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <p>Level {{character.level}} {{race}} {{char_class}}</p>
            <br>
            <!-- <div>
                <select v-model="played">
                    <option :value="true">Played</option>
                    <option :value="false">Availabe to play</option>
                </select>
                <div>
                    <h2 v-if="played">Scenarios played</h2>
                    <h2 v-else>Available to play</h2>
                    <ul v-if="played" class="list-group list-group-flush">
                        <li class="list-group-item" v-for="scenario in scenariosPlayed" :key="scenario.id">
                            {{scenario.title}}
                        </li>
                    </ul>
                    <ul v-else class="list-group list-group-flush">
                        <li
                            class="list-group-item"
                            v-for="scenario in availableScenarios"
                            :key="scenario.id"
                            @click="addCharacterToScenario(scenario, character.id)"
                        >
                            {{scenario.title}} Levels {{scenario.low_level}} - {{scenario.high_level}}
                        </li>
                    </ul>

                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { router } from '../router';
export default {
    name: "EditCharacter",
    // data() {
    //     return {
    //         playedScenarios: []
    //     }
    // },
    props: ['character'],
    computed: {
        alignment() {
            const { alignments } = this.$store.state.alignments;
            const results = alignments.length ? alignments.filter(alignment => alignment.id == this.character.alignment_id) : [];
            return results.length ? results[0]["alignment"] : "";
        },
        race() {
            const { races } = this.$store.state.races;
            const race = races.length ? races.filter(race => race.id === this.character.race_id) : [];
            return race.length ? race[0]["race"] : "";
        },
        char_class() {
            const { classes } = this.$store.state.classes;
            const clss = classes.length ? classes.filter(charClass => charClass.id === this.character.class_id) : [];
            return clss.length ? clss[0]["class"] : "";
        }
    },
    methods: {
        ...mapActions(['deleteCharacter']),
        closeCharacter() {
            this.$emit('toggleViewChar');
            router.push('/characters')
        },
        deleteChar(id) {
            this.deleteCharacter(id);
            this.$emit('toggleViewChar');
            router.push('/characters');
        }
        // setScenarios(playedScenarios, scenarios) {
        //     playedScenarios = scenarios
        // }
    },
}
</script>

<style scoped>
    .heading {
        display: flex;
        justify-content: space-between;
    }
</style>