import { Component, inject } from '@angular/core';
import {
  IonContent, IonInput, IonItem, IonButton
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    FormsModule
  ]
})
export class RegisterPage {

  name = '';
  email = '';
  password = '';

  private auth = inject(AuthService);
  private router = inject(Router);

  async register() {
    if (!this.email || !this.password) {
      console.log("Preencha tudo");
      return;
    }

    this.auth.register(this.email, this.password, this.name).subscribe({
      next: () => {
        this.router.navigate(['/tabs/login']);
      },
      error: (err) => {
        console.log("Erro ao registrar:", err);
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
