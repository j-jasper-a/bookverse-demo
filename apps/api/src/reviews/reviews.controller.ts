import {
  FindManyReviewsQuery,
  FindManyReviewsQuerySchema,
} from '@bookverse-demo/schemas';
import { Controller, Get, Query } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation/zod-validation.pipe';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async findMany(
    @Query(new ZodValidationPipe(FindManyReviewsQuerySchema))
    query: FindManyReviewsQuery,
  ) {
    return this.reviewsService.findMany(query);
  }

  @Get('stats/:bookId')
  async calculateReviewStats(@Query('bookId') bookId: string) {
    return this.reviewsService.calculateReviewStats(bookId);
  }
}
