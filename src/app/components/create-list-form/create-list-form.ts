import { Component, signal } from '@angular/core';
import { SearchMangaForm } from "../search-manga-form/search-manga-form";

@Component({
  selector: 'app-create-list-form',
  imports: [SearchMangaForm],
  templateUrl: './create-list-form.html',
  styleUrl: './create-list-form.scss',
})
export class CreateListForm {
   public isListPublic = signal<boolean>(true)

   public onClickPublic(){
    this.isListPublic.set(false)
  }
}
