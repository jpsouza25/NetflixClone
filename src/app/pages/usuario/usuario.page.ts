import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IonIcon, IonButton, IonTitle, IonToolbar, IonHeader, IonButtons, IonContent } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
  imports: [IonIcon, IonButton, IonTitle, IonToolbar, IonHeader, IonButtons, IonContent],
})
export class UsuarioPage implements OnInit {

  usuario: any = null;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    addIcons({
      logOutOutline
    })
  }

  ngOnInit() {
    this.loadusuario();
  }

  loadusuario() {
    this.http.get('http://localhost:3000/api/auth/me')
      .subscribe({
        next: (res: any) => {
          this.usuario = res.usuario;
        },
        error: (err) => {
          console.error('Erro ao carregar usuário:', err);
        }
      });
  }

  logout() {
    localStorage.removeItem('token'); // ou SecureStorage, se usar
    this.router.navigate(['/login']);
  }

}
