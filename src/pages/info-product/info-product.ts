import { ProductServiceProvider } from './../../providers/product-service/product-service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Product } from '../../models/product';
import { Registry } from '../../models/registry';
import { Observable } from 'rxjs/Rx';
import { Flip } from 'number-flip';

@Component({
  selector: 'page-info-product',
  templateUrl: 'info-product.html',
})

export class InfoProductPage {
  @ViewChild('max', { read: ElementRef }) private maxV: ElementRef;
  @ViewChild('min', { read: ElementRef }) private minV: ElementRef;
  @ViewChild('maxdec', { read: ElementRef }) private maxVdec: ElementRef;
  @ViewChild('mindec', { read: ElementRef }) private minVdec: ElementRef;
  flipAnimMax = null;
  flipAnimMin = null;
  widgets: any;
  product: Product;
  Values: Observable<Registry[]>;
  valuesByproduct: Registry[] = [];
  maxValue: number;
  minValue: number;
  bandValue = true;
  newValorA: number[] = [];
  newValorB: String[] = [];
  a: number[] = [];
  b: String[] = [];
  public lineChartData: Array<any> = [{ data: ["65", "59", "80", "81", "56", "55", "40"], label: 'Series A' }];
  public lineChartLabels: Array<any> = ['0', '1', '2', '3', '4', '5', '6'];
  public lineChartOptions: any = { responsive: true };
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
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController
  ) {
    this.product = this.navParams.get("product");

    if (this.product != null) {
      this.Values = this.productService.getRegistrysByProduct(this.product);
      console.log('este es1' + JSON.stringify(this.product));
    }
    this.Values.subscribe(data => {
      this.a = [];
      this.b = [];
      this.widgets = [{ data: this.a, label: this.product.name }];
      this.lineChartLabels = this.b;
      this.valuesByproduct = data;
      if (this.valuesByproduct) {
        // console.log('este es2' + JSON.stringify(this.valuesByproduct));
        let x: any;
        let bandOk = true;
        for (let i = 0; i < this.valuesByproduct.length; i++) {
          if (this.valuesByproduct[i].created == null || this.valuesByproduct[i].created == '') {
            this.valuesByproduct[i].created = new Date();
            bandOk = false;
          }
        }

        if (bandOk) {
          console.log('estessss' + JSON.stringify(this.valuesByproduct));
          x = this.valuesByproduct.sort((a1, b1) => new Date(a1.created.toDate()).getTime() - new Date(b1.created.toDate()).getTime());

          for (let i = 0; i < x.length; i++) {
            if (this.bandValue) {
              this.maxValue = Number(parseFloat(x[i].value).toFixed(3));
              this.minValue = Number(parseFloat(x[i].value).toFixed(3));
              this.bandValue = false;
            }
            this.a.push(x[i].value);
            let myDate: any;
            if (x[i].created.toDate() != null) {
              myDate = new Date(x[i].created.toDate());
            }
            //console.log('b-date--' + this.valuesByproduct[i].created.toDate());

            //console.log(this.maxValue + ' comparacion ' + x[i].value);
            this.b.push(myDate.toLocaleDateString());
            if (this.maxValue < Number(x[i].value)) {
              this.maxValue = Number(parseFloat(x[i].value).toFixed(3));
              //console.log(this.maxValue + ' comparacion ' + x[i].value);
            }
            if (this.minValue > Number(x[i].value)) {
              this.minValue = Number(parseFloat(x[i].value).toFixed(3));
            }
          }
          this.widgets = [{ data: this.a, label: this.product.name }];
          this.lineChartLabels = this.b;
        }
      }
      // console.log('este esfinal' + JSON.stringify(this.widgets));
    });



  }

  ionViewWillEnter() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoProductPage');
    setTimeout(() => {

      this.flip(this.maxValue,this.getComponentNum(this.maxValue, 'todo'), this.maxV.nativeElement, this.flipAnimMax, 'todo');
      //this.flip(this.getComponentNum(this.maxValue, 'decimal'), this.maxVdec.nativeElement, this.flipAnimMax, 'decimal');
      this.flip(this.minValue,this.getComponentNum(this.minValue, 'todo'), this.minV.nativeElement, this.flipAnimMin, 'todo');
      //this.flip(this.getComponentNum(this.minValue, 'decimal'), this.minVdec.nativeElement, this.flipAnimMin, 'decimal');
    }, 700);

  }

  flip(high:number,value: any, div: any, fli: any, comp: string) {
    if (!fli) {
      fli = new Flip({
        node: div,
        from: this.get9s(value, comp),
        duration: 2,
        separator: this.isHigh(high)
      });
    }

    fli.flipTo({
      to: value
    });
  }
  isHigh(num:number){
    console.log('dzzz'+num)
    if(num>999){
      return ''
    }else{
      return '.'
    }
  }
  get9s(num: number, v: string) {

    if (v == 'decimal') {
      return '999'
    }
    let x = num.toString().length;
    let nienS = ""
    for (let i = 0; i < x; i++) {
      nienS = '9' + nienS;
    }
    if (v == 'todo' && num > 999) {
      return nienS
    }
    if (v == 'todo') {
      return nienS 
    }
    return nienS
  }
  getComponentNum(num: number, caract: String) {
    let n = num.toFixed(3).toString().length;
    let valueFixed = num.toFixed(3).toString();
    let decimal = valueFixed.substring(n - 3, n);
    let entero = valueFixed.substring(0, n - 4);

    if (caract == 'entero') {
      return Number(entero);
    }
    if (caract == 'decimal') {
      return Number(decimal);
    }
    if (caract == 'todo') {
      return (entero + decimal);
    }

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
            const loadingEmail = this.loading("Cargando...");
            // this.productService.addRegistry(product, { value: data.newPrice })
            //   .then(() => {
            loadingEmail.dismiss();
            this.a.push(data.newPrice);
            this.newValorA.push(data.newPrice);
            console.log('nuevo a' + JSON.stringify(this.a));
            this.b.push(new Date().toLocaleDateString());
            console.log('nuevo b' + JSON.stringify(this.b));
            this.widgets = [{ data: this.a, label: this.product.name }];
            this.lineChartLabels = this.b;
            // }

            // )
            // .catch((err) => {
            //   const toast = this.toastCtrl.create({
            //     message: 'Error Cod.' + err,
            //     duration: 1500,
            //     position: 'bottom'
            //   });
            //   toast.present();
            // }
            //show error
            // )
            ;
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

  public loading(textLoading: string) {
    let loading = this.loadingCtrl.create({
      content: textLoading
    });
    loading.present();
    return loading;
  }

  ionViewWillLeave() {

    if (this.newValorA) {
      //this.Values.
      console.log('nuevo aacaaa');
      for (let i = 0; i < this.newValorA.length; i++) {
        this.productService.addRegistry(this.product, { value: this.newValorA[i] })
      }
    }
  }
}
