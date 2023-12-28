import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNewsEditComponent } from './manage-news-edit.component';

describe('ManageNewsEditComponent', () => {
  let component: ManageNewsEditComponent;
  let fixture: ComponentFixture<ManageNewsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageNewsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageNewsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
