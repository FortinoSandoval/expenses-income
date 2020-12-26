import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  name: string = '';
  userSubscription: Subscription;

  constructor(private auth: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user').pipe(filter(user => user.user != null)).subscribe(({ user }) => this.name = user.name);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout() {
    return this.auth.logout().then(() => {
      this.router.navigate(['/', 'login']);
    });
  }
}
