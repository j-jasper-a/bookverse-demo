import {
  FindManyReviewsQuery,
  ReviewDto,
  ReviewStats,
} from '@bookverse-demo/schemas';
import { Injectable } from '@nestjs/common';
import { customerReviews } from './data/mock-reviews';

@Injectable()
export class ReviewsService {
  async findMany(
    query: FindManyReviewsQuery,
  ): Promise<{ reviews: ReviewDto[]; totalPages: number }> {
    const { page, limit } = query;

    let reviews = [...customerReviews];

    const totalPages = Math.ceil(reviews.length / limit) || 0;

    reviews = reviews.slice((page - 1) * limit, page * limit);

    await new Promise((resolve) => setTimeout(resolve, 500));

    return { reviews, totalPages };
  }

  async calculateReviewStats(bookId: string): Promise<ReviewStats> {
    const reviews = [...customerReviews];
    const reviewCount = customerReviews.length;
    const reviewCountForBook = reviews.length;

    let totalRating = 0;
    const starDistribution = {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
    };

    for (const { rating } of reviews) {
      totalRating += rating;
      switch (rating) {
        case 1:
          starDistribution.one++;
          break;
        case 2:
          starDistribution.two++;
          break;
        case 3:
          starDistribution.three++;
          break;
        case 4:
          starDistribution.four++;
          break;
        case 5:
          starDistribution.five++;
          break;
      }
    }

    const averageRating =
      reviewCountForBook > 0 ? totalRating / reviewCountForBook : 0;

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      bookId,
      reviewCount,
      starDistribution,
      averageRating,
    };
  }
}
