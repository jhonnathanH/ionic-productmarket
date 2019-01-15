import { Product } from './../../models/product';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import firebase from 'firebase';
import { Registry } from '../../models/registry';

@Injectable()
export class ProductServiceProvider {
  private products: AngularFirestoreCollection<Product>;
  public listProducts: Observable<Product[]>;
  public valuesPrice: AngularFirestoreCollection<Registry>;
  public listRegistry: Observable<Registry[]>;
  lengthListProducts: number;

  constructor(public afs: AngularFirestore) {
    this.products = afs.collection<Product>('product');
    this.listProducts = this.products.snapshotChanges()
      .map(actions => {
        return actions.map(item => {
          const data = item.payload.doc.data() as Product;
          console.log('iiiiittt' + data);
          this.lengthListProducts = actions.length;
          //     const id = item.payload.doc.id;
          return { ...data };
        })
      }

      )
  }

  addItem(product: Product) {
    return this.products.doc((this.lengthListProducts + 1).toString()).set(product);
  }

  addRegistry(product: Product, newregistry: Registry) {
    let a = this.afs.collection('product').doc(product.id.toString()).collection<Registry>('registrys');
    if (!a) {
      //show error
      console.log('show error');
      return
    }
    const created = firebase.firestore.FieldValue.serverTimestamp();
    newregistry.created = created;
    return a.add(newregistry);
  }

  getRegistrysByProduct(product: Product) {
    this.listRegistry = null;
    this.valuesPrice = this.afs.collection('product').doc(product.id.toString()).collection<Registry>('registrys');
    this.listRegistry = this.valuesPrice.snapshotChanges()
      .map(actions => {
        return actions.map(item => {
          const data = item.payload.doc.data() as Registry;
          console.log('iiiiittt' + data);
           //console.log('ddddtttt' + JSON.stringify(this.widgets[0]));
          //this.lengthListProducts = actions.length;
          //const id = item.payload.doc.id;
          return { ...data };
        })
      })
    return this.listRegistry;
  }
}
