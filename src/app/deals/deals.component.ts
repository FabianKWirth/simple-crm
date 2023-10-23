import { Component, Input, OnInit, SimpleChanges } from '@angular/core'
import { Deal } from 'src/models/deal.class';
import {MatCardModule} from '@angular/material/card';
import { DialogEditDealComponent } from '../dialog-edit-deal/dialog-edit-deal.component';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  @Input() deals: Deal[];
  totalVolume: number=0; 
  formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.setTotalDealSum();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["deals"]) {
      this.setTotalDealSum();
    }
  }

  setTotalDealSum(){
    this.totalVolume=0;
    this.deals.forEach((deal)=>{
      this.totalVolume+=deal.volume;
    });
  }

  editDeal(deal: Deal){
    const dialog = this.dialog.open(DialogEditDealComponent);
    dialog.componentInstance.deal = new Deal(deal.toJSON());
    
  }
  

}
