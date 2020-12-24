import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// NgRx
import { Store } from '@ngrx/store';
import * as ui from 'src/app/shared/ui.actions';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

// Services
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  isLoading: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.isLoading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  createUser() {
    if (this.registerForm.invalid || this.isLoading) return;
    this.isLoading = true;
    this.store.dispatch(ui.isLoading());

    const { name, email, password } = this.registerForm.value;
    this.authService.createUser(name, email, password)
      .then(() => {
        return this.router.navigate(['/']);
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
