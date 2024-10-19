import { Injectable } from '@nestjs/common';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';
import { Genre, GenreDto } from '@bookverse-demo/schemas';

@Injectable()
export class GenresService {
  constructor(private readonly firebase: FirebaseAdminService) {}

  private toDto(genre: Genre): GenreDto {
    return {
      id: genre.id,
      name: genre.name,
      slug: genre.slug,
    };
  }

  private get collection() {
    return this.firebase.db.collection('genres');
  }

  async findMany(): Promise<GenreDto[]> {
    const snapshot = await this.collection.get();
    if (snapshot.empty) return [];

    return snapshot.docs.map((doc) => this.toDto(doc.data() as Genre));
  }

  async findById(id: string): Promise<GenreDto | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;

    return this.toDto(doc.data() as Genre);
  }

  async findBySlug(slug: string): Promise<GenreDto | null> {
    const snapshot = await this.collection
      .where('slug', '==', slug)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const genre = snapshot.docs[0].data() as Genre;
    return this.toDto(genre);
  }
}
