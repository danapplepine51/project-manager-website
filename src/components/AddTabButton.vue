<template>
    <div>
        <button type="button" class="btn btn-primary" @click="showModal = true">Add Tab</button>
        <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
        </transition>
        <transition name="slide" appear>
        <div class="custom-modal" v-if="showModal">
            <div class="card">
                <h5 class="card-header">Enter Tab Name</h5>
                <div class="card-body">
                    <div class="listDiv">
                        <input v-model="new_tab" type="text" placeholder="Add new tab here"/>
                        <button class="btn btn-primary buttonSpacer" type="submit" @click.prevent="addNewTab()">Add</button>
                    </div>
                </div>
            </div>
        </div>
        </transition>
    </div>
</template>

<script>
import firebase from 'firebase'
import { db, auth } from '@/firebaseConfig'

export default {
    name: "addTabButton",
    data: function() {
        return{
            showModal: false,
            new_tab: ""
        }
    },
    methods: {
        addNewTab: function(){
            let newTab = {
                type: this.new_tab,
                created_date: firebase.firestore.FieldValue.serverTimestamp()
            }
            db.collection('users').doc(auth.currentUser.uid).collection('tab_type').add(newTab).then(result =>{
                if(result){
                    alert("New Tab Saved");
                    this.showModal = false;
                    this.new_tab = undefined;
                }
            })
        },
    }
}
</script>

<style>
.modal-overlay {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 z-index: 98;
 background-color: rgba(0, 0, 0, 0.3);
}

.custom-modal {
 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 z-index: 99;
 
 width: 100%;
 max-width: 25em;
 background-color: #FFF;
 border-radius: 1em;
 
 padding: 2em;
}

.fade-enter-active,
.fade-leave-active {
 transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
 opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
 transition: transform .5s;
}

.slide-enter,
.slide-leave-to {
 transform: translateX(-50%) translateY(-100vw);
}

.buttonSpacer{
    margin-left: 1em;
}

.listDiv{
    margin-top: 1em;
    margin-bottom: 1em;
}
</style>