import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private alertService: AlertService, private loader: NgxSpinnerService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    this.loader.show();
    this.authService
      .login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .catch((error) => this.alertService.error(error))
      .finally(() => this.loader.hide());
  }
}
