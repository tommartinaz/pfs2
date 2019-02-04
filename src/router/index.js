import Vue from 'vue';
import VueRouter from 'vue-router';
import Characters from '../components/Characters';
import Character from '../components/Character';
import Scenarios from '../components/Scenarios';
import Scenario from '../components/Scenario';
import EditCharacter from '../components/EditCharacter';
import AddScenario from '../components/AddScenario';

Vue.use(VueRouter);

export const router = new VueRouter({
    routes: [
        { path: '/', name: 'homeLink'},
        { path: '/characters', name: 'charactersLink', component: Characters, children: [
            { path: '/characters/:id', name: 'characterLink', component: Character, props: true },
            { path: '/characters/:id/edit', name: 'editCharacterLink', component: EditCharacter, props: true }
        ]},
        { path: '/scenarios', name: 'scenariosLink', component: Scenarios, children: [
            { path: '/scenarios/:id', name: 'scenarioLink', component: Scenario, props: true }
        ]},
        { path: '/addscenario', name: "addScenario", component: AddScenario }
    ],
    mode: 'history'
})
