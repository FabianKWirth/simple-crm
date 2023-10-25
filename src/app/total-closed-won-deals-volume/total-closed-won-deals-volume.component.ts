import { Component } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-total-closed-won-deals-volume',
  templateUrl: './total-closed-won-deals-volume.component.html',
  styleUrls: ['./total-closed-won-deals-volume.component.scss'],
  providers: [FirebaseService]
})
export class TotalClosedWonDealsVolumeComponent {
  totalVolume: number = 0;
  constructor(public firebaseService: FirebaseService) {
    this.firebaseService.loadDeals("status","Closed-Won");
  }

  getTotalDealSum() {
    let totalVolume = 0;
    this.firebaseService.loadedDeals.forEach((deal) => {
      totalVolume += deal.volume;
    });

    const formattedTotalVolume = this.formatter.format(totalVolume);

    return formattedTotalVolume;
  }

  formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });
}
