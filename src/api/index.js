import character from './characters';
import scenario from './scenarios';
import alignment from './alignmnets';
import clss from './classes';
import race from './races';
import player from './players';

export default {
    // FETCH
    fetchCharacters: character.fetchCharacters,
    fetchAlignments: alignment.fetchAlignments,
    fetchClasses: clss.fetchClasses,
    fetchRaces: race.fetchRaces,
    fetchScenarios: scenario.fetchScenarios,
    fetchPlayers: player.fetchPlayers,
    fetchPlayedScenarios: scenario.fetchPlayedScenarios,

    // FETCH ONE
    fetchOnePlayer: player.fetchOnePlayer,

    // CREATE

    createScenario: scenario.createScenario,
    createCharacter: character.createCharacter,
    createPlayer: player.createPlayer,

    // EDIT

    editCharacter: character.editCharacter,
    editScenario: scenario.editScenario,
    markPlayed: scenario.markPlayed,

    // DELETE

    deleteCharacter: character.deleteCharacter,
    deleteScenario: scenario.deleteScenario,
    removePlayed: scenario.removePlayed,
};