import { IsNotEmpty, IsNumber, IsString, IsIn } from 'class-validator';
import { PAYMENT_STATUSES_VALUES } from './payment.constants';
import { PaymentStatus } from './payment.types';

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  readonly job: string;

  @IsString()
  @IsNotEmpty()
  readonly user: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(PAYMENT_STATUSES_VALUES)
  readonly status: PaymentStatus;
}
