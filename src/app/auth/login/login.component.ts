import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

import * as ui from 'src/app/shared/ui.actions';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid || this.isLoading) return;
    this.store.dispatch(ui.isLoading());

    const { email, password } = this.loginForm.value;
    this.auth.login(email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(({ message }) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: message
        })
      })
      .finally(() => this.store.dispatch(ui.stopLoading()));
  }

}
