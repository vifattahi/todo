import {  Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { v4 as uuid } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  create(createTaskDto: CreateTaskDto): Task {
    const task = {
      id: uuid(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN
    }
    this.tasks.push(task);
    return task;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    if(!task) {
      throw new NotFoundException();
    }
    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    const { status } = updateTaskDto;
    const task: Task = this.findOne(id);
    task.status = status;
    return task;
  }

  remove(id: string): void {
    const task = this.findOne(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.findAll();
    if(status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if(search) {
      tasks = tasks.filter(task => {
        if(task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      })
    }
    return tasks;
  }
}
