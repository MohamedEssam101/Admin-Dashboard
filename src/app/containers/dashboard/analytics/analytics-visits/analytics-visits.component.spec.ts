import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsVisitsComponent } from './analytics-visits.component';

describe('AnalyticsVisitsComponent', () => {
  let component: AnalyticsVisitsComponent;
  let fixture: ComponentFixture<AnalyticsVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsVisitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
