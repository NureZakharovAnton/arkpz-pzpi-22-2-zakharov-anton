import { Controller, Get, Post, Body } from '@nestjs/common';
import { JobAttemptsService } from './job-attempts.service';
import { CreateJobAttemptDto } from './job-attempts.dto';

@Controller('job-attempts')
export class JobAttemptsController {
  constructor(private readonly jobAttemptsService: JobAttemptsService) {}

  @Post()
  async create(@Body() body: CreateJobAttemptDto) {
    return this.jobAttemptsService.create(body);
  }

  @Get()
  async findAll() {
    return this.jobAttemptsService.findAll();
  }
}
