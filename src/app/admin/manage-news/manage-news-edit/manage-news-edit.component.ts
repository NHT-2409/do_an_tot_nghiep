import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/service/news.service';
import { ToastService } from 'src/app/service/toast.service';

@Component({
  selector: 'app-manage-news-edit',
  templateUrl: './manage-news-edit.component.html',
  styleUrls: ['./manage-news-edit.component.scss']
})
export class ManageNewsEditComponent {
  admins: any;
  news: any;
  editForm: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogRef: MatDialogRef<ManageNewsEditComponent>,
    private newsService: NewsService,
    @Inject(MAT_DIALOG_DATA) public data: { news: any ,admins: any },
  ) {}

  ngOnInit(): void {
    this.admins = this.data.admins;
    this.news = this.data.news;
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.fb.group({
      imageUrl: [this.news?.imageUrl, Validators.required],
      title: [this.news?.title, Validators.required],
      description: [this.news?.description, Validators.required],
      admin_id: [this.news?.admin_id?.id, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearForm() {
    this.editForm = this.fb.group({
      imageUrl: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      admin_id: ['', Validators.required],
    });
  }

  edit() {
    const newNews = {
      "id": this.news?.id,
      'title': this.editForm.value.title,
      'slug': this.editForm.value.title,
      'imageUrl': this.editForm.value.imageUrl,
      'description': this.editForm.value.description,
      "admin_id": this.editForm.value.admin_id,
    }

    this.newsService.updateNews(newNews).subscribe(res => {
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
}
