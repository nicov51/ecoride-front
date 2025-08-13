import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesLayoutComponent } from './employees-layout.component';

describe('EmployeesLayoutComponent', () => {
  let component: EmployeesLayoutComponent;
  let fixture: ComponentFixture<EmployeesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
