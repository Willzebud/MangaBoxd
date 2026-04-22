import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Manga, MangaList } from '../models/manga-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  private readonly jsonServerUrl = 'http://localhost:3000/api/v1';
  private http = inject(HttpClient);

  public mangaList = signal<string[]>([]);

  getMangaList(): Observable<MangaList[]> {
    return this.http.get<MangaList[]>(`${this.jsonServerUrl}/manga-lists`);
  }

  getMangas(search: string): Observable<Manga[]> {
    return this.http.get<Manga[]>(`${this.jsonServerUrl}/jikan/mangas?title=${search}`);
  }
}
