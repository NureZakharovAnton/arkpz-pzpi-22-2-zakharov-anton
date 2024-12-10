import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { PROPOSAL_STATUSES_VALUES } from './proposal.constants';
import { ProposalStatus } from './proposal.types';

export class CreateProposalDto {
  @IsString()
  @IsNotEmpty()
  readonly job: string;

  @IsString()
  @IsNotEmpty()
  readonly user: string;

  @IsString()
  @IsNotEmpty()
  readonly text: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(PROPOSAL_STATUSES_VALUES)
  readonly status: ProposalStatus;
}
