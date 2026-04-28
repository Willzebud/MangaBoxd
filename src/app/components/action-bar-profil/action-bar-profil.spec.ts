import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionBarProfil } from './action-bar-profil';

describe('ActionBarProfil', () => {
  let component: ActionBarProfil;
  let fixture: ComponentFixture<ActionBarProfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionBarProfil],
    }).compileComponents();

    fixture = TestBed.createComponent(ActionBarProfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
