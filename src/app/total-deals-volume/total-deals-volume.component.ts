import { Component } from '@angular/core';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-total-deals-volume',
  templateUrl: './total-deals-volume.component.html',
  styleUrls: ['./total-deals-volume.component.scss']
})
export class TotalDealsVolumeComponent {
  totalVolume: number=0;
  constructor(public firebaseService: FirebaseService) {
    this.firebaseService.loadDeals();
  }

  getTotalDealSum(){
    let totalVolume=0;
    this.firebaseService.loadedDeals.forEach((deal)=>{
      totalVolume+=deal.volume;
    });

    const formattedTotalVolume = this.formatter.format(totalVolume);
    
    return formattedTotalVolume;
  }

  formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }); 
}
