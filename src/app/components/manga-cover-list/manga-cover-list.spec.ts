import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaCoverList } from './manga-cover-list';

describe('MangaCoverList', () => {
  let component: MangaCoverList;
  let fixture: ComponentFixture<MangaCoverList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaCoverList],
    }).compileComponents();

    fixture = TestBed.createComponent(MangaCoverList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
