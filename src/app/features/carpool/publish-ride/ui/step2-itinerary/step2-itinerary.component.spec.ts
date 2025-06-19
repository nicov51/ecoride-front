import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2ItineraryComponent } from './step2-itinerary.component';

describe('Step2ItineraryComponent', () => {
  let component: Step2ItineraryComponent;
  let fixture: ComponentFixture<Step2ItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step2ItineraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step2ItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
