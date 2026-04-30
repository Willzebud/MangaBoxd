import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Manga, MangaList, MangaListCreateFormModel, UpdateMangaListModel } from '../models/manga-models';
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

  getMyMangaList(): Observable<MangaList[]> {
    return this.http.get<MangaList[]>(`${this.jsonServerUrl}/manga-lists/my-lists`)
  }

  getMangas(search: string): Observable<Manga[]> {
    return this.http.get<Manga[]>(`${this.jsonServerUrl}/jikan/mangas?title=${search}`);
  }

  getMangaListById(listId: string): Observable<MangaList>{
    return this.http.get<MangaList>(`${this.jsonServerUrl}/manga-lists/${listId}`)
  }

  postMangaList(mangalist: MangaListCreateFormModel): Observable<MangaListCreateFormModel> {
    return this.http.post<MangaListCreateFormModel>(`${this.jsonServerUrl}/manga-lists`, mangalist)
  }

  updateMangaList(listId: string, data: MangaListCreateFormModel): Observable<MangaList>{
    return this.http.patch<MangaList>(`${this.jsonServerUrl}/manga-lists/${listId}`, data)
  }

  deleteMangaList(listId: string): Observable<void>{
    return this.http.delete<void>(`${this.jsonServerUrl}/manga-lists/${listId}`)
  }
}
