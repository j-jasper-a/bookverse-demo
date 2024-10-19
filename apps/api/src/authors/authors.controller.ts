import { Controller, Get, Param } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async findMany() {
    return this.authorsService.findMany();
  }

  @Get('slug/:slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.authorsService.findBySlug(slug);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.authorsService.findById(id);
  }
}
