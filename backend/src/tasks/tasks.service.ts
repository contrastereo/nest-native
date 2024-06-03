// src/items/items.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  create(createItemDto: CreateTaskDto): Omit<Task, 'id'> {
    const newTask: Task = {
      id: this.idCounter++,
      ...createItemDto,
    };
    this.tasks.push(newTask);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...taskWithoutId } = newTask;
    return taskWithoutId;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const item = this.findOne(id);
    const updatedTask = { ...item, ...updateTaskDto };
    this.tasks = this.tasks.map((i) => (i.id === id ? updatedTask : i));

    return updatedTask;
  }

  remove(id: number): void {
    this.findOne(id);
    this.tasks = this.tasks.filter((item) => item.id !== id);
  }
}
