import { Component, input, output, signal } from '@angular/core';
import { SvgIcons } from '../svg-icons/svg-icons';
import { MangaList } from '../../core/models/manga-models';

@Component({
  selector: 'app-sort-and-filter-controls',
  imports: [SvgIcons],
  templateUrl: './sort-and-filter-controls.html',
  styleUrl: './sort-and-filter-controls.scss',
})
export class SortAndFilterControls {
  public isFilterActive = input.required<boolean>();
  public isSortedActive = input.required<boolean>();
  public changeFilter = output<boolean>();
  public changeSorter = output<boolean>();
  public changeReset = output<void>();

  public onClickFilter() {
    this.changeFilter.emit(this.isFilterActive());
  }

  public onClickSorted() {
    this.changeSorter.emit(this.isSortedActive());
  }

  public onClickReset() {
    this.changeReset.emit()
  }
}
