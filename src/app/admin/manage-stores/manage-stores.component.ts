import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { ImageViewComponent } from 'src/app/image-view/image-view.component';
import { AdminService } from 'src/app/service/admin.service';
import { LoadingService } from 'src/app/service/loading.service';
import { StoreService } from 'src/app/service/store.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-manage-stores',
  templateUrl: './manage-stores.component.html',
  styleUrls: ['./manage-stores.component.scss']
})
export class ManageStoresComponent implements OnInit{
  stores: any = [];
  admins: any;

  currentPage: number = 1;

  constructor(
    private toastService: ToastService,
    public dialog: MatDialog,
    private storeService: StoreService,
    private adminService: AdminService,
    private loadingService: LoadingService,

  ){}

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins() {
    this.loadingService.showLoading();
    this.adminService.getAllAdmins().subscribe((data: any) => {
      this.admins = data;
      this.getStores();
    })
  }


  getStores() {
    this.storeService.getAllStores().subscribe((res: any) => {
      this.stores = res;
      console.log("🚀 ~ ManageStoresComponent ~ this.stores:", this.stores)
      this.loadingService.hideLoading();
    })
  }

  formatDescription(des: string) {
    if(des?.length <= 80) {
      return des;
    }
    return des?.slice(0, 80) + ' ...';
  }

  getAdminName(id: string): string {
    const admin = this.admins.find((res: any) => res.id === id);
    return admin ? admin.name : '';
  }


  add() {
    // const dialogRef = this.dialog.open(ManageNewsAddComponent, {
    //   width: '700px',
    //   data: {
    //     admins: this.admins
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.getNews();
    // });
  }

  update(item: any) {
    // const dialogRef = this.dialog.open(ManageNewsEditComponent, {
    //   width: '700px',
    //   data: {
    //     news: item,
    //     admins: this.admins
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   this.getNews();
    // });
  }

  deleteNews(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Are you sure you want to delete?`,
        message: `Confirm delete?`
      },
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.storeService.deleteNews(item?.id).subscribe(res =>{
    //     }, (err) => {
    //       switch(err?.error?.text) {
    //         case 'deleted': {
    //           this.toastService.show(`Delete ${item?.name} successfully!`);
    //           this.getNews();
    //           break;
    //         }
    //       }
    //     })
    //   }
    // });
  }

}
