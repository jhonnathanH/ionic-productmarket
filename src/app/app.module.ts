import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule  } from '@angular/http';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { AddProductPage } from '../pages/add-product/add-product';
import { ChartsModule } from 'ng2-charts';

export const firebaseConfig = {
  apiKey: "AIzaSyAgN5hiWEn64nhApz7Inr4jYiTB--H0KVY",
  authDomain: "productmarketjh.firebaseapp.com",
  databaseURL: "https://productmarketjh.firebaseio.com",
  projectId: "productmarketjh",
  storageBucket: "productmarketjh.appspot.com",
  messagingSenderId: "908569987624"
};
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddProductPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ProductServiceProvider,
    AuthServiceProvider,
    UserServiceProvider
  ]
})
export class AppModule { }
