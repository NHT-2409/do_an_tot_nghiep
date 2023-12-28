import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/service/news.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-manage-news-add',
  templateUrl: './manage-news-add.component.html',
  styleUrls: ['./manage-news-add.component.scss']
})
export class ManageNewsAddComponent {
  admins: any;


  addNewForm: any = this.fb.group({
    imageUrl: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required],
    admin_id: ['', Validators.required],
  });

  constructor(

    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageNewsAddComponent>,
    private newsService: NewsService,
    @Inject(MAT_DIALOG_DATA) public data: { admins:any },
  ) {}

  ngOnInit(): void {
    this.admins = this.data.admins;
  }

  onChangeadmin() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.addNewForm = this.fb.group({
      imageUrl: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      admin_id: ['', Validators.required],
    });
  }

  add() {
    const newProduct = {
      'imageUrl': this.addNewForm.value.imageUrl,
      'title': this.addNewForm.value.title,
      'slug': this.addNewForm.value.title,
      'description': this.addNewForm.value.description,
      "admin_id": this.addNewForm.value.admin_id,
    }

    this.newsService.addNews(newProduct).subscribe(res => {
    }, (err) => {
      switch(err?.error?.text) {
        case "inserted": {
          this.toastService.show(`Add ${newProduct?.title} successfully!`);
          this.clearForm();
          break;
        }
      }
    })
  }
}
