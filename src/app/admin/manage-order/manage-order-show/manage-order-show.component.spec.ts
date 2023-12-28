import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrderShowComponent } from './manage-order-show.component';

describe('ManageOrderShowComponent', () => {
  let component: ManageOrderShowComponent;
  let fixture: ComponentFixture<ManageOrderShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOrderShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOrderShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
