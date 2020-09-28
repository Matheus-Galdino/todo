class Todo {
  constructor(text) {
    this.Id = Math.floor(Math.random() * 1000);
    this.Text = text;
    this.Completed = false;
  }
}

export default Todo;
