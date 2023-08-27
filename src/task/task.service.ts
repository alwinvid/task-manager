import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = []

  create(body: CreateTaskDto): Task {
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

  findTasksbyFilter(filterDto: getTasksFilterDto): Task[] {
    const { search, status } = filterDto
    let tasks = this.findAll()
    if (status) {
      tasks = tasks.filter(task => task.status === status)
    }
    if (search) {
      tasks = tasks.filter(task => {
       return task.description.includes(search) || task.title.includes(search)
      })
    }
    return tasks
  }

  findOne(id: string) {
    const task = this.tasks.find(task => task.id === id)
    if (!task) {
      throw new NotFoundException(`Couldn't find a task with id : ${id}`)
    }
    return task
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    const task: Task = this.findOne(id)
    task.status = updateTaskDto.status
    return task
  }

  remove(id: string) {
    this.findOne(id)
    this.tasks = this.tasks.filter(task => task.id !== id)
    return `Deleted task ${id}`
  }
}
