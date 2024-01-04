import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { UserService } from '../service/user.service';
import { LoadingService } from '../service/loading.service';
import { ManageUsersEditComponent } from '../admin/manage-users/manage-users-edit/manage-users-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from '../service/toast.service';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { UserProfileChangePasswordComponent } from './user-profile-change-password/user-profile-change-password.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUser: any[] = []; // Initialize as an array

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private userService: UserService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.authService.userData$.subscribe((userData) => {
      if (userData) {
        this.getUserInfo(userData?.email, userData?.password);
      }
    });
  }

  getUserInfo(email: any, password: any) {
    const user = {
      email: email,
      password: password,
    };

    this.userService.getUserInfo(user).subscribe((res) => {
      if (Array.isArray(res)) {
        this.currentUser = res;
      } else {
        // Nếu phản hồi không phải là mảng, biến nó thành mảng với một phần tử
        this.currentUser = [res];
      }
    });
  }

  updateInfo(info: any) {
    const dialogRef = this.dialog.open(UserProfileEditComponent, {
      width: '700px',
      data: {
        user: info
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['user-info']);
    });
  }

  changePassword(info: any){
    const dialogRef = this.dialog.open(UserProfileChangePasswordComponent, {
      width: '700px',
      data: {
        user: info
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['user-info']);
    });
  }

}



