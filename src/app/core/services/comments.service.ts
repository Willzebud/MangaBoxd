import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CommentBody, CommentResponse } from '../models/comments-models';

@Injectable({
  providedIn: 'root',
})
export class Comments {
  private readonly authApiUrl = 'http://localhost:3000/api/v1/manga-lists';

  private http = inject(HttpClient);

  postComment(listId: string, body: CommentBody){
    return this.http.post<CommentResponse>(`${this.authApiUrl}/${listId}/comments`, body)
  }

  getComments(listId: string){
    return this.http.get<CommentResponse[]>(`${this.authApiUrl}/${listId}/comments`)
  }
}
