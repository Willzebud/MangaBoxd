import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MangaCover, MangaList } from '../models/manga-models';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  private readonly jsonServerUrl = 'http://localhost:3000';
  public mangas = signal<MangaCover[]>([]);
  private http = inject(HttpClient);

  public mangaList = signal<MangaList[]>([]);

  getMangaList(): Observable<MangaList[]> {
    return this.http.get<MangaList[]>(`${this.jsonServerUrl}/manga_list`);
  }

  getManga(): Observable<MangaCover[]> {
    return this.http.get<MangaCover[]>(`${this.jsonServerUrl}/manga_cover`);
  }
}
