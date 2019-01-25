import { ProductServiceProvider } from './../../providers/product-service/product-service';
import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  rateBss: number;
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public productService: ProductServiceProvider,
    public toastCtrl: ToastController) {

  }
  update() {
    console.log('xdxdpresss');
    let alert = this.alertCtrl.create({
      title: 'Añadir nueva tasa',
      inputs: [
        {
          name: 'newPrice',
          type: 'number'
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
            let num = parseFloat(data.newPrice);
            console.log("num3.toFixed(2) is " + num.toFixed(3));
            this.rateBss = num;
            //--addRate
            this.productService.addRate({value:num});
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
