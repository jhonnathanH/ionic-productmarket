import { UserServiceProvider } from './../../providers/user-service/user-service';
import { User } from './../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  userProfile: any = null;
 // xuser$: any;
  constructor(public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private userService: UserServiceProvider,
    private auth: AuthServiceProvider) {

  }

  ionViewWillEnter() {
    //this.xuser$= this.userService.listUser;
    //this.xuser$.subscribe(data => console.log('z'+data.toString()) );
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userProfile = user;
        console.log("syyyyy");
      } else {
        this.userProfile = null;
      }
    });
  }
  doGoogleLogin() {
    let a: User;
    this.auth.loginWithGoogle()
      .then((v) => {
        console.log("dtttdffff" + v.uid);
        a = {
          name: v.displayName,
          uid: v.uid,
          email: v.email,
          photoURL: v.photoURL,
        };
        console.log("ddffff" + a);
        return this.userService.addUser(a);
      })
      .catch(console.log);

  }

  signOut(): Promise<void> {
    console.log("press Logout");
    return this.afAuth.auth.signOut();
  }
}
