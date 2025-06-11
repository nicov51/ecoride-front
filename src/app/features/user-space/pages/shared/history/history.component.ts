import { Component } from '@angular/core';
import { NgForOf, NgIf} from "@angular/common";


@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  // Données de test
  trajets = [
    {
      id: 1,
      depart: 'Paris',
      arrivee: 'Lyon',
      date: '15/12/2023',
      places: 3,
      statut: 'Terminé',
      note: 4,
      role: 'Conducteur'
    },
    {
      id: 2,
      depart: 'Bordeaux',
      arrivee: 'Toulouse',
      date: '10/12/2023',
      places: 2,
      statut: 'Annulé',
      role: 'Passager'
    }
  ];

  transactions = [
    {
      id: 1,
      type: 'Rechargement',
      montant: '+20 crédits',
      date: '01/12/2023'
    },
    {
      id: 2,
      type: 'Trajet Paris-Lyon',
      montant: '-5 crédits',
      date: '12/12/2023'
    }
  ];

  activites = [
    {
      id: 1,
      type: 'Annulation',
      details: 'Vous avez annulé un trajet',
      date: '11/12/2023'
    }
  ];

  // Calcul simple de la note moyenne
  calculerNoteMoyenne() {
    let total = 0;
    let count = 0;

    this.trajets.forEach(trajet => {
      if (trajet.note) {
        total += trajet.note;
        count++;
      }
    });

    return count > 0 ? (total / count).toFixed(1) : 'Aucune note';
  }

}
