<template>
  <div class="todo">
    <section class="wrapper">
      <form class="new-todo-form">
        <label class="new-todo-label">
          <span>Well Done!! Finish your {{category}}</span>
        </label>
      </form>
      
      <ul class="todo-list" v-for="todo in todo_list" :key="todo.id">
          <li class="todo-item" v-if="(todo.category).includes(category) && todo.done === true">
            <span class="todoBtn label label-primary">
              <span class="glyphicon glyphicon-ok"></span></span>
            <label class="todo-item-label">
              {{todo.content.substring(0,50)}}
            </label>
          </li>
      </ul>
    </section>
  </div>
</template>
 
<script>
import { auth, db } from '@/firebaseConfig';

export default {
  name: 'doneCategory',
  props:['category'],
  beforeCreate: function() {
    if(auth.currentUser === null){
      this.$router.replace('/404')
    }
  },
  data: function(){
    return {
      todo_list: false,
    }
  },
  firestore: function(){
    return{
      todo_list: db.collection('todos').doc(auth.currentUser.uid).collection('item').orderBy('created')
    }
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
.new-done-label {
  display: flex;
  flex-direction: column;
  width: 80%;
  justify-content: flex-start;
  text-align: middle;
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