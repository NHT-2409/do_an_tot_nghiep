import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'src/app/service/category.service';
import { ToastService } from 'src/app/service/toast.service';
import { ManageCategoriesAddComponent } from './manage-categories-add/manage-categories-add.component';
import { ManageCategoriesEditComponent } from './manage-categories-edit/manage-categories-edit.component';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent implements OnInit{
  currentPage: number = 1;
  dataCategory: any = [];
  categories: any;

  constructor(
    private categoryService: CategoryService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private elementRef: ElementRef
    ) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.loadingService.showLoading();
    this.categoryService.getAllCategories().subscribe(data => {
      this.dataCategory = data;
      this.loadingService.hideLoading();
    });
  }

  addCategory() {
    const dialogRef = this.dialog.open(ManageCategoriesAddComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategory();
    });
  }

  updateCategory(item: any) {
    const dialogRef = this.dialog.open(ManageCategoriesEditComponent, {
      width: '700px',
      data: {
        categories: item,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCategory();
    });
  }


  deleteCategory(id: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Are you sure you want to delete?`,
        message: `Confirm delete?`
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.deleteCategory(id).subscribe(res => {
        }, (err) => {
          this.getCategory();
          switch(err?.error?.text) {
            case 'deleted': {
              this.toastService.show('Delete Successfully!!!', 'err');
              break;
            }
            case 'delete fail': {
              this.toastService.show('Delete Faile or This Category had products!!!', 'err');
              break;
            }
          }
          }
        )
      }
    });
  }
}
