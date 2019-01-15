import { ProductServiceProvider } from './../../providers/product-service/product-service';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Product } from '../../models/product';
import { Registry } from '../../models/registry';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'page-info-product',
  templateUrl: 'info-product.html',
})
export class InfoProductPage {
  widgets: any;
  product: Product;
  Values: Observable<Registry[]>;
  valuesByproduct: Registry[] = [];
  public lineChartData: Array<any> = [
    { data: ["65", "59", "80", "81", "56", "55", "40"], label: 'Series A' }
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
    public navParams: NavParams,
    public productService: ProductServiceProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
    this.product = this.navParams.get("product");
    if (this.product != null) {
      this.Values = this.productService.getRegistrysByProduct(this.product);
      console.log('este es1' + JSON.stringify(this.Values));
    }
    let a: number[] = [];
    let b: String[] = [];
    this.Values.subscribe(data => {
      this.valuesByproduct = data;
      console.log('este es2' + JSON.stringify(this.valuesByproduct));

      for (let i = 0; i < this.valuesByproduct.length; i++) {
        a.push(this.valuesByproduct[i].value);
        let myDate = new Date(this.valuesByproduct[i].created.toDate());
        console.log('b-date--' + this.valuesByproduct[i].created.toDate());
        b.push(myDate.toLocaleDateString());
    
        
      }

      let x =  this.valuesByproduct.sort((a1, b1) => new Date(b1.created.toDate()).getTime() - new Date(a1.created.toDate()).getTime());
      console.log('a---' + JSON.stringify(a));
      console.log('b---' + JSON.stringify(b));
      console.log('x---' + JSON.stringify(x));
      this.widgets = [
        { data: a, label: this.product.name }];
      this.lineChartLabels = b;
      console.log('este esfinal' + JSON.stringify(this.widgets));
      console.log('este esfinal' + JSON.stringify(this.lineChartData));
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoProductPage');
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
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
