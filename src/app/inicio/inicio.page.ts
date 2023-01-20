import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  public id: string ="";
  public userName: string = "";
  public email: string = "";
  public firstName: string = "";
  public lastName: string = "";
  public gender: 'male' | 'female' = 'male'
  public image: string = "";
  public token: string = "";

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.route.queryParams.subscribe(parametros=>{
      this.id = parametros['id'] || 'No especificado';
      this.userName = parametros ['username'] || 'Sin username';
      this.email = parametros['email'] || 'Sin email';
      this.firstName = parametros['firstName'] || 'Sin firstName'
      this.lastName = parametros['lastName'] || 'Sin lastName'
      this.gender = parametros['gender'] || 'sin gender'
      this.image = parametros['image'] || 'sin imagen'


      this.token = parametros['token'] || 'Sin Token';
    })
  }
}
