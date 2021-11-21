import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Project, Todo } from '../models/project';
import { NewTask } from '../models/newTask';

@Injectable()
export class TodoDataService {

    constructor(private httpService: HttpClient) {}

    get(url: string): Observable<Project[]> {
        return this.httpService.get<Project[]>(url);
    }

    patch(url: string, options: any): Observable<Todo> {
        return this.httpService.patch<Todo>(url, options);
    }

    post(url: string, newTask: NewTask): Observable<any> {
        return this.httpService.post(url, newTask);
    }
}