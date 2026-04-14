import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCardForm } from './auth-card-form';

describe('AuthCardForm', () => {
  let component: AuthCardForm;
  let fixture: ComponentFixture<AuthCardForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthCardForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthCardForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
