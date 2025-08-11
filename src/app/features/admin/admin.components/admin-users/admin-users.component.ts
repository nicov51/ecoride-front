import {Component, inject, signal} from '@angular/core';
import {AdminService} from "../../../../services/admin.service";
import {UserDto} from "../../../../core/models/user/user.dto";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  private adminService = inject(AdminService);
  private userService = inject(UserService)

  users = signal<UserDto[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void{
    this.isLoading.set(true);
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.isLoading.set(false);
      },
      error: error => {
        this.error.set(error?.message ?? 'Impossible de charger les utilisateurs');
        this.isLoading.set(false);
      },
    });
  }

  suspend(id: number): void {
    this.adminService.suspendUser(id).subscribe({
      next: () => {
        this.users.update(list => list.map(user => user.id === id ? { ...user, isSuspended: true } : user));
      },
      error: (error) => this.error.set(error?.message ?? 'Erreur lors de la suspension'),
    });
  }

  unsuspend(id: number): void {
    this.adminService.unsuspendUser(id).subscribe({
      next: () => {
        this.users.update(list => list.map(user => user.id === id ? { ...user, isSuspended: false } : user));
      },
      error: (error) => this.error.set(error?.message ?? 'Erreur lors de la réactivation'),
    });
  }
}
