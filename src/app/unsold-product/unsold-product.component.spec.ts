import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsoldProductComponent } from './unsold-product.component';

describe('UnsoldProductComponent', () => {
  let component: UnsoldProductComponent;
  let fixture: ComponentFixture<UnsoldProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnsoldProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnsoldProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
