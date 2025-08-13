import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserDto} from "../../../../core/models/user/user.dto";

@Component({
  selector: 'app-admin-employees-card',
  standalone: true,
  imports: [],
  templateUrl: './admin-employees-card.component.html',
  styleUrl: './admin-employees-card.component.css'
})
export class AdminEmployeesCardComponent {
  @Input() employee!: UserDto //recoit les données du parent employee-list
  @Output() suspend = new EventEmitter<number>(); //emet vers le parent
  @Output() unsuspend = new EventEmitter<number>();

  onSuspend() {
    this.suspend.emit(this.employee.id);
  }
  onUnsuspend() {
    this.unsuspend.emit(this.employee.id);
  }
}
