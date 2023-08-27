import { Controller, Get, Post, Body, Query, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipes';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: getTasksFilterDto) {
    if (Object.keys(filterDto).length) {
      return this.taskService.findTasksbyFilter(filterDto)
    }
    return this.taskService.findAll();
  }

  @Get(':id')
  getTaskByID(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id/status')
  // @UsePipes(TaskStatusValidationPipe)
  updateTaskByID(@Param('id') id: string, @Body(TaskStatusValidationPipe) updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  removeTaskByID(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
