import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { MangaList } from '../../core/models/manga-models';
import { CommentsListStore } from '../../core/stores/comments/comments.store';
import { CommentBody } from '../../core/models/comments-models';
import { form, required, FormField } from '@angular/forms/signals';
import { DatePipe } from '@angular/common';
import { SvgIcons } from '../svg-icons/svg-icons';

@Component({
  selector: 'app-comment-section',
  imports: [FormField, SvgIcons],
  templateUrl: './comment-section.html',
  styleUrl: './comment-section.scss',
})
export class CommentSection {
  private readonly commentsListStore = inject(CommentsListStore);
  public mangaList = input<MangaList>();
  public commentsList = computed(() => this.commentsListStore.commentsList());
  private datenow = Date.now();
  private datePipe = inject(DatePipe);

  constructor() {
    effect(() => {
      const listId = this.mangaList()?.id;
      if (!listId) {
        return;
      }
      this.commentsListStore.getComments(listId);
    });
    
  }

  /*protected canDeleteComment(commentAuthorId: string): boolean {
  const mangaListOwnerId = this.mangaList()?.owner.id;

  if (!mangaListOwnerId) {
    return false;
  }

  return commentAuthorId === mangaListOwnerId;
}*/

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
}
