import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Wallet} from "../core/models/user/wallet";
import {environment} from "../../environments/environment";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private http = inject(HttpClient);
  wallet = signal<Wallet | null>(null);
  loading = signal<boolean>(false);
  private apiUrl = environment.apiUrl;

  fetchWallet(): Observable<Wallet> {
    this.loading.set(true);
    return this.http.get<Wallet>(`${this.apiUrl}/api/wallet/me`).pipe(
      tap({
        next: (data) => this.wallet.set(data),
        error: (err) => console.error('Erreur wallet', err),
        complete: () => this.loading.set(false)
      })
    );
  }
  get currentBalance(): number {
    return this.wallet()?.balance ?? 0;
  }
}
