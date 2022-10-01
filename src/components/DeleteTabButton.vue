<template>
    <button class="btn btn-danger bloc2" @click="deleteTab()">Delete Tab</button>
    <!-- <a @click="deleteTab()">Delete Tab</a> -->
</template>

<script>
import { db, auth } from '@/firebaseConfig'

export default {
    name:"deleteTab",
    props:['id', 'tab_name'],

    data: function(){
        return{
            projects: false,
            tab_type: false,
        }
    },

    methods: {
        deleteTab: function(){
            for (var i = 0; i < this.projects.length; i++){
                db.collection('users').doc(auth.currentUser.uid).collection('projects').doc(this.projects[i].id).delete()
            }
            db.collection('users').doc(auth.currentUser.uid).collection('tab_type').doc(this.id).delete()
        },
    },
    
    firestore: function(){
        return{
            tab_type: db.collection('users').doc(auth.currentUser.uid).collection('tab_type').doc(this.id),
            projects: db.collection('users').doc(auth.currentUser.uid).collection('projects').where("tab_type", "==", this.tab_name)
        }
    },
}
</script>

<style>
</style>