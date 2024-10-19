import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';

import { ZodValidationPipe } from '../common/pipes/zod-validation/zod-validation.pipe';
import {
  FindManyBooksQuerySchema,
  FindManyBooksQuery,
  FindBooksByIdsBodySchema,
  FindBooksByIdsBody,
} from '@bookverse-demo/schemas';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async findMany(
    @Query(new ZodValidationPipe(FindManyBooksQuerySchema))
    query: FindManyBooksQuery,
  ) {
    return this.booksService.findMany(query);
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    const book = await this.booksService.findBySlug(slug);
    if (!book) {
      throw new Error(`Book with slug ${slug} not found`);
    }
    return book;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.booksService.findById(id);
  }

  @Post('query')
  async findByIds(
    @Body(new ZodValidationPipe(FindBooksByIdsBodySchema))
    body: FindBooksByIdsBody,
  ) {
    return this.booksService.findByIds(body.ids);
  }
}
