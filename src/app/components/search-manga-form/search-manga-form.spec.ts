import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMangaForm } from './search-manga-form';

describe('SearchMangaForm', () => {
  let component: SearchMangaForm;
  let fixture: ComponentFixture<SearchMangaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchMangaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMangaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
