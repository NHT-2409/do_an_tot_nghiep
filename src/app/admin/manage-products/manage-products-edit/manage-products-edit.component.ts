import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-manage-products-edit',
  templateUrl: './manage-products-edit.component.html',
  styleUrls: ['./manage-products-edit.component.scss']
})
export class ManageProductsEditComponent {
  categories: any;
  product: any;
  brands: any;
  editForm: any;
  uploadedImageUrl: any;

  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageProductsEditComponent>,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: { categories: any,brands: any, product: any },
  ) {}

  ngOnInit(): void {
    this.categories = this.data.categories;
    this.product = this.data.product;
    this.brands = this.data.brands;
    this.buildForm();
  }


  onUploadComplete(info: any) {
    this.uploadedImageUrl = info.cdnUrl
    console.log("🤜 ~ info.cdnUrl:", info.cdnUrl)
  }

  buildForm() {
    this.editForm = this.fb.group({
      img: [this.product?.img, Validators.required],
      name: [this.product?.name, Validators.required],
      qty: [this.product?.qty, Validators.required],
      price: [this.product?.price, Validators.required],
      promotion: [this.product?.promotion, Validators.required],
      description: [this.product?.description, Validators.required],
      categoryId: [this.product?.categoryId?.id, Validators.required],
      brandId: [this.product?.brandId?.id, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.editForm = this.fb.group({
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

  edit() {
    const newProduct = {
      "id": this.product?.id,
      'img': this.editForm.value.img,
      'name': this.editForm.value.name,
      'slug': this.editForm.value.name,
      'qty': this.editForm.value.qty,
      'price': this.editForm.value.price,
      'promotion': this.editForm.value.promotion,
      'description': this.editForm.value.description,
      'categoryId': this.editForm.value.categoryId,
      "brandId": this.editForm.value.brandId,
    }

    this.productService.updateProduct(newProduct).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case "updated": {
          this.toastService.show(`Update successfully!`);
          this.clearForm();
          break;
        }
      }
    })
  }
}
