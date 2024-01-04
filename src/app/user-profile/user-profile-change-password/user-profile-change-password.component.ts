import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserProfileEditComponent } from '../user-profile-edit/user-profile-edit.component';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';
import { user } from 'src/app/model/user.model';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-user-profile-change-password',
  templateUrl: './user-profile-change-password.component.html',
  styleUrls: ['./user-profile-change-password.component.scss']
})
export class UserProfileChangePasswordComponent implements OnInit{
  hide = true;
  userInfo: any;
  user: any;
  registerForm: any = this.fb.group({
    email:  ['', [Validators.required]],
    password:  ['', [Validators.required]],
    confirmPassword:  ['', [Validators.required]],
    sendEmailButton:  ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserProfileChangePasswordComponent>,
    private authService: AuthServiceService,

  ) {}

  ngOnInit(): void {
    this.authService.userData$.subscribe((userData) => {
      if (userData) {
        this.user = userData;
        console.log("🚀 ~ UserProfileChangePasswordComponent ~ this.user:", this.user)
        this.userService.getUserInfo(this.user).subscribe((res) => {
          this.userInfo = res;
        })
      }
    });

  }


  onChangeCategory() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendEmail() {
    if(this.registerForm.value.email == this.user.email) {
      const currentEmail = this.registerForm.value.email;

      // Kiểm tra xem có ký tự @ trong email hay không
      if (currentEmail.includes('@')) {
        const convertedEmail = currentEmail.replace('@', '%40');

      this.userService.sendEmail(convertedEmail).subscribe(res => {
      }, (err) => {
        switch(err?.error?.text) {
          case 'sended': {
            this.toastService.show('Email have been sent');
            break;
          }
        }
      })
      }
    }
    else {
      this.toastService.show('Wrong Email');
      this.router.navigate(['/user-info']);
    }
  }

  register() {
    console.log("🚀 ~ UserProfileChangePasswordComponent ~ user: user.this.userInfo.id:",this.userInfo)

    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.toastService.show('Mật khẩu và xác nhận mật khẩu không khớp', 'err');
      this.router.navigate(['/user-info']);
      return;
    }

    this.userService.checkCode(this.registerForm.value.sendEmailButton).subscribe(() => {}
    , (err) => {
        switch(err?.error?.text) {
          case 'verified': {
            const user: user = {
              id: this.userInfo.id,
              password: this.registerForm.value.password,
            }
            this.userService.editPassword(user).subscribe(() => {
            }, (err) => {
              switch(err?.error?.text) {
                case 'update fail': {
                  this.toastService.show('Account already exists', 'err');
                  break;
                }
                case 'updated': {

                  this.toastService.show('Successfully!');
                  this.authService.setUserDataNew(this.user);
                  this.router.navigate(['/home']);
                  break;
                }
              }
            })
            break;
          }
        }
      })

  }
}
