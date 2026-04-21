import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../../../components/header/header";
import { Footer } from "../../../components/footer/footer";

@Component({
  selector: 'app-main-container',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './main-container.html',
  styleUrl: './main-container.scss',
})
export class MainContainer {}
