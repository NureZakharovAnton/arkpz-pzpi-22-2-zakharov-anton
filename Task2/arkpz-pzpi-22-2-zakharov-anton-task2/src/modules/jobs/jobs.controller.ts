import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateJobDto } from './jobs.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  async create(@Body() body: CreateJobDto) {
    return this.jobsService.create(body);
  }

  @Get()
  async findAll() {
    return this.jobsService.findAll();
  }
}
