<template>
    <b-container>
        <b-row no-gutters>
            <b-col cols="6" class="create-btn-row">
                <b-btn
                    v-b-modal.modalPlayer
                    v-b-modal.modal-center
                    class="create-btn mt-2 px-2"
                >
                    Create New Player
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
                    :items="players"
                    :fields="fields"
                    sort-by="pfs_id"
                >
                    <template slot="show_details" slot-scope="row">
                        <b-button size="sm" @click="navigateToPlayerPage(row.item)" clss="mr-2">
                            View
                        </b-button>
                    </template>
                    <template slot="row-details" slot-scope="row">
                        <b-row class="mb-2">
                            <b-col sm="3">Email</b-col>
                            <b-col>{{row.item.email}}</b-col>
                        </b-row>
                        <p>Characters</p>
                        <b-table
                            v-if="characters(row.item.id).length"
                            :items="characters(row.item.id)"
                            :fields="characterFields"
                            sort-by="character_num"
                        >
                        </b-table>
                        <div v-else>No characters for this player</div>
                    </template>
                </b-table>
            </b-col>
        </b-row>  
        <b-modal
            id="modalPlayer"
            ref="modal"
            title="Create a player"
            @ok="submitPlayer"
        >
            <b-form-group>
                <p>Name</p>
                <b-form-input 
                    :state="nameState"
                    v-model="player.name"
                    aria-describedby="nameFeedback"
                    placeholder="Please enter your name"
                />
                <b-form-invalid-feedback id="nameFeedback">
                    Player name is required
                </b-form-invalid-feedback>
            </b-form-group>

            <p>PFS ID</p>
            <b-form-input 
                v-model="player.pfs_id"
                placeholder="Please enter your PFS ID"
            />

            <b-form-group>
                <p>email</p>
                <b-form-input 
                    :state="emailState"
                    v-model="player.email"
                    aria-describedby="emailFeedback"
                    placeholder="Please enter your email"
                />
                <b-form-invalid-feedback id="emailFeedback">
                    Email address is required
                </b-form-invalid-feedback>
            </b-form-group>
        </b-modal>      
    </b-container>
</template>

<script>
import { router } from '../router';
export default {
    name: "Players",
    data() {
        return {
            fields: [
                { key: 'name', sortable: true, label: 'Player Name' },
                { key: 'pfs_id', sortable: true },
                { key: 'show_details' },
                { key: 'edit' },
                { key: 'delete' }
            ],
            characterFields: [
                { key: 'character_num', sortable: true, label: 'Character Number' },
                { key: 'name', sortable: true, label: 'Character Name' }
            ],
            player: {
                name: "",
                pfs_id: "",
                email: "",
                password: "",
            }
        }
    },
    computed: {
        players() {
            return this.$store.state.players.players
        },
        nameState() {
            return this.player.name.length > 0 ? true : false;
        },
        emailState() {
            return this.player.email.length > 0 ? true : false;
        }
    },
    methods: {
        characters(id) {
            return this.$store.state.characters.characters.filter(character => character.player_id === id)
        },
        submitPlayer() {
            this.$store.dispatch('createPlayer', this.player);
        },
        navigateToPlayerPage(player) {
            router.push(`/players/${player.id}`)
        }
    }  
}
</script>

<style scoped>

</style>
