import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3DetailsComponent } from './step3-details.component';

describe('Step3DetailsComponent', () => {
  let component: Step3DetailsComponent;
  let fixture: ComponentFixture<Step3DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step3DetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step3DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
