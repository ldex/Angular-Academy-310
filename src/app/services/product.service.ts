import { Injectable } from '@angular/core'
import { Product } from '../models/product.interface'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError, catchError, delay, shareReplay, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://storerestservice.azurewebsites.net/api/products/';
  products$: Observable<Product[]>;

  constructor(
    private http: HttpClient
  ) {
    this.initProducts();
  }

  getProductById(id: number): Observable<Product> {
    return this
              .products$
              .pipe(
                map(products => products.find(product => product.id == id))
              );
  }

  initProducts() {
    this.products$ = this
                      .http
                      .get<Product[]>(this.baseUrl)
                      .pipe(
                        tap(console.table),
                        delay(1500), // pour démo...
                        shareReplay()
                      );
  }
}
