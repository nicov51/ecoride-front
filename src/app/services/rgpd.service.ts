import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {RgpdRequest} from "../core/models/others/rgpd-request";
import {firstValueFrom} from "rxjs";
import {DataExportResponse} from "../core/models/others/data-export-responde";

@Injectable({
  providedIn: 'root'
})
export class RgpdService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  async submitRgpdRequest(request: RgpdRequest): Promise<void> {
    return firstValueFrom(
      this.http.post<void>(`${this.apiUrl}/api/rgpd/request`, request),
    );
  }
  async getMyDataExport(email: string, format: 'pdf' | 'json' | 'csv' = 'pdf'): Promise<DataExportResponse> {
    return firstValueFrom(
      this.http.post<DataExportResponse>(`${this.apiUrl}/api/rgpd/export`, { email, format })
    );
  }
}
