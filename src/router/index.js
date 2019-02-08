import Vue from 'vue';
import VueRouter from 'vue-router';
import CharacterList from '../components/CharacterList';
// import Scenarios from '../components/Scenarios';
// import Scenario from '../components/Scenario';
import AddScenario from '../components/AddScenario';
import ScenarioList from '../components/ScenarioList';
import PlayerList from '../components/PlayerList';
import Player from '../components/Player';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        { path: '/', name: 'homeLink'},
        { path: '/players', name: 'playersLink', component: PlayerList },
        { path: '/players/:id', name: 'player', component: Player, props: true },
        { path: '/characters', name: 'characterListLink', component: CharacterList },
        { path: '/scenarios', name: 'scenariosLink', component: ScenarioList },
        { path: '/addscenario', name: "addScenario", component: AddScenario }
    ],
    mode: 'history'
})
