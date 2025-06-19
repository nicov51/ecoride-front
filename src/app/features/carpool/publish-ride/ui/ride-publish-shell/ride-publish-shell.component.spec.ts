import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidePublishShellComponent } from './ride-publish-shell.component';

describe('RidePublishShellComponent', () => {
  let component: RidePublishShellComponent;
  let fixture: ComponentFixture<RidePublishShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidePublishShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidePublishShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
