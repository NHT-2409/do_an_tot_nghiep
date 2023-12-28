import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { user } from 'src/app/model/user.model';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-manage-users-add',
  templateUrl: './manage-users-add.component.html',
  styleUrls: ['./manage-users-add.component.scss']
})
export class ManageUsersAddComponent implements OnInit{
  hide = true;

  user: any;

  registerForm: any = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    address: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private userService: UserService,
    public dialogRef: MatDialogRef<ManageUsersAddComponent>,

  ) {}

  ngOnInit(): void {
  }

  getUsers() {
    this.userService.getAllUser().subscribe((res: any) => {
      this.user = res;
    })
  }

  onChangeCategory() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  register() {
    const user: user = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      phone: this.registerForm.value.phone,
      address: this.registerForm.value.address,
      role: 'user'
    }

    this.userService.register(user).subscribe(() => {
    }, (err: { error: { text: any; }; }) => {
      switch(err?.error?.text) {
        case 'insert fail': {
          this.toastService.show('Account already exists', 'err');
          break;
        }
        case 'inserted': {
          this.toastService.show('Addition successfully!');
          this.router.navigate(['admin']);
          break;
        }
      }
    })
  }

}
