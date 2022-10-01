<template>
    <div>
        <ul id="projects" v-for="tab in tab_type" :key="tab.id">
            
            <div class="card border-info mb-3 tabCard">
                <div class="card-header">
                     <div class="">
                        <!-- <b-dropdown id="dropdown-1" text="tab.type" class="m-md-2">
                        <template #button-content> {{tab.type}} </template>
                        <b-dropdown-item><delete-tab-button v-bind:id="tab.id" v-bind:tab_name="tab.type"/></b-dropdown-item>
                        </b-dropdown>|  -->
                        <tab-component v-bind:project_list="project_list" v-bind:tab="tab"/> |
                        <add-list-button v-bind:id="tab.id"/> | 
                        <div class="bloc1" v-for="tag in tag_type" :key="tag.id">
                            <tag-component v-bind:tag="tag" v-bind:project_list="project_list" v-bind:tab="tab"/> |
                        </div>
                        <add-tag-button/>
                    </div>
                </div>
                <div class="card-body">     


                               

                    <div class="list-group ">                
                        <div class="">
                            <a class="list-group-item list-group-item-action active">
                                <div class="row">
                                    <div class="col-sm"> Title </div>
                                    <div class="col-sm"> Prority </div>
                                    <div class="col-sm"> Tags </div>
                                    <div class="col-sm"> Due Date</div>
                                </div>
                            </a>
                        </div>
                        <div class="">
                            <template v-for="project in project_list">
                                <template v-if="project.tab_type == tab.type && !list_tag_display.includes(project.tab_type)">
                                    <button type="button" @click="editList(project, tab)" class="list-group-item list-group-item-action" :key="project.id">
                                        <table-component v-bind:project="project" v-bind:tag_type="tag_type" :key="project.key"></table-component>
                                    </button>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </ul>
        <transition name="fade" appear>
            <div class="modal-overlay" v-if="showModal && is_edit" @click="notEdit()"></div>
        </transition>
        <transition name="slide" appear>
            <div class="custom-modal" v-if="showModal && is_edit">
                <popup-component v-bind:tab_element="tab_type" v-bind:project_element="project_to_edit" @update="notEdit()"/>
            </div>
        </transition>
          
    
    </div>
</template>

<script>
import AddListButton from "@/components/AddListButton.vue"
import AddTagButton from "@/components/AddTagButton.vue"
import TableComponent from "@/components/TableComponent.vue"
import PopupComponent from "@/components/PopupComponent.vue"
import TagComponent from "@/components/TagComponent.vue"
import TabComponent from "@/components/TabComponent.vue"
import { db, auth } from "@/firebaseConfig"

export default {
    name: "ProjectComponent",

    components: {
        AddListButton,
        AddTagButton,
        TableComponent,
        PopupComponent,
        TagComponent,
        TabComponent
    },

    data: function() {
        return{
            project_list: false,
            tab_type: false,
            tag_type: false,
            showModal: false,
            is_edit: false,
            edit_id: false,
            project_to_edit: false,
            list_tag_display: [],
            tab_element: false
        }
    },

    methods: {
        editList: function(project, tab) {
            this.tab_element = tab
            this.project_to_edit = project
            this.is_edit = true
            this.showModal = true
        },
        notEdit: function() {
            this.tab_element = false,
            this.is_edit=false,
            this.showModal = false
        },
        toggleTagFilter: function(tag_name) {
            if(this.list_tag_display.includes(tag_name)){
                const index = this.list_tag_display.indexOf(tag_name);
                this.list_tag_display.splice(index, 1);
            }
            else{
                this.list_tag_display.push(tag_name);
            }
        }
    },

    firestore: function(){
        return{
            project_list: db.collection('users').doc(auth.currentUser.uid).collection('projects').orderBy('created_date', 'desc'),
            tab_type: db.collection('users').doc(auth.currentUser.uid).collection('tab_type').orderBy('created_date', 'asc'),
            tag_type: db.collection('users').doc(auth.currentUser.uid).collection('tag_type'),
        }
    },
}
</script>

<style>

.block_container
{
    text-align:center;
}
.bloc1, .bloc2
{
    display:inline;
}

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
 max-width: 400px;
 background-color: #FFF;
 border-radius: 16px;
 
 padding: 25px;
}

.fade-enter-active,
.fade-leave-active {
 transition: opacity .3s;
}

.fade-enter,
.fade-leave-to {
 opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
 transition: transform .3s;
}

.slide-enter,
.slide-leave-to {
 /* transform: translateX(-50%) translateY(-100vw); */
 
 transform: translateX(-100vw) translateY(-100vh);
}

.tabCard{
    margin:2em;
}
</style>
