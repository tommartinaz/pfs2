<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class='collapse navbar-collapse'>
        <a class="navbar-brand" href="/">PFS Character Tracker</a>
        <ul class="navbar-nav">
            <router-link :to="{ name: 'homeLink' }" tag='li' class="nav-link">Home</router-link>
            <router-link :to="{ name: 'playersLink'}" tag="li" class="nav-link">Players</router-link>
            <router-link :to="{ name: 'characterListLink' }" tag='li' class="nav-link">Characters</router-link>
            <router-link :to="{ name: 'scenariosLink' }" tag='li' class="nav-link">Scenarios</router-link>
        </ul>
        </div>
    </nav>
</template>

<style scoped>

</style>