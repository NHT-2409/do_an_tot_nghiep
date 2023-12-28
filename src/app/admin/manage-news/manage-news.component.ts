import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/service/admin.service';
import { NewsService } from 'src/app/service/news.service';
import { ToastService } from 'src/app/service/toast.service';
import { ManageNewsAddComponent } from './manage-news-add/manage-news-add.component';
import { ManageNewsEditComponent } from './manage-news-edit/manage-news-edit.component';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { ImageViewComponent } from 'src/app/image-view/image-view.component';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-manage-news',
  templateUrl: './manage-news.component.html',
  styleUrls: ['./manage-news.component.scss']
})
export class ManageNewsComponent {
  news: any = [];
  admins: any;

  currentPage: number = 1;

  constructor(
    private toastService: ToastService,
    public dialog: MatDialog,
    private newsService: NewsService,
    private adminService: AdminService,
    private loadingService: LoadingService,

  ){}

  ngOnInit(): void {
    this.getAdmins();

  }

  getAdmins() {
    this.loadingService.showLoading();
    this.adminService.getAllAdmins().subscribe((res: any) => {
      this.admins = res;
      this.getNews();

    })
  }


  getNews() {
    this.newsService.getAllNews().subscribe((res: any) => {
      this.news = res;
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
    const dialogRef = this.dialog.open(ManageNewsAddComponent, {
      width: '700px',
      data: {
        admins: this.admins
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getNews();
    });
  }

  update(item: any) {
    const dialogRef = this.dialog.open(ManageNewsEditComponent, {
      width: '700px',
      data: {
        news: item,
        admins: this.admins
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getNews();
    });
  }

  deleteNews(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Are you sure you want to delete?`,
        message: `Confirm delete?`
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newsService.deleteNews(item?.id).subscribe(res =>{
        }, (err) => {
          switch(err?.error?.text) {
            case 'deleted': {
              this.toastService.show(`Delete ${item?.name} successfully!`);
              this.getNews();
              break;
            }
          }
        })
      }
    });
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
}
