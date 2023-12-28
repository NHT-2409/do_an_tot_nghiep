import { Component, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { user } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
import { ManageUsersAddComponent } from './manage-users-add/manage-users-add.component';
import { ManageUsersEditComponent } from './manage-users-edit/manage-users-edit.component';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { ToastService } from 'src/app/service/toast.service';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent {
  currentPage: number = 1;
  dataUser: any = [];

  ngOnInit(): void {
    this.getAll();
  }

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private loadingService: LoadingService,

  ){}

  // viewImage(url: string) {
  //   const dialogRef = this.dialog.open(ImageViewComponent, {
  //     width: '600px',
  //     height: '600px',
  //     data: {
  //       imageUrl: url
  //     }
  //   });
  // }

  getAll() {
    this.loadingService.showLoading();
    this.userService.getAllUser()
    .subscribe((data: user[]) => {
      this.dataUser = data;
      this.loadingService.hideLoading();

    });
  }

  addUser() {
    const dialogRef = this.dialog.open(ManageUsersAddComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
  }

  updateUser(item: any) {
    const dialogRef = this.dialog.open(ManageUsersEditComponent, {
      width: '700px',
      data: {
        user: item
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAll();
    });
  }

  deleteUser(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Are you sure you want to delete ${item?.Name}?`,
        message: `Confirm delete?`
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(item.id).subscribe(res => {
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
