import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBrandsAddComponent } from './manage-brands-add.component';

describe('ManageBrandsAddComponent', () => {
  let component: ManageBrandsAddComponent;
  let fixture: ComponentFixture<ManageBrandsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBrandsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBrandsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
