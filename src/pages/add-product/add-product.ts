import { Product } from './../../models/product';
import { ProductServiceProvider } from './../../providers/product-service/product-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  private todo: FormGroup;


  selectOptions = ['Comida', 'Higiene', 'Ropa', 'Carro/Repuesto'];
  searchTerm: string = '';
  gaming: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public productService: ProductServiceProvider) {

    this.todo = this.formBuilder.group({
      productName: ['', Validators.required],
      categoria: [''],
      amount: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  onAddItem() {
    console.log('ffffpp' + this.todo.value.categoria);
    let a: Product;
    a = {
      id: this.productService.lengthListProducts + 1,
      name: this.todo.value.productName,
      type: this.todo.value.categoria,
      brand: this.todo.value.categoria,
      thumbnailImageUrl: "",
      price: this.todo.value.amount
    }
    this.productService.addItem(a)
      .then(() => {
        this.productService.addRegistry(a, { value: a.price });

      });
    this.todo.reset();
    this.navCtrl.pop();
  }

  searchProduct(form: NgForm) {
    // Reset customers array back to all of the items
    //this.initializeCustomers();
    console.log("ndfffo pro");
    // if the search term is an empty string return all items
    if (!this.searchTerm) {
      // return this.customers;
    }

    // Filter recipes
    // this.customers = this.customers.filter((item) => {
    //   return item.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    // });
    if (form.value.productName == "algo") {
      console.log("soy pro");
    } else {
      console.log("no pro");
    }
  }
}
