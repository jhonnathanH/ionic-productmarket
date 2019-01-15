import { Product } from './../../models/product';
import { ProductServiceProvider } from './../../providers/product-service/product-service';
import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { AddProductPage } from '../add-product/add-product';
import { InfoProductPage } from '../info-product/info-product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private modalCtrl: ModalController,
    public productService: ProductServiceProvider) {
    
  }

  addProducts() {
    const modal = this.modalCtrl.create(AddProductPage);
    modal.present();
  }

  goToDetails(product:Product){
    this.navCtrl.push(InfoProductPage, {product:product});
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
