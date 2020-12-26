import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(tap(state => {
      if (!state) {
        return this.router.navigate(['/', 'login']);
      }
    }));
  }

  canLoad(): Observable<boolean> {
    return this.authService
      .isAuth()
      .pipe(
        tap(state => {
          if (!state) {
            return this.router.navigate(['/', 'login']);
          }
        }),
        take(1)
      );
  }
}
