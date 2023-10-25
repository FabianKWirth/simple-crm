import { Component, SimpleChanges } from '@angular/core';
import { Chart, ChartConfigurationCustomTypesPerDataset, ChartTypeRegistry } from 'chart.js/auto';
import { FirebaseService } from 'src/services/firebase.service';

@Component({
  selector: 'app-deal-status-chart',
  templateUrl: './deal-status-chart.component.html',
  styleUrls: ['./deal-status-chart.component.scss']
})
export class DealStatusChartComponent {
  data: any;
  lastChange = 0;


  constructor(public firebaseService: FirebaseService) {
    if (!this.firebaseService.loadedDeals) {
      this.firebaseService.loadDeals();
    }
  }

  names: string[] = [];
  values: number[] = [];

  getChartValues() {
    let dealStatusTypes = ['Lead', 'Contacted', 'Demo Scheduled', 'Negotiation', 'Closed-Won', 'Closed-Lost', 'Upsell', 'Renewal', 'On-Hold', 'Referral'];
    let dealSummaries = {};

    // Initialize the dealSummaries object with initial values of 0 for each status type
    dealStatusTypes.forEach(status => {
      dealSummaries[status] = 0;
    });

    this.firebaseService.loadedDeals.forEach(deal => {
      const status = deal.status; // Replace 'status' with the actual property name of the status in your data
      const volume = deal.volume; // Replace 'volume' with the actual property name of the volume in your data

      if (dealSummaries.hasOwnProperty(status)) {
        dealSummaries[status] += volume;
      }
    });

    // Now dealSummaries object will contain the sum of volume for each dealStatusType
    const labels = Object.keys(dealSummaries);
    const values = Object.values(dealSummaries);
      
        if (Date.now() - this.lastChange >60000){
          this.createChart(labels, values);
          this.lastChange=Date.now();
        }
  }

  createGraphElement() {
    const canvas = document.createElement("canvas");
    // Set the canvas ID to "ctx"
    canvas.id = "ctx";
    // Find the element with the ID "graphContainer"
    const graphContainer = document.getElementById("graphContainer");
    // Append the canvas as a child to the "graphContainer"
    graphContainer.appendChild(canvas);
  }

  destroyGraphElement() {
    let element = document.getElementById("ctx");
    if (element) {
      element.remove();
    }
  }

  createChart(labels, values) {

    this.destroyGraphElement();
    this.createGraphElement();

    new Chart("ctx", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Deal Volumn in €',
          data: values,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  ngOnDestroy(){
    this.destroyGraphElement();
  }


}
