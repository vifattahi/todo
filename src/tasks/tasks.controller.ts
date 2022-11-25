import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('create')
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() filterDto: GetTasksFilterDto): Task[] {
    if(Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilter(filterDto);
    }else {
      return this.tasksService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Task {
    return this.tasksService.findOne(id);
  }

  @Patch(':id/status')
  update(@Param('id') id: string, @Body('status') status: UpdateTaskDto): Task {
    return this.tasksService.update(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.tasksService.remove(id);
  }
}
