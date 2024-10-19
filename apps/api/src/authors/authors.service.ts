import { Injectable } from '@nestjs/common';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';
import { Author, AuthorDto } from '@bookverse-demo/schemas';

@Injectable()
export class AuthorsService {
  constructor(private readonly firebase: FirebaseAdminService) {}

  private toDto(author: Author): AuthorDto {
    return {
      id: author.id,
      name: author.name,
      slug: author.slug,
      biography: author.biography,
      imageUrl: author.imageUrl,
    };
  }

  private get collection() {
    return this.firebase.db.collection('authors');
  }

  async findMany(): Promise<AuthorDto[]> {
    const snapshot = await this.collection.get();
    if (snapshot.empty) return [];
    return snapshot.docs.map((doc) => this.toDto(doc.data() as Author));
  }

  async findById(id: string): Promise<AuthorDto | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    return this.toDto(doc.data() as Author);
  }

  async findBySlug(slug: string): Promise<AuthorDto | null> {
    const snapshot = await this.collection.where('slug', '==', slug).get();
    if (snapshot.empty) return null;

    const author = snapshot.docs[0].data() as Author;
    return this.toDto(author);
  }
}
