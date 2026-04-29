import { Component } from '@angular/core';
import { CreateListForm } from "../components/create-list-form/create-list-form";

@Component({
  selector: 'app-update-list',
  imports: [CreateListForm],
  templateUrl: './update-list.html',
  styleUrl: './update-list.scss',
})
export class UpdateList {}
