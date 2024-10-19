import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { FirebaseAdminModule } from '../firebase-admin/firebase-admin.module';
import { AuthorsModule } from '../authors/authors.module';
import { GenresModule } from '../genres/genres.module';

@Module({
  imports: [FirebaseAdminModule, AuthorsModule, GenresModule],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
