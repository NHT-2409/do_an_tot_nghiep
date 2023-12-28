import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoriesAddComponent } from './manage-categories-add.component';

describe('ManageCategoriesAddComponent', () => {
  let component: ManageCategoriesAddComponent;
  let fixture: ComponentFixture<ManageCategoriesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCategoriesAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCategoriesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
