import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { UserService } from '../service/user.service';
import { LoadingService } from '../service/loading.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUser: any[] = []; // Initialize as an array

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthServiceService,
    private userService: UserService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.authService.userData$.subscribe((userData) => {
      if (userData) {
        this.getUserInfo(userData?.email, userData?.password);
      }
    });
  }

  getUserInfo(email: any, password: any) {
    const user = {
      email: email,
      password: password,
    };

    this.userService.getUserInfo(user).subscribe((res) => {
      if (Array.isArray(res)) {
        this.currentUser = res;
      } else {
        // Nếu phản hồi không phải là mảng, biến nó thành mảng với một phần tử
        this.currentUser = [res];
      }
    });
  }

}



