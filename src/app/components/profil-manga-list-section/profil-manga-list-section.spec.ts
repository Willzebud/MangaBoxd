import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilMangaListSection } from './profil-manga-list-section';

describe('ProfilMangaListSection', () => {
  let component: ProfilMangaListSection;
  let fixture: ComponentFixture<ProfilMangaListSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilMangaListSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilMangaListSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
