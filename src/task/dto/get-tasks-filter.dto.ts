import { TaskStatus } from "../entities/task.entity";
import { IsString, IsOptional, IsIn,IsNotEmpty } from "class-validator";
export class getTasksFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;
    @IsOptional()
    @IsNotEmpty()
    search: string;
}