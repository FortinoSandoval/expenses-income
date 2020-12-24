import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  createUser() {
    if (this.registerForm.invalid || this.isLoading) return;
    this.isLoading = true;

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
      .finally(() => this.isLoading = false);
  }
}
