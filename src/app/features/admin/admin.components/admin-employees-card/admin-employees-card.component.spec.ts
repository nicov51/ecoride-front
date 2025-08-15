import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeesCardComponent } from './admin-employees-card.component';

describe('AdminEmployeesCardComponent', () => {
  let component: AdminEmployeesCardComponent;
  let fixture: ComponentFixture<AdminEmployeesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEmployeesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEmployeesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
