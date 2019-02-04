<template>
    <div>
        <form>
            Name: <input v-model="name" @input="onInput" />
            <div class="form-group">
                <label>Race:</label>
                <select v-model="race_id">
                    <option
                        v-for="race in races"
                        :key="race.id"
                        v-bind:value="race.id"
                    >
                        {{race.race}}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label>Alignment:</label>
                <select v-model="alignment_id">
                    <option
                        v-for="alignment in alignments"
                        :key="alignment.id"
                        v-bind:value="alignment.id"
                    >
                        {{alignment.alignment}}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label>Class:</label>
                <select v-model="class_id">
                    <option
                        v-for="char_class in classes"
                        :key="char_class.id"
                        v-bind:value="char_class.id"
                    >
                        {{char_class.class}}
                    </option>
                </select>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "EditCharacter",

    data() {
        const { name, race_id, class_id, alignment_id, level } = this.character;
        return {
            name: name ? name : "",
            race_id: race_id ? race_id : 1,
            class_id: class_id ? class_id : 1,
            alignment_id: alignment_id ? alignment_id : 1,
            level: level ? level : 1
        }
    },
    props: ['character'],
    computed: {
        alignments() {
            return this.$store.state.alignments.alignments;
        },
        races() {
            return this.$store.state.races.races;
        },
        classes() {
            return this.$store.state.classes.classes;
        }
    },
    methods: {
        onInput(e) {
            this.name = e.target.value;
        }
    },
    watch: {
        character() {
            const { name, level, class_id, alignment_id, race_id } = this.character;
            this.name = name;
            this.level = level,
            this.class_id = class_id,
            this.alignment_id = alignment_id,
            this.race_id = race_id
        }
    }
}
</script>

<style scoped>

</style>