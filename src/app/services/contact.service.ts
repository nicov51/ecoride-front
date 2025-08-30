import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ContactMessage} from "../core/models/others/contact-message";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  async sendContactMessage(contactData: ContactMessage): Promise<void> {
    return firstValueFrom(this.http.post<void>(`${this.apiUrl}/api/contact`, contactData));
  }
}
