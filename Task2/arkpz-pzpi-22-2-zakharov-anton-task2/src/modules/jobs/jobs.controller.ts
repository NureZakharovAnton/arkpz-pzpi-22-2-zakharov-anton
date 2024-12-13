import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateJobDto, UpdateJobDto } from './jobs.dto';
import { JobsService } from './jobs.service';
import { JobAttemptsService } from '../job-attempts/job-attempts.service';
import {
  CreateJobAttemptDto,
  UpdateJobAttemptDto,
} from '../job-attempts/job-attempts.dto';

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly jobAttemptsService: JobAttemptsService,
  ) {}

  @Post()
  async create(@Body() body: CreateJobDto) {
    return this.jobsService.create(body);
  }

  @Get()
  async findAll() {
    return this.jobsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.jobsService.findById(id);
  }

  @Put(':id')
  async updateById(@Param('id') id: string, @Body() body: UpdateJobDto) {
    return this.jobsService.updateById(id, body);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.jobsService.deleteById(id);
  }

  @Get(':id/attempts')
  async findAttempts(@Param('id') id: string) {
    return this.jobAttemptsService.findByJobId(id);
  }

  @Post(':id/attempts')
  async createAttempt(
    @Param('id') id: string,
    @Body() body: CreateJobAttemptDto,
  ) {
    const jobAttemptDto = { ...body, job: id };
    return this.jobAttemptsService.create(jobAttemptDto);
  }

  @Get(':id/attempts/:attemptId')
  async findAttemptById(@Param('attemptId') attemptId: string) {
    return this.jobAttemptsService.findById(attemptId);
  }

  @Put(':id/attempts/:attemptId')
  async updateAttemptById(
    @Param('attemptId') attemptId: string,
    @Body() body: UpdateJobAttemptDto,
  ) {
    return this.jobAttemptsService.updateById(attemptId, body);
  }

  @Delete(':id/attempts/:attemptId')
  async deleteAttemptById(@Param('attemptId') attemptId: string) {
    return this.jobAttemptsService.deleteById(attemptId);
  }
}
