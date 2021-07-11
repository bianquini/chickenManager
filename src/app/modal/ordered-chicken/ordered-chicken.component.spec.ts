import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedChickenComponent } from './ordered-chicken.component';

describe('OrderedChickenComponent', () => {
  let component: OrderedChickenComponent;
  let fixture: ComponentFixture<OrderedChickenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedChickenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedChickenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
