import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaListSection } from './manga-list-section';

describe('MangaListSection', () => {
  let component: MangaListSection;
  let fixture: ComponentFixture<MangaListSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaListSection],
    }).compileComponents();

    fixture = TestBed.createComponent(MangaListSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
