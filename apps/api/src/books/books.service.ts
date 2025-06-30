import {
  AuthorDto,
  Book,
  BookDto,
  FindManyBooksQuery,
  GenreDto,
} from '@bookverse-demo/schemas';
import { Injectable } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';
import { GenresService } from '../genres/genres.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly firebase: FirebaseAdminService,
    private readonly genresService: GenresService,
    private readonly authorsService: AuthorsService,
  ) {}

  private async toDto(book: Book): Promise<BookDto> {
    const genres: GenreDto[] = (
      await Promise.all(
        book.genreIds.map((id) => this.genresService.findById(id)),
      )
    ).filter((genre): genre is GenreDto => genre !== null);
    const authors: AuthorDto[] = (
      await Promise.all(
        book.authorIds.map((id) => this.authorsService.findById(id)),
      )
    ).filter((author): author is AuthorDto => author !== null);

    return {
      id: book.id,
      name: book.name,
      slug: book.slug,
      overview: book.overview,
      isbn: book.isbn,
      pageCount: book.pageCount,
      publisherName: book.publisherName,
      publishedAt: book.publishedAt,
      price: book.price,
      imageUrl: book.imageUrl,
      genres: genres,
      authors: authors,
    };
  }

  private get db() {
    return this.firebase.db;
  }

  private get collection() {
    return this.firebase.db.collection('books');
  }

  async findMany(
    query: FindManyBooksQuery,
  ): Promise<{ books: BookDto[]; totalPages: number }> {
    const { genreId, authorId, page, limit } = query;

    let queryRef: FirebaseFirestore.Query = this.collection;

    if (genreId) {
      queryRef = queryRef.where('genreIds', 'array-contains', genreId);
    }

    if (authorId) {
      queryRef = queryRef.where('authorIds', 'array-contains', authorId);
    }

    const countSnapshot = await queryRef.count().get();
    const totalCount = countSnapshot.data()?.count ?? 0;
    const totalPages = Math.max(Math.ceil(totalCount / limit), 1);

    const currentPage = Math.min(Math.max(page, 1), totalPages);
    const offset = (currentPage - 1) * limit;

    const snapshot = await queryRef.offset(offset).limit(limit).get();
    const books = snapshot.empty
      ? []
      : snapshot.docs.map((doc) => doc.data() as Book);

    const bookDtos = await Promise.all(books.map((book) => this.toDto(book)));

    return {
      books: bookDtos,
      totalPages,
    };
  }

  async findById(id: string): Promise<BookDto | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    const book = this.toDto(doc.data() as Book);
    return book;
  }

  async findByIds(ids: string[]): Promise<BookDto[]> {
    if (ids.length === 0) return [];

    const docRefs = ids.map((id) => this.collection.doc(id));
    const snapshots = await this.db.getAll(...docRefs);

    const books = await Promise.all(
      snapshots
        .filter((doc) => doc.exists)
        .map((doc) => this.toDto(doc.data() as Book)),
    );

    return books;
  }

  async findBySlug(slug: string): Promise<BookDto | null> {
    const snapshot = await this.collection.where('slug', '==', slug).get();
    if (snapshot.empty) return null;

    const book = this.toDto(snapshot.docs[0].data() as Book);
    return book;
  }
}
