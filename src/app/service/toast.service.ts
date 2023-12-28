import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  duration: number =3000
  config: MatSnackBarConfig = new MatSnackBarConfig();

  constructor(private snackbar: MatSnackBar) { }

  show(message: string, type?: string) {
    this.config = new MatSnackBarConfig();

    if(!type || type === 'success') {
      this.config.panelClass = ['success-snackbar'];
      this.config.duration = this.duration;
      this.snackbar.open(message, 'Close', this.config);
      return
    }

    switch(type) {
      case 'err': {
        this.config.panelClass = ['error-snackbar'];
        this.config.duration = 3000;
        this.snackbar.open(message, 'Close', this.config);
        break;
      }
    }
  }

  showSuccess() {
    const config = new MatSnackBarConfig();
    config.panelClass = ['success-snackbar'];
    config.duration = 3000;
    this.snackbar.open('Success message!', 'Close', config);
  }
}
