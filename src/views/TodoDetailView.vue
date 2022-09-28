<template>
  <div class="todo">
    <section class="wrapper">
      <form class="new-todo-form">
        <template v-if="edit">
          <input class="new-todo-input" @click="edited_todo=''" type="text" v-model="edited_todo" @blur="edit = false" @keydown.enter="edit=false; editTodoContent()">
        </template>
        <template v-else>
          <button class="todoBtn label label-danger" @click="markDone(todo.id)">Done</button>
          <label class="new-todo-long" @click="edit = true"> {{todo.content}} </label>
        </template>
        <button class="todoBtn label label-success" type="button" @click="editTodoContent()">Edit</button>
      </form>

      <ul class="todo-list">
        <li><span>Categories</span></li>
      </ul>

      <ul class="todo-list" v-for="cat in todo.category" :key="cat.id">
          <li class="todo-item">
            <button class="todoBtn label label-danger" @click="deleteCategory(cat)">Delete</button>
            <label class="todo-item-label"> {{cat}} </label>
          </li>
      </ul>
      
      <ul class="todo-list">
        <input class="new-todo-input" v-model="new_category" placeholder="Add exist category"/>
      </ul>
      <button class="todoBtn label label-primary" @click="addCategory">Add</button>

    <!-- <div v-for="category in categories" :key="category.id">
      <router-link :to="{ name: 'todoCategory', params: { category: category.category }}">{{category.category}}</router-link> | 
    </div> -->
    </section>
  </div>
</template>
 
<script>
import { auth, db } from '@/firebaseConfig'

export default {
  name: 'todoDetail',
  props:['id'],
  beforeCreate: function() {
    if(auth.currentUser === null){
      this.$router.replace('/404')
    }
  },
  data: function(){
    return {
			edit: false,
			todo: false,
      edited_todo: "",
      categories: false,
    }
  },
	firestore: function(){
		return{
      categories: db.collection('todos').doc(auth.currentUser.uid).collection('categories'),
			todo: db.collection("todos").doc(auth.currentUser.uid).collection("item").doc(this.id)
		}
	},
	methods:{
    deleteCategory: function(delete_category) {
      for(let i = 0; i < this.todo.category.length; i++) {
        if(this.todo.category[i] === delete_category)  {
          this.todo.category.splice(i, 1);
          i--;
        }
      }
      db.collection('todos').doc(auth.currentUser.uid).collection('item').doc(this.id).update(this.todo)
    },
    addCategory: function() {
      for(let i = 0; i < this.todo.category.length; i++) {
        if(this.todo.category[i] === this.new_category)  {
          return;
        }
      }
      this.todo.category.push(this.new_category)
      db.collection('todos').doc(auth.currentUser.uid).collection('item').doc(this.id).update(this.todo)
      // db.collection('todos').doc(auth.currentUser.uid).collection('categories').add({category: this.new_category})
    },
    editTodoContent: function() {
      this.edit = false
      db.collection('todos').doc(auth.currentUser.uid).collection('item').doc(this.id).update({content: this.edited_todo})
    },
    markDone: function(todo_id){
      this.$router.replace("/todos")
      db.collection('todos').doc(auth.currentUser.uid).collection('item').doc(todo_id).update({done: true})
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
.new-todo-long {
  word-break: break-word;
  width: 10em; margin: 0.5em; white-space: normal; vertical-align: top; display: inline-block;
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: flex-start;
  text-align: left;
  font-weight: bold;
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
  font-size: 5rem;
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