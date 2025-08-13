import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesSidebarComponent } from './employees-sidebar.component';

describe('EmployeesSidebarComponent', () => {
  let component: EmployeesSidebarComponent;
  let fixture: ComponentFixture<EmployeesSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
