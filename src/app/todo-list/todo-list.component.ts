import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project, Todo } from '../models/project';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @Input()
  project!: Project;

  @Output()
  toggleComplete: EventEmitter<Todo> = new EventEmitter();

  constructor() {}

  onToggleTodoComplete(todo: Todo) {
    this.toggleComplete.emit(todo);
  }

}
