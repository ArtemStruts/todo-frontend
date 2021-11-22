import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { plainToClass } from 'class-transformer';
import { DialogComponent } from './dialog/dialog.component';
import { Project, Todo } from './models/project';
import { NewTask } from './models/newTask';
import { TodoDataService } from './services/todo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TodoDataService],
})
export class AppComponent implements OnInit{
  
  constructor(public dialog: MatDialog, private TodoDataService: TodoDataService) {}
  
  newTask!: NewTask;
  projects!: Project[];
  baseUrl: string = 'https://enigmatic-woodland-85636.herokuapp.com';

  getProjects() {
    this.TodoDataService.get(this.baseUrl + '/projects')
      .subscribe(projectList => {
        this.projects = plainToClass(Project, projectList)
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { projects: this.projects, newTask: this.newTask },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newTask = result;
      this.onAddTodo();
    });
  }

  onToggleTodoComplete(todo: Todo) {
    this.TodoDataService.patch(this.baseUrl + '/projects/' + todo.project_id + '/todo/' + todo.id, null)
      .subscribe((res) => {
        const project = this.projects.filter((p) => p.id === todo.project_id)[0];
        const updatedTodo = project.todos.filter((t) => t.id === todo.id)[0];
        updatedTodo.is_completed = res.is_completed;
      });
  }

  onAddTodo() {
    if (this.newTask && this.newTask.project_id && this.newTask.text) {
      this.TodoDataService.post(this.baseUrl + '/todos', this.newTask)
        .subscribe((res) => {
          const project = this.projects.filter((p) => p.id === res.id)[0];
          if (project) {
            project.todos = res.todos;
          } else {
            this.projects.push(plainToClass(Project, res));
          }
        });
    }
  }

  ngOnInit() {
    this.getProjects();
  }
}
