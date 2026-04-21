import { Component } from '@angular/core';
import { CreateListForm } from "../components/create-list-form/create-list-form";

@Component({
  selector: 'app-create-list',
  imports: [CreateListForm],
  templateUrl: './create-list.html',
  styleUrl: './create-list.scss',
})
export class CreateList {}
