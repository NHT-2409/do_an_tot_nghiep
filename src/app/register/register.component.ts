import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast.service';
import { UserService } from '../service/user.service';
import { user } from '../model/user.model';
import { LoadingComponent } from '../loading/loading.component';
import { LoadingService } from '../service/loading.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  hide = true;

  registerForm: any = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    address: ['', Validators.required],
  }, {
    validator: this.passwordMatchValidator
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService,
    private userService: UserService,
    private loginService: LoginService,

  ) {}

  ngOnInit(): void {
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

    this.loginService.getUserInfo( user.email, user.password).subscribe(res => {
      if(res.email != user.email) {
        this.userService.register(user).subscribe(res => {
        }, (err) => {
          switch(err?.error?.text) {
            case 'insert fail': {
              this.toastService.show('Email already exists', 'err');
              break;
            }
            case 'inserted': {
              this.toastService.show('Register successfully!');
              this.router.navigate(['/login']);
              break;
            }
          }
        })
      }
      else {
        this.toastService.show('Email already exists', 'err');
      }
    })


  }

  passwordMatchValidator(formGroup: any) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword').setErrors({ matchPassword: true });
    } else {
      formGroup.get('confirmPassword').setErrors(null);
    }
  }

  return() {
    this.router.navigate(['/login']);
  }
}
