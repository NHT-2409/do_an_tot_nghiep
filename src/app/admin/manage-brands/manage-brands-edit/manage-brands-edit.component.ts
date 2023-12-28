import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/service/brand.service';
import { LoadingService } from 'src/app/service/loading.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-manage-brands-edit',
  templateUrl: './manage-brands-edit.component.html',
  styleUrls: ['./manage-brands-edit.component.scss']
})
export class ManageBrandsEditComponent {
  brands: any;

  editForm: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageBrandsEditComponent>,
    private loadingService: LoadingService,
    private brandService: BrandService,
    @Inject(MAT_DIALOG_DATA) public data: { brands: any},
  ) {}

  ngOnInit(): void {
    this.brands = this.data.brands;
    this.buildForm();
  }

  buildForm() {
    this.loadingService.showLoading();
    this.editForm = this.fb.group({
      imgURL: [this.brands?.imgURL, Validators.required],
      name: [this.brands?.name, Validators.required],
      website: [this.brands?.website, Validators.required],
      description: [this.brands?.description, Validators.required],
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.editForm = this.fb.group({
      imgURL: ['', Validators.required],
      name: ['', Validators.required],
      website: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  edit() {
    console.log("🚀 ~ ManageCategoriesEditComponent ~ this.editForm.value.id:", this.brands?.id)
    console.log("🚀 ~ ManageCategoriesEditComponent ~ this.editForm.value.name:", this.editForm.value.name)
    console.log("🚀 ~ ManageCategoriesEditComponent ~ this.editForm.value.status:", this.editForm.value.slug)
    const newBrand = {
      "id": this.brands?.id,
      "imgURL": this.brands?.imgURL,
      'name': this.editForm.value.name,
      'slug': this.editForm.value.name,
      'website': this.editForm.value.website,
      'description': this.editForm.value.description,
    }

    this.brandService.updateBrand(newBrand).subscribe(res => {
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
