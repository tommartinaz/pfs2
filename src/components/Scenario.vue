<template>
    <div>
        <div style="max-width: 50rem; margin: 0 50px">
            <div>
                <h5 class="card-title">{{scenario.season}}-{{scenario.scen_num}} {{scenario.title}}</h5>
                <h6 class="card-subtitle mb-2">Levels {{scenario.low_level}} - {{scenario.high_level}}</h6>
                <p class="card-text">{{scenario.description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Scenario",
    props: ['scenario'],
}
</script>
