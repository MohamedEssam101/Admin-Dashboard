import { TestBed } from '@angular/core/testing';

import { VisitsReportService } from './visits-report.service';

describe('VisitsReportService', () => {
  let service: VisitsReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitsReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
