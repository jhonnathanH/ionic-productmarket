import { Product } from './../../models/product';
import { ProductServiceProvider } from './../../providers/product-service/product-service';
import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  widgets: any;
  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ];


  public lineChartLabels: Array<any> = ['0', '1', '2', '3', '4', '5', '6'];

  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private modalCtrl: ModalController,
    public productService: ProductServiceProvider) {
    this.widgets = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [55, 55, 7, 55, 55, 1, 55], label: 'Seriesb' },
      { data: [1, 8, 7, 1, 4, 1, 0], label: 'Seriesc' }];



   // this.lineChartData.push({ data: [77, 8, 7, 55, 4, 1, 22], label: 'Seriesb' })
    console.log('ddddtttt' + JSON.stringify(this.widgets[0]));
    
    console.log('ddddtttt' + JSON.stringify(this.lineChartData));
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  addProducts() {
    const modal = this.modalCtrl.create(AddProductPage);
    modal.present();
  }

  resentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }
  addRegistry(product: Product) {
    console.log('xdxdpresss');
    let alert = this.alertCtrl.create({
      title: 'Añadir nuevo valor',
      inputs: [
        {
          name: 'newPrice',
          placeholder: 'nuevo precio'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Añadir',
          handler: data => {
            if (data.newPrice.trim() == '' || data.newPrice == null) {
              const toast = this.toastCtrl.create({
                message: 'Por favor ingrese un valor valido',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            console.log('xdxd' + data.newPrice);
            this.productService.addRegistry(product, { value: data.newPrice });
            const toast = this.toastCtrl.create({
              message: 'Item added!',
              duration: 1500,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    });
    alert.present();
  }
}
