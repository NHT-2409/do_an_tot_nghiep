import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileChangePasswordComponent } from './user-profile-change-password.component';

describe('UserProfileChangePasswordComponent', () => {
  let component: UserProfileChangePasswordComponent;
  let fixture: ComponentFixture<UserProfileChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
