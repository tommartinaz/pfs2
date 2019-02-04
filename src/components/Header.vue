<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class='collapse navbar-collapse'>
        <a class="navbar-brand" href="/">PFS Character Tracker</a>
        <ul class="navbar-nav">
            <router-link :to="{ name: 'homeLink' }" tag='li'><a class="nav-link">Home</a></router-link>
            <router-link :to="{ name: 'charactersLink' }" tag='li'><a class="nav-link">Characters</a></router-link>
            <router-link :to="{ name: 'scenariosLink' }" tag='li'><a class="nav-link">Scenarios</a></router-link>
        </ul>
        </div>
    </nav>
</template>

<style scoped>

</style>