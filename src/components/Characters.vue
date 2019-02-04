<template>
    <div>
        <div class="characterListHeader">
            <h1>CHARACTER LIST</h1>
            <!-- <button class="btn btn-success" @click="addCharacter">Add new character</button> -->
        </div>
        <div class="characters">
            <div v-if="characters.length">
                <ul class="list-group list-group-flush">
                    <router-link
                        v-for='character in characters'
                        :key="character.id"
                        :to="{ name: 'characterLink', params: { id: character.id, character: character }}"
                    >
                        {{character.name}}
                    </router-link>
                </ul>
            </div>
            <router-view
                :toggleViewChar="toggleCharacterModal"
                class="character-details"
            ></router-view>
        </div>
    </div>
</template>

<script>
import { router } from '../router';

export default {
    name: "Characters",
    data() {
        return {
            selectedCharacter: {},
            viewCharacterModal: false,
        }
    },
    methods: {
        selectCharacter(character) {
            this.selectedCharacter = character;
            this.viewCharacterModal = true;
            router.push(`/characters/${character.id}`)
        },
        toggleCharacterModal() {
            this.viewCharacterModal = !this.viewCharacterModal;
        }
    },
    computed: {
        characters() {
            return this.$store.state.characters.characters;
        },
    },
    updated() {
        this.$emit('characters');
    },
}   
</script>

<style scoped>
    .characters {
        display: flex;
    }
    .characterListHeader {
        display: flex;
    }
    .character-details {
        background-color: #eee;
        border: 1px solid black;
        margin: 0 40px;
        border-radius: 3px;
        padding: 5px;
    }
    ul {
        list-style-type: none;
    }
    li:hover {
        cursor: pointer;
        background-color: #eee;
    };
</style>