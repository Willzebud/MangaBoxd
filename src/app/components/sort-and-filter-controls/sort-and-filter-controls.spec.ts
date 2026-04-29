import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortAndFilterControls } from './sort-and-filter-controls';

describe('SortAndFilterControls', () => {
  let component: SortAndFilterControls;
  let fixture: ComponentFixture<SortAndFilterControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortAndFilterControls],
    }).compileComponents();

    fixture = TestBed.createComponent(SortAndFilterControls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
