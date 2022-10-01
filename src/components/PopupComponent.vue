<template>
    <div>
        <div class="card">
        <h5 class="card-header">Detail: {{title}}</h5>
        <div class="card-body">
            <div class="listDiv">
                <label class="divLabel">Title: <input v-model="title" type="text" placeholder="Edit your title"/></label>
            </div>
            <div class="listDiv">
                <label for="content_box">Content:
                <textarea name="content_box" v-model="content" class="scrollabletextbox textarea" style=""/>
                </label>
            </div>
            <div class="listDiv">
                <label>Priority: <input v-model="priority" type="number" inputmode="numeric" pattern="[0-9]*" placeholder="Priority 1(high) ~ 10(low)" min="1" max="10"/></label>
            </div>
            <div class="listDiv">
                <label>Due Date: <input v-model="due_date" type="datetime-local" placeholder="Add your content"/></label>
            </div>
            <div class="listDiv">
                <b-dropdown id="dropdown-1" text="tab.type" class="m-md-2">
                <template #button-content> Tags </template>
                    <div v-for="tag in tag_type" :key="tag.id">
                        <div v-if="checkExist(tag['type'])">
                            <input type="checkbox" @change="toggleOption(tag['type'])" checked>
                            <button type="button" class="btn badge" :style="{backgroundColor: tag['color']}">{{tag['type']}}</button>
                        </div>
                        <div v-else>
                            <input type="checkbox" @change="toggleOption(tag['type'])">{{ }}
                            <button type="button" class="btn badge" :style="{backgroundColor: tag['color']}">{{tag['type']}}</button>
                        </div>
                    </div>
                </b-dropdown>

                <b-dropdown id="dropdown-2" text="tab.type" class="m-md-2">
                <template #button-content> Tab </template>
                    <div v-for="tab in tab_element" :key="tab.id">
                        <input type="radio" id="1" name="tab_radio" v-model="tab_value" v-bind:value="tab['type']">
                        <label for="1">{{tab['type']}}</label>
                    </div>
                </b-dropdown>
            </div>
            <div class="listDiv">
                <button type="button" class="btn btn-success btn-sm" @click="editList()">Edit List!!</button> |
                <button type="button" class="btn btn-danger btn-sm" @click="deleteList()">Delete</button>
            </div>
            </div>
        </div>
    </div>
    
</template>


<script>
import { db, auth } from '@/firebaseConfig'
import firebase from 'firebase'

export default {
    name:"popupComponent",
    props:['tab_element', 'project_element'],

    data: function(){
        return{
            tab_type: false,
            tag_type: false,
            project: false,
            edit_title: false,
            edit_content: false,
            edit_due_date: false,
            title: this.project_element['title'],
            content: this.project_element['content'],
            priority: this.project_element['priority'],
            due_date: this.initTime(),
            toggled_tag: this.initTag(),
        }
    },

    firestore: function(){
        return{
            project: db.collection('users').doc(auth.currentUser.uid).collection('projects').doc(this.id),
            tag_type: db.collection('users').doc(auth.currentUser.uid).collection('tag_type'),
            tab_type: db.collection('users').doc(auth.currentUser.uid).collection('tab_type')
        }
    },

    methods: {
        initTime: function(){
            let current = this.project_element['due_date'].toDate()
            let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
            let localISOTime = (new Date(current - tzoffset)).toISOString().slice(0, -1);
            this.due_date = localISOTime
            return localISOTime
        },
        initTag: function(){
            let temp = []
            
            for(var i=0; i < this.project_element['tags'].length; i++){
                temp.push(this.project_element['tags'][i])
            }
            return temp;
        },
        toggleOption: function(name){
            if(this.toggled_tag.includes(name)){
                const index = this.toggled_tag.indexOf(name);
                this.toggled_tag.splice(index, 1);
            }
            else{
                this.toggled_tag.push(name);
            }
        },
        checkExist: function(tag_name){
            return this.project_element['tags'].includes(tag_name)
        },
        deleteList: function() {
            db.collection('users').doc(auth.currentUser.uid).collection('projects').doc(this.project_element.id).delete()
            this.$emit('update', false)
        },
        editList: function(){
            if(this.title === undefined || this.content === undefined || this.due_date === undefined){
                alert("Please fill the blank")
            }
            else if(this.tab_value !== undefined){
                let newProject = {
                    title: this.title,
                    content: this.content,
                    created_date: firebase.firestore.FieldValue.serverTimestamp(),
                    due_date:firebase.firestore.Timestamp.fromDate(new Date(this.due_date)),
                    priority: this.priority,
                    tab_type: this.tab_value,
                    tags: this.toggled_tag
                }
                db.collection('users').doc(auth.currentUser.uid).collection('projects').doc(this.project_element.id).update(newProject).then(()=>{
                    alert("Edited List Saved");
                    this.$emit('update', false);
                })
            }
            else{
                let newProject = {
                    title: this.title,
                    content: this.content,
                    created_date: firebase.firestore.FieldValue.serverTimestamp(),
                    due_date:firebase.firestore.Timestamp.fromDate(new Date(this.due_date)),
                    priority: this.priority,
                    tab_type: this.project_element['tab_type'],
                    tags: this.toggled_tag
                }
                db.collection('users').doc(auth.currentUser.uid).collection('projects').doc(this.project_element.id).update(newProject).then(()=>{
                    alert("Edited List Saved");
                    this.$emit('update', false);
                    this.title = undefined;
                    this.content = undefined;
                    this.due_date = undefined;
                    this.priority = 5
                })
            }
        },
    },
}
</script>

<style scoped>

.listDiv{
    margin-top: 1em;
    margin-bottom: 1em;
}

.textarea {
    vertical-align: top;
    resize: none;
    height: 100px;
}

.spectrum {
  display: block;
  width: 150px;
  height: 15px;
  margin: 0 0 -3px 7px;
  background: -webkit-linear-gradient(left, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%) 100%);
}

input[type=range] {
  width: 161px;
  margin-top: -5px;
}
</style>