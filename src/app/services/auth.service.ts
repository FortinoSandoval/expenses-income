import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { User } from '../models/user.model';
import * as auth from '../auth/auth.actions';
import * as expenseIncome from '../expenses-income/expenses-income.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription;
  private _user: User;

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private store: Store<AppState>) { }

  initAuthListener() {
    return this.auth.authState.subscribe(fuser => {
      if (fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/user`).valueChanges().subscribe((firestoreUser: any) => {
          const user = User.fromFirebase(firestoreUser);
          this._user = user;
          this.store.dispatch(auth.setUser({ user }));
        });
      } else {
        this._user = null;
        this.store.dispatch(auth.unsetUser());
        this.store.dispatch(expenseIncome.unsetItems());
        if (this.userSubscription) {
          this.userSubscription.unsubscribe();
        }
      }
    });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  createUser(name: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
      const { uid, email } = user;
      const newUser = new User(uid, name, email);
      return this.firestore.doc(`${uid}/user`).set({ ...newUser });
    });
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }

  get user(): User {
    return { ...this._user };
  }
}
