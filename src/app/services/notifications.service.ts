import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Notification } from '../core/models/others/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getUserNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/api/notifications`);
  }

  markAsRead(id: number): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/api/notifications/${id}/read`, {});
  }
}
