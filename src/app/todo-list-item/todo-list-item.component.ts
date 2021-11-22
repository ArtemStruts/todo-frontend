import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/project';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent {

  @Input()
  todo!: Todo;

  @Output()
  toggleComplete: EventEmitter<Todo> = new EventEmitter();

  constructor() {}

  toggleTodoComplete(todo: Todo) {
    this.toggleComplete.emit(todo);
  }
}
