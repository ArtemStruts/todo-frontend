import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { plainToClass } from 'class-transformer';
import { DialogComponent } from './dialog/dialog.component';
import { Project, Todo } from './project';

interface NewTask {
  text: string,
  title: string,
  project_id: number,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  private httpClient!: HttpClient;
  
  constructor(public dialog: MatDialog, httpClient:HttpClient) {
    this.httpClient = httpClient;
  }
  
  newTask!: NewTask;
  public projects!: Project[];
  baseUrl: string = 'https://enigmatic-woodland-85636.herokuapp.com';

  getProjects() {
    this.httpClient.get<Project[]>(this.baseUrl + '/projects')
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
      this.testPost();
    });
  }

  onComplete(todo: Todo) {
    this.httpClient.patch<void>(this.baseUrl + '/projects/' + todo.project_id + '/todo/' + todo.id, null)
      .subscribe(() => {
        this.getProjects();
      });
  }

  testPost() {
    if (this.newTask && this.newTask.project_id && this.newTask.text) {
      this.httpClient.post(this.baseUrl + '/todos', this.newTask)
        .subscribe(() => {
          this.getProjects();
        });
    }
  }

  ngOnInit() {
    this.getProjects();
  }
}
