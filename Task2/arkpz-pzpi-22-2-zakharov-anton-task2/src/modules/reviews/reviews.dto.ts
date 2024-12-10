import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  readonly job: string;

  @IsString()
  @IsNotEmpty()
  readonly reviewer: string;

  @IsString()
  @IsNotEmpty()
  readonly reviewee: string;

  @IsNumber()
  @IsNotEmpty()
  readonly rating: number;

  @IsString()
  @IsOptional()
  readonly comment?: string;
}
