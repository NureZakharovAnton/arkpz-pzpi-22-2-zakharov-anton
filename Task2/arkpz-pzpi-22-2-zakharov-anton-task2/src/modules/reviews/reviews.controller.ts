import { Controller, Get, Post, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './reviews.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(@Body() body: CreateReviewDto) {
    return this.reviewsService.create(body);
  }

  @Get()
  async findAll() {
    return this.reviewsService.findAll();
  }
}