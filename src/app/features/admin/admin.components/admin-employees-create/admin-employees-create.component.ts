import {Component, EventEmitter, inject, Output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AdminService} from "../../../../services/admin.service";
import {CreateEmployeeDto} from "../../../../core/models/user/create-employee.dto";

@Component({
  selector: 'app-admin-employees-create',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './admin-employees-create.component.html',
  styleUrl: './admin-employees-create.component.css'
})
export class AdminEmployeesCreateComponent {
  private adminService = inject(AdminService);
  private formBuilder = inject(FormBuilder)

  @Output() employeeCreated = new EventEmitter<void>();
  isSubmitting: boolean = false;


  form = this.formBuilder.group({
    email: this.formBuilder.control('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: this.formBuilder.control('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    name: this.formBuilder.control('', { nonNullable: true, validators: Validators.required }),
    firstName: this.formBuilder.control('', { nonNullable: true, validators: Validators.required }),
    pseudo: this.formBuilder.control('', { nonNullable: true, validators: Validators.required }),
    phone: this.formBuilder.control('', { nonNullable: true, validators: Validators.required }),
    address: this.formBuilder.control('', { nonNullable: true, validators: Validators.required }),
    birthDate: this.formBuilder.control(new Date(), { nonNullable: true, validators: Validators.required }),
    employeeNumber: this.formBuilder.control<string | null>(null),
    picture: this.formBuilder.control<string | null>(null)
  });

  onSubmit() {
    if (this.form.invalid) return;
    this.isSubmitting =true;
    const raw = this.form.getRawValue();
    const dto: CreateEmployeeDto = {
      ...raw,
      //conversion en date
      birthDate: new Date(raw.birthDate!),
      isVerified: true, //par defaut puisque crée par l'admin
      employeeNumber: raw.employeeNumber ?? undefined,
      picture: raw.picture ?? undefined,
    };

    this.adminService.createEmployee(dto).subscribe({
      next: () => {
        this.form.reset();
        this.employeeCreated.emit();
      },
      error: (err) => console.error('Erreur création employé', err),
      complete: () => this.isSubmitting = false
    });
  }

}
