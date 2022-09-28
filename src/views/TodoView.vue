<template>
  <div class="todo">
    <section class="wrapper">
      <form class="new-todo-form">
        <label class="new-todo-label">
          New Todo:
          <input v-model="new_content" type="text" placeholder="Add your new Todo" class="new-todo-input"/>
        </label>
        <button type="submit" @click.prevent="addTodo()" class="new-todo-button">Add</button>
      </form>
      
      <ul class="todo-list" v-for="todo in todo_list" :key="todo.id">
          <li class="todo-item" v-if="todo.done == false">
            <button class="todoBtn label label-danger" @click="markDone(todo.id)">Done</button>
            <label class="todo-item-label">
              <router-link :to="{ name: 'todoDetail', params: { id: todo.id }}">{{todo.content.substring(0,50)}}</router-link>
            </label>
          </li>
      </ul>
      <div>
      <span>Categories:  </span>
      <router-link :to="{ name: 'todoCategory', params: { category: category.category }}"
          :key="category.id"
          v-for="category in this.categories">| {{ category.category }} |</router-link>
      </div>
      <!-- <span>Categories</span> -->
      <ul>
        <input class="new-todo-input" @click="new_category=''" v-model="new_category" placeholder="Add new category"/>
        <button class="todoBtn label label-primary" @click="addCategory">Add</button>
      </ul>
      <ul class="todo-list" v-for="category in categories" :key="category.id">
          <li class="todo-item">
            <button class="todoBtn label label-danger" @click="deleteCategory(category.id)">Delete</button>
            <label class="todo-item-label">
              <router-link :to="{ name: 'todoCategory', params: { category: category.category }}">{{ category.category }}</router-link>
            </label>
          </li>
      </ul>
    </section>
  </div>
</template>
 
<script>
import { auth, db } from '@/firebaseConfig';
import firebase from 'firebase';

export default {
  name: 'TodoView',
  beforeCreate: function() {
    if(auth.currentUser === null){
      this.$router.replace('/404')
    }
  },
  data: function(){
    return {
      todo_list: false,
      categories: false,
      new_category: "",
      temp: []
    }
  },
  firestore: function(){
    return{
      categories: db.collection('todos').doc(auth.currentUser.uid).collection('categories'),
      todo_list: db.collection('todos').doc(auth.currentUser.uid).collection('item').orderBy('created', 'desc')
    }
  },
  methods: {
    addTodo: function(){
      let newTodo = {
        content: this.new_content,
        done: false,
        category: [],
        created: firebase.firestore.FieldValue.serverTimestamp()
      }
      db.collection('todos').doc(auth.currentUser.uid).collection('item').add(newTodo)
    },
    addCategory: function() {
      db.collection('todos').doc(auth.currentUser.uid).collection('categories').add({category: this.new_category})
    },
    markDone: function(todo_id){
      db.collection('todos').doc(auth.currentUser.uid).collection('item').doc(todo_id).update({done: true})
    },
    deleteCategory: function(delete_category) {
      db.collection('todos').doc(auth.currentUser.uid).collection('categories').doc(delete_category).delete()
    },
  }
}
</script>
 
<style>
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
.page-header {
  padding: 5rem 0;
  width: 100%;
  background: #FF33AE;
}
.wrapper {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 1rem;
}
.new-todo-form {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 3px;
  border: 1px solid #FAFAFA;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, .15);
  margin-top: -3rem;
  background: white;
}
.new-todo-label {
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: flex-start;
  text-align: left;
  font-weight: bold;
}
.new-todo-input {
  padding: .5rem;
  border-radius: 3px;
  border: 1px solid lightgrey;
  font-size: 1rem;
  margin-top: .5rem;
  font-weight: normal;
}
.new-todo-button {
  font-size: 1rem;
  padding: .5rem .7rem;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  background: #FF33AE;
  flex: 1;
  margin-left: 1rem;
  border: 1px solid #FF33AE;
}
.todo-item {
  display: flex;
  align-items: center;
  border-top: 1px solid lightgrey;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
}
.todo-item-label {
  cursor: pointer;
  padding: 1rem;
}
.todo-item__checkbox {
    margin-right: 1rem;
  }
.todo-list {
  max-width: 100%;
  margin: 2rem auto;
}
</style>