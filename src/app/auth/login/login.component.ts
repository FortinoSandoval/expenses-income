import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid || this.isLoading) return;
    this.isLoading = true;

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
      .finally(() => this.isLoading = false);
  }

}
