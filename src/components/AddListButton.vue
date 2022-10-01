<template>
    <div class="bloc1">
        <button class="btn btn-primary" @click="showModal = true">+</button>
        <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
        </transition>
        <transition name="slide" appear>
        <div class="custom-modal" v-if="showModal">
            <div class="card">
                <h5 class="card-header">{{tab_type['type']}}</h5>
                <div class="card-body">
                    <div class="listDiv">
                        <label>Title: <input v-model="title" type="text" placeholder="Add your title"/></label>
                    </div>
                    <div class="listDiv">
                        <label for="content_box">Content:
                            <textarea name="content_box" v-model="content" class="scrollabletextbox textarea" style=""/>
                        </label>
                    </div>
                    <div class="listDiv">
                        <label>Due Date: <input v-model="due_date" type="datetime-local"/></label>
                    </div>
                    <div class="listDiv">
                        <label>Priority(1:low ~ 10:high): <input v-model="priority" type="number" inputmode="numeric" pattern="[0-9]*" placeholder="Priority 1(high) ~ 10(low)" min="1" max="10"/></label>
                    </div>
                    <div class="listDiv">
                        <b-dropdown id="dropdown-1" text="tab.type" class="m-md-2">
                        <template #button-content> Tags </template>
                            <div v-for="tag in tag_type" :key="tag.id">
                                <input type="checkbox" true-value="yes" false-value="no" @change="toggleOption(tag['type'])">:
                                <button type="button" class="btn badge" :style="{backgroundColor: tag['color']}">{{tag['type']}}</button>
                            </div>
                        </b-dropdown>
                    </div>
                    <div class="listDiv">
                        <button class="btn btn-primary" @click.prevent="addNewList()">Add New List!!</button>
                    </div>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
import { db, auth } from '@/firebaseConfig'
import firebase from 'firebase'


export default {
    name:"addList",
    props:['id'],

    data: function(){
        return{
            showModal: false,
            tab_type: false,
            title: "",
            content: "",
            due_date: "",
            priority: 5,
            toggled_tag: []
        }
    },

    methods: {
        toggleOption: function(name){
            let deleted = false;
            for(var i=0; i < this.toggled_tag.length; i++){
                if(this.toggled_tag[i] === name){
                    this.toggled_tag.splice(i, 1);
                    break;
                }
            }
            if(!deleted){
                this.toggled_tag.push(name);
            }
        },
        addNewList: function(){
            if(this.title === undefined || this.content === undefined || this.due_date === undefined){
                alert("Please fill the blank");
            }
            else if(isNaN(this.priority)){
                alert("Please input valid priority(1 ~ 10)");
            }
            else{
                let newProject = {
                    title: this.title,
                    content: this.content,
                    created_date: firebase.firestore.FieldValue.serverTimestamp(),
                    due_date: firebase.firestore.Timestamp.fromDate(new Date(this.due_date)),
                    tab_type: this.tab_type['type'],
                    priority: this.priority,
                    tags: this.toggled_tag,
                }
                db.collection('users').doc(auth.currentUser.uid).collection('projects').add(newProject).then(result =>{
                    if(result){
                        alert("New List Saved");
                        this.showModal = false;
                        this.title = undefined;
                        this.content = undefined;
                        this.due_date = undefined;
                        this.priority = 5;
                        this.toggled_tag = [];
                    }
                })
            }
            
        },
    },
    
    firestore: function(){
        return{
            tab_type: db.collection('users').doc(auth.currentUser.uid).collection('tab_type').doc(this.id),
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
.textarea {
    vertical-align: top;
    resize: none;
    height: 100px;
}
</style>