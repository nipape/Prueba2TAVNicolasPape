import { Component, OnInit } from '@angular/core';
import { ServicioService } from './../servicio/servicio.service'
import { FormGroup, FormBuilder} from '@angular/forms'
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {

  formulario!: FormGroup;
  constructor(
    public auth: ServicioService,
    public builder: FormBuilder
  ) { }

  ngOnInit() {
    this.formulario = this.builder.group({
      username:[''],
      password:['']
    })
  }

  public autenticar(){
    this.auth.authorizacion({
      username: this.formulario.value['username'],
      password: this.formulario.value['password']
    })
  }
}
