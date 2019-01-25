import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';
import { User } from '../../models/user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';

@Injectable()
export class UserServiceProvider {

  private users: AngularFirestoreCollection<User>;
  collection: AngularFirestoreCollection<User> = this.afs.collection('user')
  public listUser: Observable<User[]>;

  constructor(public afs: AngularFirestore) {
    this.users = afs.collection<User>('user');
    this.listUser = this.users.snapshotChanges()
      .map(actions => {
        return actions.map(item => {
          const data = item.payload.doc.data() as User;
          console.log('iiiiittt'+data);
    //     const id = item.payload.doc.id;
          return {...data};
        })
      })
  }

  addUser(user: User) {
    return this.users.doc(user.uid).set(user);
  }


  // collection.update(data)
  // collection.delete()

  // Notice how the observable is separated from write options

  //xcollection$: Observable<User[]> = this.collection.valueChanges();
  //collection$.subscribe(data => console.log(data) );

}
