import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/service/toast.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit{
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
    public dialogRef: MatDialogRef<UserProfileEditComponent>,
    private usertService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { user: any },
    ) {}

  buildForm() {
    this.editForm = this.fb.group({
      name: [this.user?.name , Validators.required],
      email: [this.user?.email, [Validators.required]],
      phone: [this.user?.phone, [Validators.required, Validators.pattern(/^\d{9}$/)]],
      address: [this.user?.address, [Validators.required]],
    });
  }


  onEdit() {
    const newUser = {
      "id": this.user?.id,
      'name': this.editForm.value.name,
      'phone': this.editForm.value.phone,
      'address': this.editForm.value.address
    }

    this.usertService.editInfo(newUser).subscribe(res => {
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
