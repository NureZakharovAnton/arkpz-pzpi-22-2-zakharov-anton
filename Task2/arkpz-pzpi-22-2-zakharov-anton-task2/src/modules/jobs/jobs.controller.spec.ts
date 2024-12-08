import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

const mockJob = {
  id: '123',
  name: 'test',
  description: 'test',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('JobsController', () => {
  let jobsController: JobsController;
  let jobsService: JobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [
        {
          provide: JobsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockJob),
            findAll: jest.fn().mockResolvedValue([mockJob]),
          },
        },
      ],
    }).compile();

    jobsController = module.get<JobsController>(JobsController);
    jobsService = module.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(jobsController).toBeDefined();
  });

  describe('create', () => {
    it('should call JobsService.create and return the created job', async () => {
      const dto = {
        name: 'Test',
        description: 'Test',
        price: 100,
        creator: '640c14e5b',
      };
      const result = await jobsController.create(dto);

      expect(jobsService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockJob);
    });
  });

  describe('findAll', () => {
    it('should call JobsService.findAll and return an array of jos', async () => {
      const result = await jobsController.findAll();

      expect(jobsService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockJob]);
    });
  });
});
