import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailList } from './detail-list';

describe('DetailList', () => {
  let component: DetailList;
  let fixture: ComponentFixture<DetailList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailList],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
