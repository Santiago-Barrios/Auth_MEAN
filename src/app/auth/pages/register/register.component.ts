import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  myForm: FormGroup = this.fb.group({
    name: ['test 2', [Validators.required]],
    email: ['test2@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  save() {

    const { email, name, password } = this.myForm.value;
    this.authService.register(email, name, password).subscribe((res) => {
      if (res === true) {
        this.router.navigateByUrl('dashboard');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res,
        });
      }
    });
  }
}
