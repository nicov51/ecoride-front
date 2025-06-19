import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step1RideInfoComponent } from './step1-ride-info.component';

describe('Step1RideInfoComponent', () => {
  let component: Step1RideInfoComponent;
  let fixture: ComponentFixture<Step1RideInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step1RideInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step1RideInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
