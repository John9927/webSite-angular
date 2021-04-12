import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  sign_in_btn: any;
  sign_up_btn: any;
  container: any;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.onSlide();
  }

  RegistrationForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', ],
  });

  LoginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ['', ],
  });

  async onSignIn(email: string, password: string) {
    await this.authService.signin(email, password)
    if(this.authService.isLoggedIn) {
    }
  }

  async onSignUp(email: string, password: string) {
    await this.authService.signup(email, password)
    if (this.authService.isLoggedIn) {
    }
  }

  createUserViaGoogle() {
    this.authService.createUserViaGoogle();
  }

  createUserViaFacebook() {
    this.authService.FacebookAuth();
  }

  onSlide() {
    this.sign_in_btn = document.querySelector("#sign-in-btn");
    this.sign_up_btn = document.querySelector("#sign-up-btn");
    this.container = document.querySelector(".container");
    this.sign_up_btn.addEventListener("click", () => {
      this.container.classList.add("sign-up-mode");
    });

    this.sign_in_btn.addEventListener("click", () => {
      this.container.classList.remove("sign-up-mode");
    });

  }



}
