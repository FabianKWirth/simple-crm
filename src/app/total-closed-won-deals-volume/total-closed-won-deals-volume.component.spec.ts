import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalClosedWonDealsVolumeComponent } from './total-closed-won-deals-volume.component';

describe('TotalClosedWonDealsVolumeComponent', () => {
  let component: TotalClosedWonDealsVolumeComponent;
  let fixture: ComponentFixture<TotalClosedWonDealsVolumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalClosedWonDealsVolumeComponent]
    });
    fixture = TestBed.createComponent(TotalClosedWonDealsVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
