<template>
    <b-container fluid>
        <b-row no-gutters>
            <b-col cols="6">
                {{player.name}}
            </b-col>
            <b-col cols="6">
                <b-btn
                    class="btn btn-danger"
                    @click="deletePlayer"
                >
                    Delete player
                </b-btn>
            </b-col>
        </b-row>
        <b-row no-gutters>
            <b-col cols="12" class="create-btn-row">
                <b-btn
                    v-b-modal.modalCharacter
                    v-b-modal.modal-center
                    class="create-btn mt-2 px-2">
                    Create New Character
                </b-btn>
            </b-col>
        </b-row>
        <b-row no-gutters>
            <b-table
                stacked="md"
                small
                hover
                outlined
                :items="characters"
                :fields="characterFields"
                v-if="characters.length"
                sort-by="character_num"
            >
                <template slot="show_details" slot-scope="row">
                    <b-button size="sm" @click.stop="row.toggleDetails" clss="mr-2">
                        {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                    </b-button>
                </template>
                <template slot="row-details" slot-scope="row">
                    <b-card>
                        <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right">Alignment</b-col>
                            <b-col>{{ lookupAlignment(row.item.alignment_id) }}</b-col>
                            <b-btn
                                v-b-modal.modalPlayedScenarios
                                v-b-modal.modal-center
                                @click="lookupScenariosPlayedList(row.item.id)"
                                class="create-btn mt-2 px-2">
                                Scenarios played
                            </b-btn>
                        </b-row>
                        <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right">Race</b-col>
                            <b-col>{{ lookupRace(row.item.race_id) }}</b-col>
                            <b-col>{{ row.item.isActive }}</b-col>
                        </b-row>
                        <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right">Class</b-col>
                            <b-col>{{ lookupClass(row.item.class_id) }}</b-col>
                            <b-col>{{ row.item.isActive }}</b-col>
                        </b-row>
                        <b-row class="mb-2">
                            <b-col sm="3" class="text-sm-right">Level</b-col>
                            <b-col>{{ row.item.level }}</b-col>
                            <b-col>{{ row.item.isActive }}</b-col>
                        </b-row>

                    </b-card>
                </template>
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
        </b-row>
        <b-modal 
            id="modalCharacter"
            ref="modal"
            :title="character.id ? 'Edit character details' : 'Create new character'"
            @ok="handleSubmit"
            @hidden="clearCharacter"
        >
            <form @submit.stop.prevent="handleSubmit">
                <b-form-input
                    class="mb-3 id-field"
                    type="text"
                    v-model="character.id"
                />
                <b-form-input
                    class="id-field"
                    v-model="character.player_id"
                />
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
                :fields="scenarioFields"
            />
            <div v-else>No scenarios played</div>
        </b-modal>
    </b-container>
</template>

<script>
import { blankCharacter } from '../data';
export default {
    name: "Player",
    data() {
        return {
            characterFields: [
                { key: 'character_num', sortable: true, label: 'Character Number', 'class': 'text-center' },
                { key: 'name', sortable: true },
                { key: 'level', sortable: true },
                { key: 'show_details', 'class': 'text-center' },
                { key: 'edit', 'class': 'text-center' },
                { key: 'delete', 'class': 'text-center'}
            ],
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
            scenarioFields: [
                { key: 'season', sortable: true },
                { key: 'scen_num' },
                { key: 'title' }
            ],
            scenariosPlayedByChar: [],
        }
    },
    computed: {
        player() {
            return this.$store.state.players.player
        },
        characters() {
            return this.$store.state.characters.characters.filter(character => character.player_id === this.$route.params.id)
        },
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

    },
    methods: {
        loadCharacterEdit(char) {
            this.character = this.$store.state.characters.characters.filter(character => {
                return character.id === char.id;
            })[0]
        },
        handleSubmit() {
            const { id, name, race_id, class_id, alignment_id, level, player_id, character_num } = this.character;
            const charToSubmit = {
                name,
                race_id,
                class_id,
                alignment_id,
                level: parseInt(level, 10),
                player_id: player_id ? player_id : this.$route.params.id,
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
        deletePlayer() {
            if(confirm(`Are you sure you want to delete ${this.player.name}?`)) {
                // console.log(this.$route.params.id);
            }
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
    },
    created() {
        this.$store.dispatch('fetchOnePlayer', this.$route.params.id);
    }
}
</script>

<style scoped>
.id-field {
    display: none;
}
</style>