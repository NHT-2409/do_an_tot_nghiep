import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-manage-users-edit',
  templateUrl: './manage-users-edit.component.html',
  styleUrls: ['./manage-users-edit.component.scss']
})
export class ManageUsersEditComponent implements OnInit{
  user: any;


  editForm: any;
  ngOnInit(): void {
    this.user = this.data.user;
    this.buildForm();
  }

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageUsersEditComponent>,
    private usertService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { user: any },
    ) {}

  buildForm() {
    this.editForm = this.fb.group({
      name: [this.user?.name , Validators.required],
      email: [this.user?.email, [Validators.required]],
      password: [this.user?.password, [Validators.required]],
      phone: [this.user?.phone, [Validators.required]],
      address: [this.user?.address, [Validators.required]],
    });
  }


  onEdit() {
    const newUser = {
      "id": this.user?.id,
      'name': this.editForm.value.name,
      'email': this.editForm.value.email,
      'password': this.editForm.value.password,
      'phone': this.editForm.value.phone,
      'address': this.editForm.value.address
    }

    this.usertService.editUser(newUser).subscribe(res => {
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }
}
