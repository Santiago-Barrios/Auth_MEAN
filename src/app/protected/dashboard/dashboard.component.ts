import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      * {
        margin: 15px;
      }
    `,
  ],
})
export class DashboardComponent {

  get user() {
    return this.authService.user;
  }
  
  constructor( private router: Router,
               private authService: AuthService ) {}
    
  logout(){
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

}
