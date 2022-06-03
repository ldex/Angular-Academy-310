import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

interface ProductForm {
  name: FormControl<string>;
  price: FormControl<number>;
  description: FormControl<string>;
  imageUrl: FormControl<string>;
  discontinued: FormControl<boolean>;
  fixedPrice: FormControl<boolean>;
}

@Component({
  selector: 'app-product-insert',
  templateUrl: './product-insert.component.html',
  styleUrls: ['./product-insert.component.css']
})
export class ProductInsertComponent implements OnInit {

  insertForm: FormGroup<ProductForm>;

  name: FormControl<string>;
  price: FormControl<number>;
  description: FormControl<string>;
  imageUrl: FormControl<string>;

  onSubmit() {
    let newProduct: Product = this.insertForm.value as Product;
    this
      .productService
      .insertProduct(newProduct)
      .subscribe(
        product => {
          console.log('Product saved on server with id: ' + product.id);
          this.productService.initProducts();
          this.router.navigateByUrl('/products');
        }
      )
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    let validImgUrlRegex: string = '^(https?\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,5}(?:\/\S*)?(?:[-A-Za-z0-9+&@#/%?=~_|!:,.;])+\.(?:jpg|jpeg|gif|png))$';

    this.name = new FormControl<string>('', [Validators.required, Validators.maxLength(50)]);
    this.price = new FormControl<number>(null, [Validators.required, Validators.min(0), Validators.max(10000000)]);
    this.description = new FormControl<string>('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]);
    this.imageUrl = new FormControl<string>('', [Validators.pattern(validImgUrlRegex)]);

    this.insertForm = this.fb.group(
        {
            name: this.name,
            price: this.price,
            description: this.description,
            imageUrl: this.imageUrl,
            discontinued: new FormControl(false),
            fixedPrice: new FormControl(false)
        }
    );
  }

}
