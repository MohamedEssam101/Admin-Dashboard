import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCartComponent } from './header-cart.component';

describe('HeaderCartComponent', () => {
  let component: HeaderCartComponent;
  let fixture: ComponentFixture<HeaderCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
