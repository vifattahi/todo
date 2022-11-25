import { TaskStatus } from "../entities/task.entity";
import { IsEnum } from 'class-validator';
export class UpdateTaskDto {
	@IsEnum(TaskStatus)
	status: TaskStatus;
}
