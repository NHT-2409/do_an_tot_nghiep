import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductsEditComponent } from './manage-products-edit.component';

describe('ManageProductsEditComponent', () => {
  let component: ManageProductsEditComponent;
  let fixture: ComponentFixture<ManageProductsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProductsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
