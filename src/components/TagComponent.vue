<template>
<div class="bloc1">
    <button class="btn badge" @click="showModal = true" :style="{backgroundColor: tag['color']}">{{tag['type']}}</button>
    <transition name="fade" appear>
    <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
    </transition>
    <transition name="slide" appear>
    <div class="custom-modal" v-if="showModal">
        <div class="card">
            <h5 class="card-header">What's in {{tag['type']}}</h5>
            <div class="card-body">
                <template v-for="project in project_list">
                    <div class="listDiv" v-if="project['tags'].includes(tag['type']) && project['tab_type'] === tab['type']" :key="project.id">    
                        {{project['title']}}
                    </div>
                </template>
                <div class="listDiv">
                    <input v-model="new_tag" type="text" placeholder="Edit Tag Name??"/>
                    <input class="colorbox" v-model="tag_color" type="color" id="tag_color" name="head"> 
                </div>
                <div class="listDiv">
                    <button type="button" class="btn btn-success btn-sm" @click.prevent="editTag()">Edit Tag!!</button> | 
                    <button type="button" class="btn btn-danger btn-sm" @click="deleteTag()">Delete Tag</button>
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
    name: 'tagComponent',
    props:['tag', 'project_list', 'tab'],
    
    data: function(){
        return{
            showModal: false
        }
    },
    methods:{
        deleteTag: function() {
            db.collection('users').doc(auth.currentUser.uid).collection('tag_type').doc(this.tag.id).delete()
            for(var i = 0 ; i < this.project_list.length; i++){
                if(this.project_list[i]['tags'].includes(this.tag['type'])){
                    let project_id = this.project_list[i].id
                    let new_arr = this.project_list[i]['tags'];
                    const index = new_arr.indexOf(this.tag['type']);
                    new_arr.splice(index, 1);
                    db.collection('users').doc(auth.currentUser.uid).collection('projects').doc(project_id).update({tags: new_arr})
                }
            }
            this.showModal = false;
            
        },
        editTag: function(){
            if(this.new_tag === undefined){
                alert("Please fill the blank")
            }
            else{
                for(var i = 0 ; i < this.project_list.length; i++){
                    if(this.project_list[i]['tags'].includes(this.tag['type'])){
                        let project_id = this.project_list[i].id
                        let new_arr = this.project_list[i]['tags'];
                        const index = new_arr.indexOf(this.tag['type']);
                        new_arr.splice(index, 1);
                        new_arr.push(this.new_tag);
                        db.collection('users').doc(auth.currentUser.uid).collection('projects').doc(project_id).update({tags: new_arr})
                    }
                }
                if(this.tag_color !== undefined){
                    let updated_tag = {
                        type: this.new_tag,
                        color: this.tag_color,
                    }
                    db.collection('users').doc(auth.currentUser.uid).collection('tag_type').doc(this.tag.id).update(updated_tag).then(()=>{
                        alert("Edited Tag Saved");
                        this.showModal = false;
                        this.new_tag = undefined;
                    });
                }
                else{
                    db.collection('users').doc(auth.currentUser.uid).collection('tag_type').doc(this.tag.id).update({type: this.new_tag}).then(()=>{
                        alert("Edited Tag Saved");
                        this.showModal = false;
                        this.new_tag = undefined;
                    });
                }
                
            }
        },
    }
}
</script>

