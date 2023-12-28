import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { brand } from 'src/app/model/brand.model';
import { BrandService } from 'src/app/service/brand.service';
import { ToastService } from 'src/app/service/toast.service';
import { ManageBrandsAddComponent } from './manage-brands-add/manage-brands-add.component';
import { ManageBrandsEditComponent } from './manage-brands-edit/manage-brands-edit.component';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { ImageViewComponent } from 'src/app/image-view/image-view.component';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-manage-brands',
  templateUrl: './manage-brands.component.html',
  styleUrls: ['./manage-brands.component.scss']
})
export class ManageBrandsComponent {
  currentPage: number = 1;
  dataBrands: any = [];

  ngOnInit(): void {
    this.getAll();
  }

  constructor(
    private brandService: BrandService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    public dialog: MatDialog,
    private elementRef: ElementRef
  ){}


  formatDescription(des: string) {
    if(des?.length <= 80) {
      return des;
    }

    return des?.slice(0, 80) + ' ...';
  }

  formatWebsite(des: string) {
    if(des?.length <= 30) {
      return des;
    }

    return des?.slice(0, 30) + ' ...';
  }

  viewImage(url: string) {
    const dialogRef = this.dialog.open(ImageViewComponent, {
      width: '600px',
      height: '600px',
      data: {
        imageUrl: url
      }
    });
  }

  getAll() {
    this.loadingService.showLoading();
    this.brandService.getAllBrands()
    .subscribe((data: brand[]) => {
      this.dataBrands = data;
      this.loadingService.hideLoading();
    });
  }

  addBrand() {
    const dialogRef = this.dialog.open(ManageBrandsAddComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
  }

  updateBrand(item: any) {
    const dialogRef = this.dialog.open(ManageBrandsEditComponent, {
      width: '700px',
      data: {
        brands: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
  }

  deleteBrand(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Are you sure you want to delete ${item?.name}?`,
        message: `Confirm delete?`
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.brandService.deleteBrand(item.id).subscribe(res => {
        }, (err) => {
          this.getAll();
          switch(err?.error?.text) {
            case 'deleted': {
              this.toastService.show('Delete successfully', 'err');
              break;
            }
            default: {
              this.toastService.show('Something wrong', 'err');
              break;
            }
          }
          }
        )
      }
    });
  }
}
