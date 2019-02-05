<template>
    <div>
        Select a season to filter the list
        <select class="custom-select custom-select-sm mb-3" style="{width: 18rem}" v-model="selectedSeason" @change="setSeason">
            <option value="">All Seasons</option>
            <option 
                v-for="n in 12"
                :key="n"
                v-bind:value="n < 12 ? n-1 : n"
            >
                Season {{n-1}}
            </option>
        </select>
        <!-- <div class="dropdown">
            <button class="btn bth-secondary dropdown-toggle" type="button" data-toggle="dropdown" id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false">
                Select a season
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" v-for="n in 11" :key="n">Season {{n}}</a>
            </div>
        </div> -->
        <router-link :to="{ name: 'addScenario'}">Add scenario</router-link>

        <div class="scenarios">
            <div v-if="scenarios.length">
                <div
                    class="card"
                    style="max-width: 40rem; min-width: 32rem;"
                >
                    <h5 class="card-title" v-if="selectedSeason">Season {{selectedSeason}}</h5>
                    <h5 class="card-title" v-else>All seasons</h5>
                    <ul class="list-group list-group-flush">
                        <router-link
                            v-for="scenario in scenarios"
                            :key="scenario.id"
                            :to="{ name: 'scenarioLink', params: { id: scenario.id, scenario: scenario } }"
                        >
                            {{`${scenario.season}-${scenario.scen_num}: ${scenario.title}`}}
                        </router-link>
                    </ul>
                </div>
            </div>
            <div>
                <router-view
                    class="router-view"
                ></router-view>
            </div>
        </div>

    </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';
import { router } from '../router';

export default {
    name: "Scenarios",
    data() {
        return {
            selectedSeason: window.localStorage.selectedSeason,
            // playedStyle: {
            //     color: 'red',
            //     "text-decoration": 'line-through'
            // },
            // notPlayedStyle: {
            //     color: 'green'
            // }
        }
    },
    computed: {
        scenarios() {
            const { scenarios } = this.$store.state.scenarios;
            if(!!this.selectedSeason || this.selectedSeason === 0){
                return scenarios.filter(scenario => scenario.season == this.selectedSeason).sort((a, b) => a.scen_num - b.scen_num);
            } else {
                return scenarios
            }
        },
        seasonName(n) {
            return n < 12 ? `Season ${n - 1}` : `All seasons`
        }
    },
    mutations: {
    },
    methods: {
        setSeason(event) {
            router.push('/scenarios'); 
            window.localStorage.setItem('selectedSeason', event.target.value)  
        }
    },
    beforeRouteLeave(to, from, next) {
        window.localStorage.removeItem('selectedSeason');
        next();
    } 
}
</script>

<style scoped>
    .scenarios {
        display: flex;
    }
    .not-played {
        color: #28a745;
    }
    .card, .router-view {
        margin: 20px 0;
    }
    .played {
        color: red;     
    }
</style>