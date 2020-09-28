<template>
  <div id="app">
    <h1>#todo</h1>
    <div class="tabs">
      <button @click="changeTab('all')" :class="{ 'active-tab': allTab }">
        All
      </button>

      <button @click="changeTab('active')" :class="{ 'active-tab': activeTab }">
        Active
      </button>

      <button
        @click="changeTab('completed')"
        :class="{ 'active-tab': completedTab }"
      >
        Completed
      </button>
    </div>

    <form @submit.prevent="addTodo">
      <input
        type="text"
        placeholder="add details"
        v-model="insertText"
        required
      />
      <button>Add</button>
    </form>

    <div class="todos-container" v-if="todos.length > 0">
      <template v-if="allTab">
        <TodoItem
          v-for="todo in todos"
          :key="todo.Id"
          :todo_prop="todo"
          @delete-todo="deleteTodo($event)"
        />
      </template>

      <template v-if="activeTab">
        <TodoItem
          v-for="todo in activeTodos"
          :key="todo.Id"
          :todo_prop="todo"
        />
      </template>

      <template v-if="completedTab">
        <TodoItem
          v-for="todo in completedTodos"
          :key="todo.Id"
          :todo_prop="todo"
          @delete-todo="deleteTodo($event)"
        />
      </template>

      <button
        v-if="completedTab && completedTodos.length > 0"
        @click="deleteAllCompleted"
      >
        <span class="material-icons"> delete_outline </span>
        delete all
      </button>
    </div>

    <div class="hero-container" v-if="showHeroImg">
      <p>
        Nothing too see here.
        <br />
        Try adding a todo.
      </p>
      <img
        src="./assets/hero_img.svg"
        alt="Nothing to see here, try addding some notes"
      />
    </div>
  </div>
</template>

<script>
import Todo from "./todo";
import TodoItem from "./components/todo-item";

export default {
  name: "App",
  components: {
    TodoItem,
  },
  data() {
    return {
      insertText: "",
      todos: [],
      allTab: true,
      activeTab: false,
      completedTab: false,
    };
  },
  computed: {
    allTodos() {
      return this.todos;
    },
    activeTodos() {
      return this.todos.filter((x) => x.Completed === false);
    },
    completedTodos() {
      return this.todos.filter((x) => x.Completed === true);
    },
    showHeroImg() {
      if (this.allTab && this.todos.length <= 0) return true;
      if (this.activeTab && this.activeTodos.length <= 0) return true;
      if (this.completedTab && this.completedTodos.length <= 0) return true;

      return false;
    },
  },
  methods: {
    addTodo() {
      this.todos.push(new Todo(this.insertText));
      this.insertText = "";
    },
    changeTab(name) {
      this.allTab = false;
      this.activeTab = false;
      this.completedTab = false;

      switch (name) {
        case "all":
          this.allTab = true;
          break;
        case "active":
          this.activeTab = true;
          break;
        case "completed":
          this.completedTab = true;
          break;
        default:
          break;
      }
    },
    deleteTodo(selectedTodo) {
      let index = this.todos.findIndex((x) => x.Id === selectedTodo.Id);
      this.todos.splice(index, 1);
    },
    deleteAllCompleted() {
      this.todos = this.todos.filter((x) => x.Completed === false);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  font-family: "Montserrat", sans-serif;
}

#app {
  width: 610px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto 0;
}

h1 {
  font-family: "Raleway";
  font-weight: bold;
  font-size: 2.25rem;

  color: #333333;
  margin-bottom: 30px;
}

.tabs {
  width: 100%;

  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #bdbdbd;
}

.tabs button {
  width: 89px;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;

  padding-bottom: 15px;

  color: #333333;
  display: flex;
  justify-content: center;
}

.tabs .active-tab {
  border-bottom: 4px solid #2f80ed;
  border-radius: 4px 4px 0px 0px;
}

.tabs sup {
  background: #2f80ed;
  color: white;
  font-size: 1rem;
  border-radius: 50%;
  padding: 2px;
}

form {
  display: flex;
  width: 100%;
  margin: 1.125rem 0 2rem;
}

form input {
  font-size: 1.25rem;
  padding: 1rem;
  border: 1px solid #bdbdbd;
  border-radius: 0.75rem;
  flex-grow: 1;
  margin-right: 1.5rem;
}

form button {
  background: #2f80ed;
  border-radius: 12px;
  border: none;

  font-size: 1.1rem;
  font-weight: 600;
  padding: 15px 45px;

  color: white;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

form button:hover {
  background: #146de1;
}

.todos-container {
  width: 100%;
}

.todos-container button {
  font-weight: 600;
  font-size: 12px;

  border: none;
  border-radius: 5px;

  background: #eb5757;
  color: #ffffff;

  display: flex;
  align-items: center;

  padding: 10px 20px;
  margin-left: auto;

  cursor: pointer;
  transition: all 0.3s ease-out;
}

.todos-container button:hover {
  background: #e62d2d;
}

.todos-container button .material-icons {
  color: white;
  margin-right: 5px;
}

.hero-container {
  display: flex;
  align-items: center;

  margin-top: 2rem;
}

.hero-container p {
  font-family: "Raleway";
  font-weight: 600;
  font-size: 2rem;
}

.hero-container img {
  width: 50%;
}
</style>
