import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricecomComponent } from './pricecom.component';

describe('PricecomComponent', () => {
  let component: PricecomComponent;
  let fixture: ComponentFixture<PricecomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricecomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricecomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
