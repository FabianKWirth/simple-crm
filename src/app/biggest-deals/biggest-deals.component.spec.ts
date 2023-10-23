import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiggestDealsComponent } from './biggest-deals.component';

describe('BiggestDealsComponent', () => {
  let component: BiggestDealsComponent;
  let fixture: ComponentFixture<BiggestDealsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BiggestDealsComponent]
    });
    fixture = TestBed.createComponent(BiggestDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
