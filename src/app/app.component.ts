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
  baseUrl: string = 'http://127.0.0.1:3000';

  getProjects() {
    this.TodoDataService.get(this.baseUrl + '/projects')
      .subscribe(projectList => {
        console.log(projectList);
        this.projects = plainToClass(Project, projectList)
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { projects: this.projects, newTask: this.newTask },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newTask = result;
      this.testPost();
    });
  }

  checkTodo(todo: Todo) {
    this.TodoDataService.patch(this.baseUrl + '/projects/' + todo.project_id + '/todo/' + todo.id, null)
      .subscribe((res) => {
        console.log(res);
        this.getProjects();
      });
  }

  testPost() {
    if (this.newTask && this.newTask.project_id && this.newTask.text) {
      this.TodoDataService.post(this.baseUrl + '/todos', this.newTask)
        .subscribe((res) => {
          console.log(res);
          this.getProjects();
        });
    }
  }

  ngOnInit() {
    this.getProjects();
  }
}
