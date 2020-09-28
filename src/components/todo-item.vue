<template>
  <div class="todo-item">
    <div>
      <input
        type="checkbox"
        id="checkbox"
        v-model="todo.Completed"
        @change="$emit('reorder-todos')"
      />
      <input
        :class="{ completed: todo.Completed, 'todo-text': true }"
        v-model="todo.Text"
      />
    </div>
    <span
      class="material-icons"
      v-if="todo.Completed"
      @click="$emit('delete-todo', todo)"
    >
      delete_outline
    </span>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todo_prop"],
  data() {
    return {
      todo: this.todo_prop,
    };
  },
};
</script>

<style>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1.8rem;
}

.todo-item div {
  display: flex;
  align-items: center;
}

.todo-item input[type="checkbox"] {
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 7px;
  cursor: pointer;
}

.todo-item .todo-text {
  font-weight: 500;
  font-size: 1.25rem;
  border: none;
}

.completed {
  text-decoration: line-through;
  color: #333333;
}

.todo-item .material-icons {
  color: #bdbdbd;
  justify-self: self-end;
  cursor: pointer;
  font-size: 1.6rem;
}

.todo-item .material-icons:hover {
  color: #a2a2a2;
}
</style>