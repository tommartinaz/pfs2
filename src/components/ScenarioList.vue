<template>
    <b-container fluid id="scenario-list" class="flex-cols pr-2 pl-2">
        <b-row no-gutters>
            <b-col cols="6">
                <b-form-group style="text-align: right;" horizontal label="Select a player" label-for="seasonSelect">
                    <b-form-select
                        id="playerSelect"
                        :options="players"
                        :value="players.id"
                        class="mb-3"
                        v-model="selectedPlayer"    
                    >
                    </b-form-select>
                </b-form-group>
            </b-col>
            <b-col cols="6">
                <b-form-group style="text-align: right;" horizontal label="Filter by season" label-for="seasonSelect">
                    <b-form-select
                        id="seasonSelect"
                        :options="seasons"
                        class="mb-3"
                        v-model="selectedSeason"    
                    >
                    </b-form-select>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row no-gutters>
            <b-col cols="6" class="create-btn-row">
                <b-btn
                    v-b-modal.modalScenarioCreate
                    v-b-modal.modal-center
                    class="create-btn mt-2 px-2">
                    Create New Scenario
                </b-btn>
            </b-col>
        </b-row>
        <b-row no-gutters>
            <b-col cols="12">
                <b-table
                    stacked="lg"
                    small
                    hover
                    outlined
                    tdClass="text-center"
                    :items="scenarios"
                    :fields="fields"
                    :current-page="currentPage"
                    :per-page="perPage"
                >
                    <template slot="show_details" slot-scope="row">
                        <i 
                            class="fas fa-scroll"
                            style="color:blue; text-align: center"
                            aria-hidden="true"
                            v-b-modal.scenarioView
                            v-b-modal.modal-center
                            @click="selectScenario(row.item)" />
                    </template>
                    <template slot="edit" slot-scope="row">
                        <i
                            class="fas fa-pen-square"
                            style="color: #E6B05F"
                            aria-hidden="true"
                            v-b-modal.modalScenarioCreate
                            v-b-modal.modal-center
                            @click="editScenario(row.item)"
                        />
                    </template>
                    <template slot="delete" slot-scope="row">
                        <i 
                            class="far fa-trash-alt"
                            style="color:red; display: flex; justify-content: center;"
                            aria-hidden="true"
                            @click="deleteScenario(row.item)"
                        />
                    </template>
                </b-table>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="6" class="my-1">
                <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
            </b-col>
            <b-col md="6" class="my-1">
                <b-form-group horizontal label="Scenarios per page" class="mb-0">
                    <b-form-select :options="itemsPerPageOptions" v-model="perPage" />
                </b-form-group>
            </b-col>
        </b-row>
        <b-modal id="scenarioView"
            ref="modal"
            :title="`${scen.season}-${scen.scen_num}: ${scen.title}`"
        >   <b-form-group>
                <b-btn v-b-modal.markAsPlayed v-b-modal.modal-center>
                    Mark as played.
                </b-btn>
            </b-form-group>
            <p>Levels {{scen.low_level}} - {{scen.high_level}}</p>
            <p>{{scen.description}}</p>
        </b-modal>
        <b-modal id="modalScenarioCreate"
            ref="modal"
            title="Enter scenario details"
            @ok="handleSubmit"
            :ok-disabled="!validateForm"
            @hidden="clearScenario"
        >
            <b-container fluid>
                <b-form-input class="scenario-id" v-model="scenarioToEditOrCreate.id" />
                <p>Title</p>
                <b-form-input
                    class="mb-3"
                    :state="titleState"
                    v-model="scenarioToEditOrCreate.title"
                    aria-describedby="titleFeedack"
                    placeholder="Title of Scenario"
                />
                <b-form-invalid-feedback id="titleFeedback">
                    The title must be at least 10 characters.
                </b-form-invalid-feedback>
                <b-form-row>
                Season
                <b-form-input
                    class="mb-2"
                    v-model="scenarioToEditOrCreate.season"
                    placeholder="Season number"
                />
                Scenario Number
                <b-form-input
                    class="mb-2"
                    v-model="scenarioToEditOrCreate.scen_num"
                />
                </b-form-row>
                Lowest level of character
                <b-form-input
                    class="mb-3"
                    v-model="scenarioToEditOrCreate.low_level"
                />
                Highest level of character
                <b-form-input
                    class="mb-3"
                    v-model="scenarioToEditOrCreate.high_level"
                />
                Description
                <b-form-input
                    v-model="scenarioToEditOrCreate.description"
                    :state="descriptionState"
                    placeholder="The scenario must have a description."
                />
            </b-container>
        </b-modal>
        <b-modal id="markAsPlayed">
            <b-form-select :options="characters">
            </b-form-select>
        </b-modal>
    </b-container>
</template>

<script>
export default {
    name: "ScenarioList",
    data() {
        return {
            fields: [
                { key: 'season', sortable: false, 'class': 'text-center' },
                { key: 'scen_num', sortable: false, 'class': 'text-center' },
                { key: 'title', sortable: true, 'class': 'title-header' },
                { key: 'low_level', sortable: true, 'class': 'text-center' },
                { key: 'high_level', sortable: true, 'class': 'text-center' },
                { key: 'played_by' },
                { key: 'show_details', 'class': 'text-center' },
                { key: 'edit', 'class': 'text-center' },
                { key: 'delete', 'class': 'text-center' }
            ],
            scen: {
                title: "",
                season: null,
                scen_num: 0,
                low_level: 1,
                high_level: 15,
                description: ""
            },
            scenarioToEditOrCreate: {
                title: "",
                season: null,
                scen_num: 0,
                low_level: 1,
                high_level: 15,
                description: ""
            },
            currentPage: 1,
            perPage: 30,
            selectedSeason: null,
            totalRows: 0,
            itemsPerPageOptions: [ 10, 30, 50 ],
            selectedPlayer: {}
        }

    },
    computed: {
        titleState() {
            return this.scenarioToEditOrCreate.title.length >= 10 ? true : false;
        },
        descriptionState() {
            return this.scenarioToEditOrCreate.description.length ? true : false;
        },
        validateForm() {
            return this.titleState && this.descriptionState;
        },
        players() {
            const { players } = this.$store.state.players;
            const playerList = players.map(player => ({
                value: player.id,
                text: player.name
            }))
            
            return playerList;
        },
        scenarios() {
            const { selectedSeason } = this;
            const { scenarios } = this.$store.state.scenarios;
            let scenarioList = []
            if(typeof(selectedSeason) === "number") {
                scenarioList = scenarios.filter(scenario => scenario.season == selectedSeason);
            } else {
                scenarioList = scenarios
            }
            const scenarioListWithNames = scenarioList.map(scenario => {
                const character = this.lookupCharacter(scenario.id, this.selectedPlayer);
                return {
                    ...scenario,
                    "played_by": character ? character: null,
                    "_rowVariant": character ? 'danger' : 'success',
                }
            })
            this.onSeasonSelection(scenarioList);
            return scenarioListWithNames;
        },
        markedUpScenarios() {
            const newList = this.scenarios;
            return [...newList]
        },
        seasons() {
            const listOfSeasons = [];
            const { scenarios } = this.$store.state.scenarios;
            scenarios.forEach(scenario => {
                if(!listOfSeasons.includes(scenario.season)) {
                    listOfSeasons.push(scenario.season)
                }
            });
            
            const seasonOptions = [{ value: null, text: "All seasons" }];
            listOfSeasons.forEach(season => seasonOptions.push({
                value: season,
                text: `Season ${season}`
            }))
            return seasonOptions;
        },
        characters() {
            const { characters } = this.$store.state.characters;
            console.log(characters, this.selectedPlayer);
            const playerCharacters = characters.filter(character => character.player_id === this.selectedPlayer);
            return playerCharacters.map(character => ({
                value: character.id,
                text: character.name
            }))
        }

    },
    methods: {
        clearScenario() {
            this.scenarioToEditOrCreate = {
                id: "",
                title: "",
                season: null,
                scen_num: 0,
                low_level: 1,
                high_level: 15,
                description: ""
            }
        },
        handleSubmit() {
            const { id, title, season, scen_num, low_level, high_level, description } = this.scenarioToEditOrCreate;
            const scenarioToSubmit = {
                title,
                season: parseInt(season, 10),
                scen_num: parseInt(scen_num, 10),
                low_level: parseInt(low_level, 10),
                high_level: parseInt(high_level, 10),
                description
            };
            if(id) {
                this.$store.dispatch('editScenario', {...scenarioToSubmit, id: id})
            } else {
                this.$store.dispatch('createScenario', scenarioToSubmit);
            }
        },
        selectScenario(selectedScenario) {
            this.scen = this.$store.state.scenarios.scenarios.filter(scenario => scenario.id === selectedScenario.id)[0]
        },
        editScenario(selectedScenario) {
            this.scenarioToEditOrCreate = this.$store.state.scenarios.scenarios.filter(scenario => scenario.id === selectedScenario.id)[0]
        },
        deleteScenario(scenario) {
            if(confirm(`Are you sure you want to delete ${scenario.title}?`)) {
                this.$store.dispatch('deleteScenario', scenario.id);
                this.selectedSeason = null;
            }
        },
        onSeasonSelection(scenarios) {
            this.totalRows = scenarios.length;
            this.currentPage = 1;
        },
        lookupCharacter(scenarioId, playerId) {
            const { playedScenarios } = this.$store.state.scenarios;
            const { characters } = this.$store.state.characters;
            const characterId = playedScenarios.filter(scen => scen.scen_id === scenarioId && scen.player_id === playerId)[0];
            if(characterId) {
                const characterName = characters.find(character => character.id === characterId.char_id);
                return characterName.name;
            } else {
                return null;
            }
        },

    }
}
</script>

<style>
.scenario-id {
    display: none;
}
.title-header {
    width: 450px;
}
</style>
