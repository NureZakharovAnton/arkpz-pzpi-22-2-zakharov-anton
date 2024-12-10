import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proposal } from './proposal.entity';
import { CreateProposalDto } from './proposals.dto';
import { ProposalDocument } from './proposal.types';

@Injectable()
export class ProposalsService {
  constructor(
    @InjectModel(Proposal.name) private proposalModel: Model<ProposalDocument>,
  ) {}

  async create(createProposalDto: CreateProposalDto) {
    const createdProposal = await this.proposalModel.create(createProposalDto);
    return createdProposal;
  }

  async findAll() {
    return this.proposalModel.find().exec();
  }
}
