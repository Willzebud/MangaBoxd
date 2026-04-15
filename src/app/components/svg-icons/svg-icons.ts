import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-svg-icons',
  imports: [],
  templateUrl: './svg-icons.html',
  styleUrl: './svg-icons.scss',
})
export class SvgIcons {
  @HostBinding('style.-webkit-mask-image')
  public __path!: string;

  @Input()
  public set path(filePath: string){
    this.__path = `url("${filePath}")`
  }
}
