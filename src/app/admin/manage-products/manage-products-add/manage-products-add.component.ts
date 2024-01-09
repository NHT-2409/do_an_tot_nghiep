import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { ToastService } from 'src/app/service/toast.service';


@Component({
  selector: 'app-manage-products-add',
  templateUrl: './manage-products-add.component.html',
  styleUrls: ['./manage-products-add.component.scss']
})
export class ManageProductsAddComponent {
  categories: any;
  brands: any;

  uploadedImageUrl: any;

  addNewForm: any = this.fb.group({
    img: ['', Validators.required],
    name: ['', Validators.required],
    qty: ['', [Validators.required], Validators.pattern(/^\d{4}$/)],
    price: ['', Validators.required, Validators.pattern(/^\d{10}$/)],
    promotion: ['', Validators.required],
    description: ['', Validators.required],
    categoryId: ['', Validators.required],
    brandId: ['', Validators.required],
  });

  constructor(

    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageProductsAddComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: { categories: any , brands:any },
  ) {}

  ngOnInit(): void {
    this.categories = this.data.categories;
    this.brands = this.data.brands;
  }

  onChangeCategory() {
  }

  onUploadComplete(info: any) {
    this.uploadedImageUrl = info.cdnUrl
    console.log("🤜 ~ info.cdnUrl:", info.cdnUrl)
  }

  onChangebrand() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.addNewForm = this.fb.group({
      img: ['', Validators.required],
      name: ['', Validators.required],
      qty: ['', Validators.required],
      price: ['', Validators.required],
      promotion: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required],
    });
  }

  add() {
    const newProduct = {
      'img': this.uploadedImageUrl,
      'name': this.addNewForm.value.name,
      'slug': this.addNewForm.value.name,
      'qty': this.addNewForm.value.qty,
      'price': this.addNewForm.value.price,
      'promotion': this.addNewForm.value.promotion,
      'description': this.addNewForm.value.description,
      'categoryId': this.addNewForm.value.categoryId,
      "brandId": this.addNewForm.value.brandId,
    }

    this.productService.addProduct(newProduct).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case "inserted": {
          this.toastService.show(`Add ${newProduct?.name} successfully!`);
          this.clearForm();
          break;
        }
      }
    })
  }
}
