import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MangaCover } from '../models/manga-models';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class mangaService {
  private readonly jsonServerUrl = ' http://localhost:3000';
  public mangas = signal<MangaCover[]>([]);
  private http = inject(HttpClient);

  getManga(): Observable<MangaCover[]> {
    return this.http
      .get<MangaCover[]>(`${this.jsonServerUrl}/manga_cover`);
  }
}
