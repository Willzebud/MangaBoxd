import { Component } from '@angular/core';
import { SearchMovieForm } from "../search-movie-form/search-movie-form";

@Component({
  selector: 'app-create-list-form',
  imports: [SearchMovieForm],
  templateUrl: './create-list-form.html',
  styleUrl: './create-list-form.scss',
})
export class CreateListForm {}
