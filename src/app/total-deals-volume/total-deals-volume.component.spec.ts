import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalDealsVolumeComponent } from './total-deals-volume.component';

describe('TotalDealsVolumeComponent', () => {
  let component: TotalDealsVolumeComponent;
  let fixture: ComponentFixture<TotalDealsVolumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalDealsVolumeComponent]
    });
    fixture = TestBed.createComponent(TotalDealsVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
