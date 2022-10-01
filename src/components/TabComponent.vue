<template>
<div class="bloc1">
    <button class="btn btn-secondary" @click="showModal = true">{{tab['type']}}</button>
    <transition name="fade" appear>
    <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
    </transition>
    <transition name="slide" appear>
    <div class="custom-modal" v-if="showModal">
        <div class="card">
            <h5 class="card-header">{{tab['type']}}</h5>
            <div class="card-body">
                <!-- <template v-for="project in project_list">
                    <div class="listDiv" v-if="project['tab_type'] === (tag['type'])" :key="project.id">    
                        {{project['title']}}
                    </div>
                </template> -->
                <div class="listDiv">
                    <input v-model="new_tab" type="text" placeholder="Edit Tab Name"/>
                </div>
                <div class="listDiv">
                    <button type="button" class="btn btn-success btn-sm" @click.prevent="editTab()">Edit Tab!!</button> |
                    <button type="button" class="btn btn-danger btn-sm" @click="deleteTab()">Delete Tab</button>
                </div>
            </div>
        </div>
    </div>
    </transition>
</div>
    
</template>


<script>
import { db, auth } from "@/firebaseConfig"

export default {
    name: 'tabComponent',
    props:['project_list', 'tab'],

    data: function(){
        return{
            showModal: false
        }
    },
    methods:{
        deleteTab: function() {
            db.collection('users').doc(auth.currentUser.uid).collection('tab_type').doc(this.tab.id).delete()
            for(var i = 0 ; i < this.project_list.length; i++){
                if(this.project_list[i]['tab_type'] === this.tab['type']){
                    let project_id = this.project_list[i].id
                    db.collection('users').doc(auth.currentUser.uid).collection('projects').doc(project_id).delete()
                }
            }
            this.showModal = false;
        },
        editTab: function(){
            if(this.new_tab === undefined){
                alert("Please fill the blank")
            }
            else{
                db.collection('users').doc(auth.currentUser.uid).collection('tab_type').doc(this.tab.id).update({type: this.new_tab})
                for(var i = 0 ; i < this.project_list.length; i++){
                    if(this.project_list[i]['tab_type'] === this.tab['type']){
                        let project_id = this.project_list[i].id
                        db.collection('users').doc(auth.currentUser.uid).collection('projects').doc(project_id).update({tab_type: this.new_tab})
                    }
                }
                alert("Tab Updated");
                this.showModal = false;
            }
        },
    }
}
</script>

