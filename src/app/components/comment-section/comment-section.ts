import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { MangaList } from '../../core/models/manga-models';
import { CommentsListStore } from '../../core/stores/comments/comments.store';
import { CommentBody } from '../../core/models/comments-models';
import { form, required, FormField } from '@angular/forms/signals';
import { DatePipe } from '@angular/common';
import { SvgIcons } from '../svg-icons/svg-icons';
import { AuthStore } from '../../core/stores/auth/auth.store';

@Component({
  selector: 'app-comment-section',
  imports: [FormField, SvgIcons],
  templateUrl: './comment-section.html',
  styleUrl: './comment-section.scss',
})
export class CommentSection {
  private readonly commentsListStore = inject(CommentsListStore);
  private readonly authStore = inject(AuthStore)
  public mangaList = input<MangaList>();
  public commentsList = computed(() => this.commentsListStore.commentsList());
  public userId = computed(() => this.authStore.userId())
  private datenow = Date.now();
  private datePipe = inject(DatePipe);
  public id = input.required<string>();

  constructor() {
    effect(() => {
      const listId = this.mangaList()?.id;
      if (!listId) {
        return;
      }
      this.commentsListStore.getComments(listId);
    });
    
  }

  protected canDeleteComment(commentAuthorId: string): boolean {
  return commentAuthorId === this.userId();
}

  private readonly commentsModel = signal<CommentBody>({
    content: '',
  });

  public postCommentForm = form(this.commentsModel, (path) => {
    required(path.content);
  });

  protected onClickSubmitComment(): void {
    const listId = this.mangaList()?.id;
    if (!listId) {
      return;
    }
    this.commentsListStore.postComment({ id: listId, model: this.postCommentForm().value() });
    this.commentsModel.set({ content: '' });
  }

  protected dateFormat(createdAt: string) {
    const newDate = this.datenow - new Date(createdAt).getTime();
    const dateFormated = this.datePipe.transform(newDate, 'd');
    return `${dateFormated}`;
  }

  protected onClickDeleteComment(commentId: string){
    this.commentsListStore.deleteComment({listID: this.id(), commentId: commentId})
  }
}
