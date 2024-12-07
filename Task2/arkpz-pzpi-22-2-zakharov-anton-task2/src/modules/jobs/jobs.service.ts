import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Job, JobDocument } from './job.entity';
import { InjectModel } from '@nestjs/mongoose';
import { CreateJobDto } from './jobs.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async create(createJobDto: CreateJobDto) {
    const newJob = this.jobModel.create(createJobDto);
    return newJob;
  }

  async findAll() {
    const jobs = await this.jobModel.find().exec();
    return jobs;
  }
}
