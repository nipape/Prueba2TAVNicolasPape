import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Producto, ProductoDatos} from './../modelo/producto'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { present } from '@ionic/core/dist/types/utils/overlays';
import { AlertController } from '@ionic/angular'


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private URL_AUTH = 'https://dummyjson.com/auth/products'
  public cargando: boolean = false;
  public usuario: boolean = false;
  public datosDelProducto!: ProductoDatos | null | Observable<null>;
  constructor(
    private http: HttpClient,
    private alert: AlertController,
    public router: Router
  ) { }
  public authorizacion({ id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images }: Producto) {
    this.cargando = true;
    this.http.get<ProductoDatos>(this.URL_AUTH, { id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images },
    )
      .subscribe(async (datos) => {
        this.datosDelProducto = datosProducto;
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
              id: this.datosDelProducto!.id,
              title: this.datosDelProducto!.title,
              description: this.datosDelProducto!.description,
              price: this.datosDelProducto!.price,
              discountPercentage: this.datosDelProducto!.discountPercentage,
              rating: this.datosDelProducto!.gender,
              stock: this.datosDelProducto!.image,
              brand: this.datosDelProducto!.token,
              category: this.datosDelProducto!.category,
              thumbnail: this.datosDelProducto!.thumbnail,
              images: this.datosDelProducto!.images,

            }})
          }
        })
    }

  }

