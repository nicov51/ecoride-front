import {Component, effect, inject, OnInit} from '@angular/core';
import { WalletService } from '../../../../../services/wallet.service';
import { AuthService } from '../../../../../services/auth.service';
import { NgIf, NgForOf } from '@angular/common';
import {Wallet} from "../../../../../core/models/user/wallet";

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {
  private walletService = inject(WalletService);
  private authService = inject(AuthService);

  wallet: Wallet | null = null;
  balance: number = 0;

  walletEffect = effect(() => {
  const wallet = this.walletService.wallet();
  this.wallet = wallet;
  this.balance = wallet?.balance ?? 0;
});

  transactions = [
    {
      type: 'credit',
      amount: 20,
      reason: 'Inscription',
      date: '15/12/2023'
    },
    {
      type: 'debit',
      amount: 5,
      reason: 'Trajet Paris-Lyon',
      date: '16/12/2023'
    },
    {
      type: 'credit',
      amount: 10,
      reason: 'Rechargement',
      date: '17/12/2023'
    }
  ];

  ngOnInit() {
    const user = this.authService.currentUserSignal();
    if (user) {
      this.walletService.fetchWallet();
    }
  }
}

