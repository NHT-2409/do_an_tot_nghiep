import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { brand } from 'src/app/model/brand.model';
import { BrandService } from 'src/app/service/brand.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-manage-brands-add',
  templateUrl: './manage-brands-add.component.html',
  styleUrls: ['./manage-brands-add.component.scss']
})
export class ManageBrandsAddComponent implements OnInit{
  hide = true;

  brand: any;

  addForm: any = this.fb.group({
    imgURL: ['', Validators.required],
    name: ['', Validators.required],
    slug: ['', [Validators.required]],
    website: ['', Validators.required],
    description: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private brandService: BrandService,
    public dialogRef: MatDialogRef<ManageBrandsAddComponent>,

  ) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getAllBrands().subscribe((res: any) => {
      this.brand = res;
    })
  }

  onChangeCategory() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.addForm = this.fb.group({
      imgURL: ['', Validators.required],
      name: ['', Validators.required],
      slug: ['', Validators.required],
      website: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  add() {
    const brand = {
      'imgURL': this.addForm.value.imgURL,
      'name': this.addForm.value.name,
      'slug': this.addForm.value.name,
      'website': this.addForm.value.website,
      'description': this.addForm.value.description,
    }

    this.brandService.addBrand(brand).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case "inserted": {
          this.toastService.show(`Add ${brand?.name} successfully!`);
          this.clearForm();
          break;
        }
      }
    })
  }
}
