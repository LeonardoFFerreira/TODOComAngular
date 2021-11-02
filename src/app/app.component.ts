import { Todo } from './../models/todo.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: string = 'Minhas tarefas';

  constructor() {
    this.todos.push(new Todo(1, 'Passear com o dog', false));
    this.todos.push(new Todo(2, 'Ir ao mercado', false));
    this.todos.push(new Todo(3, 'Cortar o cabelo', true));
  }
  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }
  markAsDone() { }
  markAsUndone() { }
}
