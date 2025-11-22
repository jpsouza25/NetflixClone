import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonInput,
  IonItem,
  IonButton,
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonHeader,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    FormsModule,
  ],
})
export class LoginPage {
  email = '';
  password = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  async login() {
    if (!this.email || !this.password) return;

    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/tabs/home']),
      error: () => console.log('Credenciais inválidas'),
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
