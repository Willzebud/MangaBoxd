export interface MangaList {
  id: number;
  title: string;
  description: string;
  owner: {
    id: number;
    firstname: string;
    lastname: string;
  };
  mangas: Manga[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Manga {
  jikanId: number;
  title: string;
  coverUrl: string;
  synopsis: string;
  status: string;
  genres: []
}
