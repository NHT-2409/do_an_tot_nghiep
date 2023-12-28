import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoriesEditComponent } from './manage-categories-edit.component';

describe('ManageCategoriesEditComponent', () => {
  let component: ManageCategoriesEditComponent;
  let fixture: ComponentFixture<ManageCategoriesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCategoriesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCategoriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
