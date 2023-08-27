import { TaskStatus } from "../entities/task.entity";

export class getTasksFilterDto{
    status:TaskStatus;
    search:string;
}