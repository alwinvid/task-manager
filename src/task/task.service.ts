import { Injectable } from '@nestjs/common';
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';

@Injectable()
export class TaskService {
  private tasks: Task[] = []

  create(body: CreateTaskDto) {
    const task: Task = {
      id: uuid(),
      title: body.title,
      description: body.description,
      status: TaskStatus.OPEN,
    }
    this.tasks.push(task)
    return task
  }

  findAll() {
    return this.tasks
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
