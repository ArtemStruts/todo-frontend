import { Project, Todo } from './project';

export interface DialogData {
    projects: Project[],
    newTask: Todo,
  }