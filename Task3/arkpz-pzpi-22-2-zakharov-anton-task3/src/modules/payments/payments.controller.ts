import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Roles } from '../users/users.decorators';
import { USER_ROLES } from '../users/user.constants';
import { PaymentService } from './payments.service';
import { CreatePaymentDto } from './payments.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Roles(USER_ROLES.ADMIN, USER_ROLES.CUSTOMER)
  @Post()
  async create(@Body() body: CreatePaymentDto) {
    return this.paymentService.create(body);
  }

  @Roles(USER_ROLES.ADMIN)
  @Get()
  async findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.paymentService.findById(id);
  }
}
