<template>
<b-container v-if="!isLoggedIn">
    <h1>Please login to see your characters</h1>
</b-container>

<b-container v-else fluid id="character-list" class="flex-cols pr-2 pl-2">
    <b-row>
        <b-btn class="btn btn-success" v-b-modal.modalCharacter v-b-modal.modal-center>Create a new character</b-btn>
    </b-row>
    <b-row no-gutters class="mt-3">
        <b-col cols="12">
            <b-table
                stacked="lg"
                small
                hover
                outlined
                tdClass="text-center"
                :items="characters"
                :fields="fields"
                sort-by="character_num"
                no-sort-reset
                v-if="characters.length"
            >
                <template slot="edit" slot-scope="row">
                    <i 
                        class="fas fa-pen-square"
                        style="color:blue; display: flex; justify-content: center;"
                        aria-hidden="true"
                        v-b-modal.modalCharacter
                        v-b-modal.modal-center
                        @click="loadCharacterEdit(row.item)"
                    />
                </template>
                <template slot="delete" slot-scope="row">
                    <i 
                        class="far fa-trash-alt"
                        style="color:red; display: flex; justify-content: center;"
                        aria-hidden="true"
                        @click="deleteCharacter(row.item)"
                    />
                </template>

            </b-table>
            <h3 v-else>You currently have no characters created.</h3>
        </b-col>
    </b-row>

    <b-modal 
        id="modalCharacter"
        ref="modal"
        :title="character.id ? 'Edit character details' : 'Create new character'"
        @ok="handleSubmit"
        @hidden="clearCharacter"
    >
        <form @submit.stop.prevent="handleSubmit">
            <p>Character Number</p>
            <b-form-input
                type="text"
                v-model="character.character_num"
            />
            <p>Character Name</p>
            <b-form-input
                class="mb-3"
                type="text"
                v-model="character.name"
            />

            <p>Race</p>
            <b-form-select
                :options="raceOptions"
                class="mb-3"
                v-model="character.race_id"
            />
            <p>Class</p>
            <b-form-select
                :options="classOptions"
                class="mb-3"
                v-model="character.class_id"
            />
            <p>Alignment</p>
            <b-form-select
                :options="alignmentOptions"
                class="mb-3"
                v-model="character.alignment_id"
            />
            <p>Level</p>
            <b-form-input
                type="text"
                v-model="character.level"
            />
        </form>
    </b-modal>
    <b-modal id="modalPlayedScenarios" title="Scenarios Played" ref="modal">
        <b-table
            v-if="scenariosPlayedByChar.length"
            :items="scenariosPlayedByChar"
            :fields="seasonFields"
        />
        <div v-else>No scenarios played</div>
    </b-modal>
</b-container>
</template>

<script>
import { blankCharacter } from '../data';
import { mapGetters } from 'vuex';
export default {
    name: "CharacterList",
    data() {
        return {
            character: {
                id: "",
                name: "",
                race_id: 0,
                class_id: 0,
                alignment_id: 0,
                level: 1,
                player_id: "",
                character_num: 0,
            },
            fields: [
                { key: 'name', sortable: true },
                { key: 'level', sortable: true },
                { key: 'alignment_id', label: 'Alignment', formatter: alignmentId => this.lookupAlignment(alignmentId), 'class': 'text-center' },
                { key: 'race_id', label: 'Race', formatter: raceId => this.lookupRace(raceId) },
                { key: 'class_id', label: 'Class', formatter: classId => this.lookupClass(classId) },
                { key: 'edit', 'class': 'text-center' },
                { key: 'delete', 'class': 'text-center' },
            ],
            seasonFields: [
                { key: 'season', sortable: true },
                { key: 'scen_num' },
                { key: 'title' }
            ],
            scenariosPlayedByChar: [],
            availableScenarios: [],
            player_id: window.localStorage.getItem('player_id')
        }
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
        raceOptions() {
            const races = this.$store.state.races.races.map(race => ({
                value: race.id,
                text: race.race
            }));
            return races;
        },
        classOptions() {
            const classes = this.$store.state.classes.classes.map(clss => ({
                value: clss.id,
                text: clss.class
            }));
            return classes;
        },
        alignmentOptions() {
            const alignments = this.$store.state.alignments.alignments.map(alignment => ({
                value: alignment.id,
                text: alignment.alignment
            }));
            return alignments;
        },
        playerOptions() {
            const players = this.$store.state.players.players.map(player => ({
                value: player.id,
                text: player.name
            }));
            return players;
        },
        characters() {
            const { characters } = this.$store.state.characters;
            return characters.length ? characters.filter(character => character.player_id === this.player_id) : [];
        },
    },
    methods: {
        loadCharacterEdit(char) {
            this.character = this.$store.state.characters.characters.filter(character => {
                return character.id === char.id;
            })[0]
        },
        handleSubmit() {
            const { id, name, race_id, class_id, alignment_id, level, character_num } = this.character;
            const charToSubmit = {
                name,
                race_id,
                class_id,
                alignment_id,
                level: parseInt(level, 10),
                player_id: this.player_id,
                character_num
            }
            if(!this.character.id) {
                this.$store.dispatch('createCharacter', charToSubmit);
            } else {
                this.$store.dispatch('editCharacter', { ...charToSubmit, id: id });
            }
            this.clearCharacter();
        },
        clearCharacter() {
            this.character = blankCharacter
        },
        deleteCharacter(character) {
            if(confirm(`Are you sure you want to delete ${character.name}?`)) {
                this.$store.dispatch('deleteCharacter', character.id)
            }
            this.clearCharacter();
        },
        lookupAlignment(id) {
            const { alignments } = this.$store.state.alignments;
            const results = alignments.length ? alignments.find(alignment => alignment.id == id) : {};
            return results ? results["alignment"] : "";
        },
        lookupRace(id) {
            const { races } = this.$store.state.races;
            const race = races.length ? races.find(race => race.id === id) : {};
            return race ? race["race"] : "";
        },
        lookupClass(id) {
            const { classes } = this.$store.state.classes;
            const clss = classes.length ? classes.find(charClass => charClass.id === id) : {};
            return clss ? clss["class"] : "";
        },
        lookupPlayer(id) {
            const { players } = this.$store.state.players;
            const player = players.length ? players.find(plyr => plyr.id === id) : {};
            return player ? player["name"] : ""
        },
        lookupScenariosPlayedList(id) {
            const { scenarios, playedScenarios } = this.$store.state.scenarios
            const listOfScenIds = playedScenarios.filter(scenario => scenario.char_id === id).map(scenario => ({id: scenario.scen_id}));
            const listOfScenariosPlayed = [];
            for(let i = 0; i < listOfScenIds.length; i++) {
                listOfScenariosPlayed.push(scenarios.find(scenario => scenario.id == listOfScenIds[i].id))
            }
            this.scenariosPlayedByChar = listOfScenariosPlayed;
        },
        // lookupAvailableScenarios(id) {
        //     console.log("PLAYER ID", id);
        //     const { scenarios, playedScenarios } = this.$store.state.scenarios;
        //     const listOfScenarioIds = scenarios.filter(scenario => scenario)
        // }

    },
}
</script>

<style scoped>
.character-id {
    display: none;
}
</style>

