import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsArray, ValidateNested } from 'class-validator';
import { CreateJobAttemptAssigneeDto } from './schemas/job-attempt-assignee.entity';

export class CreateJobAttemptDto {
  @IsString()
  @IsNotEmpty()
  readonly job: string;

  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJobAttemptAssigneeDto)
  readonly assignees: CreateJobAttemptAssigneeDto[];
}
