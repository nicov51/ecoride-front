import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemRidesComponent } from './problem-rides.component';

describe('ProblemRidesComponent', () => {
  let component: ProblemRidesComponent;
  let fixture: ComponentFixture<ProblemRidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemRidesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
