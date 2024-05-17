import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvailableProductComponent } from './user-available-product.component';

describe('UserAvailableProductComponent', () => {
  let component: UserAvailableProductComponent;
  let fixture: ComponentFixture<UserAvailableProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAvailableProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAvailableProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
