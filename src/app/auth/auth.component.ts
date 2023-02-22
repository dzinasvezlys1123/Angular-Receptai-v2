import { partitionArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLogIn: boolean = true;
  isLoading: boolean = false;
  error: string = '';

  constructor(private authService: AuthService, private route:Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLogIn = !this.isLogIn;
  }

  onSubmit(authForm: NgForm) {
    if (authForm.invalid) {
      return;
    }
    const email = authForm.value.email;
    const pass = authForm.value.password;
    let authObserv!: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLogIn) {
      authObserv = this.authService.login(email, pass);
    } else {
      authObserv = this.authService.singUp(email, pass);
    }

    authObserv.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.route.navigate(["/recipes"]) //when success to login or signup redirect to the recipes
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    authForm.reset();
  }

  onHandelError(){
    this.error = "";    
  }
}
