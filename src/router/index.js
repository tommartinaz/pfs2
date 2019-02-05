import Vue from 'vue';
import VueRouter from 'vue-router';
import CharacterList from '../components/CharacterList';
import Scenarios from '../components/Scenarios';
import Scenario from '../components/Scenario';
import AddScenario from '../components/AddScenario';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        { path: '/', name: 'homeLink'},
        { path: '/characters', name: 'characterListLink', component: CharacterList },
        { path: '/scenarios', name: 'scenariosLink', component: Scenarios, children: [
            { path: '/scenarios/:id', name: 'scenarioLink', component: Scenario, props: true }
        ]},
        { path: '/addscenario', name: "addScenario", component: AddScenario }
    ],
    mode: 'history'
})
