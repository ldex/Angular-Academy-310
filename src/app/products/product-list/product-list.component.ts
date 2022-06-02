import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  title: string = "Products";
  products: Product[];
  selectedProduct: Product;

  onSelect(product: Product) {
    this.selectedProduct = product;
  }

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this
      .productService
      .products$
      .subscribe(
        data => this.products = data
      );
  }

}
