<template>
    <div><h1 class="block_container" id="title">Project Manager</h1>
        <add-tab-button class="block_container" id="addTabButton"/>
        <project-component/>
    </div>
    
</template>


<script>
import ProjectComponent from "@/components/ProjectComponent.vue"
import AddTabButton from "@/components/AddTabButton.vue"

export default {
    name: "DashboardView",

    components: {
        ProjectComponent,
        AddTabButton,
    },
}
</script>

<style scoped>
#title{
    margin: 1em;
}
#addTabButton{
    margin-bottom: 1em;
}
</style>