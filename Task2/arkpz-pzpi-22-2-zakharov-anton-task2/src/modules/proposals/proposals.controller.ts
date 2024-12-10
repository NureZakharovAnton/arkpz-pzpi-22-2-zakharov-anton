import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto } from './proposals.dto';

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Post()
  async create(@Body() body: CreateProposalDto) {
    return this.proposalsService.create(body);
  }

  @Get()
  async findAll() {
    return this.proposalsService.findAll();
  }
}
