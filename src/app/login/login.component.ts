import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { CookieService } from 'ngx-cookie-service';
import { user } from '../model/user.model';
import { ToastService } from '../service/toast.service';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  tokenString: string = '';
  email: string = '';
  password: string = '';
  remember: any;

  loginForm: any = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [true]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
    private toastService: ToastService,
    private cookieService: CookieService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {

  }

  register() {
    this.router.navigate(['/register']);
  }


  check_Login() {
    const user: user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.loginService.login(user).subscribe(
      (res: any) => {
        if (res && res.role) {
          if (res.role === 'admin') {
            console.log('User is an admin.');
          } else {
            console.log('User is a regular user.');
          }
        }

        console.log("LoginComponent ~ Response:", res?.status);

        switch(res?.status) {
          case 'invalid': {
            this.toastService.show('User name or password incorrect', 'err');
            break;
          }
          default: {
            this.toastService.show('Login successfully!');
            this.authService.setUserData(user); // Đặt dữ liệu người dùng vào AuthService
            console.log("🚀 ~ LoginComponent ~ res:", user)
            this.router.navigate(['/home']);
            break;
          }
        }
      }
    );
  }
}
