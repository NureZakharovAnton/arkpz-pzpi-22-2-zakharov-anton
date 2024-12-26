import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { CreateProposalDto, UpdateProposalDto } from './proposals.dto';

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

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.proposalsService.findById(id);
  }

  @Put(':id')
  async updateById(@Param('id') id: string, @Body() body: UpdateProposalDto) {
    return this.proposalsService.updateById(id, body);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return this.proposalsService.deleteById(id);
  }
}
