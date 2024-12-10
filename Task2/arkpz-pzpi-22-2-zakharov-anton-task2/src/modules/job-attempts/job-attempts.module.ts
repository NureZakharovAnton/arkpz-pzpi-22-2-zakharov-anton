import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JobAttemptsController } from './job-attempts.controller';
import { JobAttemptsService } from './job-attempts.service';
import { JobAttempt, JobAttemptSchema } from './job-attempt.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: JobAttempt.name, schema: JobAttemptSchema },
    ]),
  ],
  controllers: [JobAttemptsController],
  providers: [JobAttemptsService],
  exports: [JobAttemptsService],
})
export class JobAttemptsModule {}
