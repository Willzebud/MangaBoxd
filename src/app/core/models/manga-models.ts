export interface MangaCover {
  manga_id: number;
  manga_cover: string;
}

export interface MangaList {
  list_id: number;
  list_title: string;
  list_description: string;
  mangas: Manga[];
  list_creator: string;
  list_manga_number: number;
  list_view_number: number;
  list_like_number: number;
  list_comment_number: number;
}

export interface Manga {
    manga_id: number, 
    title: string, 
    description: string, 
    cover: string
}
