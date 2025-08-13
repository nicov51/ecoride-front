import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeesListComponent } from './admin-employees-list.component';

describe('AdminEmployeesComponent', () => {
  let component: AdminEmployeesListComponent;
  let fixture: ComponentFixture<AdminEmployeesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEmployeesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEmployeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
