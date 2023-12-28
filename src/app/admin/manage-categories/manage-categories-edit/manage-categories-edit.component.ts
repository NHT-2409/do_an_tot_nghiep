import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-manage-categories-edit',
  templateUrl: './manage-categories-edit.component.html',
  styleUrls: ['./manage-categories-edit.component.scss']
})
export class ManageCategoriesEditComponent {
  categories: any;

  editForm: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageCategoriesEditComponent>,
    private CategoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: { categories: any},
  ) {}

  ngOnInit(): void {
    this.categories = this.data.categories;
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.fb.group({
      name: [this.categories?.name, Validators.required],
      status: [this.categories?.status.toString(), [Validators.required]],
    });
  }

  updateStatus() {
    const statusControl = this.editForm.get('status');
    const currentValue = statusControl.value;
    console.log("🚀 ~ ManageCategoriesEditComponent ~ currentValue:", currentValue)

    // Chuyển đổi giá trị từ chuỗi sang số
    const newValue = currentValue ? parseInt(currentValue, 10) : null;

    // Đặt lại giá trị của status
    statusControl.setValue(newValue);
    console.log("🚀 ~ ManageCategoriesEditComponent ~ statusControl:", statusControl)
  }

  // getOptionValues(): string[] {

  //   return ['1', '0'];
  // }


  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.editForm = this.fb.group({
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
    });
  }

  edit() {
    console.log("🚀 ~ ManageCategoriesEditComponent ~ this.editForm.value.id:", this.categories?.id)
    console.log("🚀 ~ ManageCategoriesEditComponent ~ this.editForm.value.name:", this.editForm.value.name)
    console.log("🚀 ~ ManageCategoriesEditComponent ~ this.editForm.value.status:", this.editForm.value.status)
    const newProduct = {
      "id": this.categories?.id,
      'name': this.editForm.value.name,
      'slug': this.editForm.value.name,
      'status': this.editForm.value.status,
    }

    this.CategoryService.updateCategory(newProduct).subscribe(res => {
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
