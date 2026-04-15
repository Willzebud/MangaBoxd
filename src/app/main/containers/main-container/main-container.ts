import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../../../components/header/header";

@Component({
  selector: 'app-main-container',
  imports: [RouterOutlet, Header],
  templateUrl: './main-container.html',
  styleUrl: './main-container.scss',
})
export class MainContainer {}
