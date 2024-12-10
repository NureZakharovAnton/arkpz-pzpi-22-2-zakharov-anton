import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentService } from './payments.service';
import { CreatePaymentDto } from './payments.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() body: CreatePaymentDto) {
    return this.paymentService.create(body);
  }

  @Get()
  async findAll() {
    return this.paymentService.findAll();
  }
}
