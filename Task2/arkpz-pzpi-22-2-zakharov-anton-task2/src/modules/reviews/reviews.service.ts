import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './reviews.dto';
import { Review, ReviewDocument } from './review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    const createdReview = await this.reviewModel.create(createReviewDto);
    return createdReview;
  }

  async findAll() {
    return this.reviewModel.find().exec();
  }
}
