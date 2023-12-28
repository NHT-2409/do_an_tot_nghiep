import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNewsAddComponent } from './manage-news-add.component';

describe('ManageNewsAddComponent', () => {
  let component: ManageNewsAddComponent;
  let fixture: ComponentFixture<ManageNewsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageNewsAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageNewsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
