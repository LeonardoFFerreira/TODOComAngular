import { Todo } from './../models/todo.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = 'list';
  public todos: Todo[] = [];
  public title: string = 'Minhas tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      task: ['',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required
        ])]
    });

    this.loadTodos();
  }
  addTask() {
    const task = this.form.controls['task'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, task, false));

    this.save();
    this.form.reset()
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }
  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }
  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  loadTodos() {
    this.todos = JSON.parse(localStorage.getItem('todos')!);
  }
  changeMode(mode: string) {
    this.mode = mode;
  }
}
