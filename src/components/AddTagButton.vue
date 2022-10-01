<template>
    <div class="bloc1">
        <button class="btn btn-primary badge" @click="showModal = true">+</button>
        
        <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
        </transition>
        <transition name="slide" appear>
        <div class="custom-modal" v-if="showModal">
            <div class="card">
                <h5 class="card-header">Add Tag</h5>
                <div class="card-body">
                    <div class="listDiv">
                        <label>Tag Name: <input v-model="tag_name" type="text" placeholder="Add tag name"/></label>
                    </div>
                    <div class="listDiv">
                        <label for="tag_color">Tag Color:</label>
                        <input class="colorbox" v-model="tag_color" type="color" id="tag_color" name="head" value="#f6b73c">
                    </div>
                    <div>
                        <button class="btn btn-primary" @click.prevent="addNewTag()">Add New Tag!!</button>
                    </div>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
import { db, auth } from '@/firebaseConfig'

export default {
    name:"addTag",

    data: function(){
        return{
            showModal: false,
        }
    },

    methods: {
        addNewTag: function(){
            if(this.tag_name === undefined || this.tag_color === undefined){
                alert("Please fill the blank and choose color")
            }
            else{
                let newProject = {
                    type: this.tag_name,
                    color: this.tag_color
                }
                db.collection('users').doc(auth.currentUser.uid).collection('tag_type').add(newProject).then(result =>{
                    if(result){
                        alert("New Tag Saved");
                        this.showModal = false;
                        this.tag_color = undefined;
                        this.tag_name = undefined;
                    }
                })
            }  
        },
    },
    
    firestore: function(){
        return{
            tag_type: db.collection('users').doc(auth.currentUser.uid).collection('tag_type')
        }
    },
}
</script>

<style scoped>
.listDiv{
    margin-top: 1em;
    margin-bottom: 1em;
}
.colorbox {
    vertical-align: top;
    resize: none;
}
</style>