import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBrandsEditComponent } from './manage-brands-edit.component';

describe('ManageBrandsEditComponent', () => {
  let component: ManageBrandsEditComponent;
  let fixture: ComponentFixture<ManageBrandsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBrandsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBrandsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
