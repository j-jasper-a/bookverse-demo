import { Controller, Get, Param } from '@nestjs/common';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get()
  findMany() {
    return this.genresService.findMany();
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.genresService.findBySlug(slug);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.genresService.findById(id);
  }
}
