<template>
    <div>
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Scenario Title</span>
                <input type="text" class="form-control" v-model="title" placeholder="Title goes here" />
            </div>
        </div>
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Season</span>
                <input type="number" min="0" max="10" class="form-control" v-model="season" />
            </div>
        </div>
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Scenario Number</span>
                <input type="text" class="form-control" v-model="scen_num" />
            </div>
        </div>
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Low level</span>
                <input type="text" class="form-control" v-model="low_level" />
            </div>
        </div>
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">High level</span>
                <input type="text" class="form-control" v-model="high_level" />
            </div>
        </div>
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Description</span>
                <input type="textarea" class="form-control" v-model="description" />
            </div>
        </div>
        <button class="btn btn-primary" @click="saveScenario">Save</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "AddScenario",
    data() {
        return {
            title: "",
            season: 0,
            scen_num: 0,
            low_level: 1,
            high_level: 15,
            description: "",
        }
    },
    methods: {
        ...mapActions([
            'addScenario'
        ]),
        saveScenario() {
            const { title, season, scen_num, low_level, high_level, description } = this;
            const scenarioToSubmit = {
                title,
                season: parseInt(season, 10),
                scen_num: parseInt(scen_num, 10),
                low_level: parseInt(low_level, 10),
                high_level: parseInt(high_level, 10),
                description
            }
            this.addScenario(scenarioToSubmit);
        }
    }
}
</script>

<style scoped>

</style>