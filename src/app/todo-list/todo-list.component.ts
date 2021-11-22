import { Component, Input } from '@angular/core';
import { Project } from '../models/project';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @Input()
  project!: Project;

  constructor() {}

}
