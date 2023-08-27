import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { TaskStatus } from "../entities/task.entity";
export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowedStatuses = [TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN]

    transform(value: UpdateTaskDto, metaData: ArgumentMetadata) {

        if (!this.allowedStatuses.includes(value.status))
            throw new BadRequestException(`${value.status} is a invalid status`)

        return value

    }
}