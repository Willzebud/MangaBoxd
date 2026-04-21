import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMovieForm } from './search-movie-form';

describe('SearchMovieForm', () => {
  let component: SearchMovieForm;
  let fixture: ComponentFixture<SearchMovieForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchMovieForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMovieForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
