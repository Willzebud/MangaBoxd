import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaCoverLibrary } from './manga-cover-library';

describe('MangaCoverLibrary', () => {
  let component: MangaCoverLibrary;
  let fixture: ComponentFixture<MangaCoverLibrary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaCoverLibrary],
    }).compileComponents();

    fixture = TestBed.createComponent(MangaCoverLibrary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
