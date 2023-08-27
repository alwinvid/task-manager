import { PartialType } from '@nestjs/mapped-types';
import { Task } from '../entities/task.entity';

export class UpdateTaskDto extends PartialType(Task) {}
