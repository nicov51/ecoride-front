import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

interface Transaction {
  type: 'credit' | 'debit';
  amount: number;
  reason: string;
  date: Date;
}

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {

  balance = 20; // Solde initial

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


}
