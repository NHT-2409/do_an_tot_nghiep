import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-manage-categories-add',
  templateUrl: './manage-categories-add.component.html',
  styleUrls: ['./manage-categories-add.component.scss']
})
export class ManageCategoriesAddComponent {
  categories: any;


  addNewForm: any = this.fb.group({
    name: ['', Validators.required],
    status: 0,
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<ManageCategoriesAddComponent>,

  ) {}

  updateStatus() {
    const statusControl = this.addNewForm.get('status');
    statusControl.setValue(1);
    statusControl.updateValueAndValidity();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
    })
  }

  ngOnInit(): void {
    this.categories = this.getCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  add() {
    const newCategory = {
      'name': this.addNewForm.value.name,
      'slug': this.addNewForm.value.name,
      'status': this.addNewForm.value.status,
    }

    this.categoryService.addCategory(newCategory).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case "inserted": {
          this.toastService.show(`Add ${newCategory?.name} successfully!`);
          this.clearForm();
          break;
        }
      }
    })
  }

  clearForm() {
    this.addNewForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
}
