import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealStatusChartComponent } from './deal-status-chart.component';

describe('DealStatusChartComponent', () => {
  let component: DealStatusChartComponent;
  let fixture: ComponentFixture<DealStatusChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DealStatusChartComponent]
    });
    fixture = TestBed.createComponent(DealStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
