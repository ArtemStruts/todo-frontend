import { Type } from 'class-transformer';

export class Project {
    id!: number;
    title!: string;

    @Type(() => Todo)
    todos!: Todo[];

    sortTodo() {
        return this.todos.sort((a, b) => {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            return 0;
        });
    }
}

export class Todo {
    id!: number;
    text!: string;
    project_id!: number;
    is_completed!: boolean;
}