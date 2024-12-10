import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobAttempt } from './job-attempt.entity';
import { JobAttemptDocument } from './job-attempt.types';
import { CreateJobAttemptDto } from './job-attempts.dto';

@Injectable()
export class JobAttemptsService {
  constructor(
    @InjectModel(JobAttempt.name)
    private jobAttemptModel: Model<JobAttemptDocument>,
  ) {}

  async create(createJobAttemptDto: CreateJobAttemptDto) {
    const createdJobAttempt =
      await this.jobAttemptModel.create(createJobAttemptDto);
    return createdJobAttempt;
  }

  async findAll() {
    return this.jobAttemptModel.find().exec();
  }
}
