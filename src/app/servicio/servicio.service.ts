import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Auth, AuthResponse } from './../modelo/auth'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { present } from '@ionic/core/dist/types/utils/overlays';
import { AlertController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private URL_AUTH = 'https://dummyjson.com/auth/login'
  public cargando: boolean = false;
  public usuario: boolean = false;
  public datosDelUsuario!: AuthResponse | null | Observable<null>;
  constructor(
    private http: HttpClient,
    private alert: AlertController,
    public router: Router
  ) { }
  public authorizacion({ username, password }: Auth) {
    this.cargando = true;
    this.http.post<AuthResponse>(this.URL_AUTH, { username, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .subscribe(async (datos) => {
        this.datosDelUsuario = datos;
        this.cargando = false;
        if (datos) {
          const alerta = await this.alert.create({
            header: 'Autenticado',
            buttons: [{
              text: 'Ok',
              role: 'Confirm'
            }]
          });
          await alerta.present();
          this.usuario = true;
          this.router.navigate(['/inicio'], {
            queryParams: {
              id: this.datosDelUsuario?.id,
              username: this.datosDelUsuario?.username,
              email: this.datosDelUsuario.email,
              firstName: this.datosDelUsuario.firstName,
              lastName: this.datosDelUsuario.lastName,
              gender: this.datosDelUsuario.gender,
              image: this.datosDelUsuario.image,
              token: this.datosDelUsuario.token,

            }})
          }
        })
    }

  }
