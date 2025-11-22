import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}
  intercept(req: any, next: HttpHandler) {
    const token = this.auth.getToken();
    if (token) {
      const clone = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(clone);
    }
    return next.handle(req);
  }
}
