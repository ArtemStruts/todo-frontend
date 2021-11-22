import { Component, Input } from '@angular/core';
import { Todo } from '../models/project';
import { TodoDataService } from '../services/todo-data.service';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent {

  @Input()
  todo!: Todo;

  baseUrl: string = 'https://enigmatic-woodland-85636.herokuapp.com';

  constructor(private TodoDataService: TodoDataService) {}

  toggleTodoComplete(todo: Todo) {
    this.TodoDataService.patch(this.baseUrl + '/projects/' + todo.project_id + '/todo/' + todo.id, null)
      .subscribe((res) => {
        this.todo.is_completed = res.is_completed;
      });
  }

}
