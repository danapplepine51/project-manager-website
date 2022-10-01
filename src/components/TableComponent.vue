<template>
    <div class="row">
        <div class="col-sm">
            {{project['title']}}
        </div>
        <div class="col-sm">
            <template v-if="project['priority'] >= 9">
                Do It Now!
            </template>
            <template v-else-if="project['priority'] >= 7">
                High
            </template>
            <template v-else-if="project['priority'] >= 5">
                Medium
            </template>
            <template v-else-if="project['priority'] >= 3">
                Low
            </template>
            <template v-else-if="project['priority'] >= 1">
                Maybe Later
            </template>
            
        </div>
        <div class="col-sm">
            
            <div class="bloc1" v-for="tag in project['tags']" :key="tag.id">
                <div class="bloc1" v-for="tag_color in tag_type" :key="tag_color.id">
                    <div class="bloc1" v-if="tag_color['type'] === tag">
                        <a class="badge custom-badges" :style="{backgroundColor: tag_color['color']}">{{tag}}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm">
            {{ getDate() }}
        </div>
    </div>
</template>


<script>
export default {

    name:"TableComponent",
    props: ['project', 'tag_type'],

    data: function(){
        return {
            date: false,
        }
    },

    methods: {
        getDate : function(){
            let current = this.project['due_date'].toDate()
            let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            let localISOTime = (new Date(current - tzoffset)).toISOString().slice(0, 10);
            this.date = localISOTime
            return localISOTime
        },
    },
}
</script>

<style>
.custom-badges {
    pointer-events: none;
    text-decoration: none;
}
</style>
