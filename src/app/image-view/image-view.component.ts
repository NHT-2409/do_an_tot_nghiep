import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }) {}

  get imageUrl(): string {
    return this.data.imageUrl;
  }
}
