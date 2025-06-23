import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';
import {  OnInit } from '@angular/core';


import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControl,  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-test.service';
import { Inject } from '@angular/core';


@Component({
  selector: 'login-component',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, MatDividerModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule , ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogInComponent implements OnInit {

  

  constructor(
    @Inject(AuthService) private authService: AuthService
  ) {}

  LoginForm: FormGroup = new FormGroup({});
  private LoginFormSubmitAttempt: boolean = false;



  title = 'epiSafe-frontEnd';
  hide: boolean = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  ngOnInit() {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  isFieldInvalid(field: string) {
    return (
      (this.LoginForm.get(field)!.valid && this.LoginForm.get(field)!.touched) ||
      (this.LoginForm.get(field)!.untouched && this.LoginFormSubmitAttempt)
    );
  }

  //for testing only
  onSubmit() {
    if (this.LoginForm.valid) {
      this.authService.login(this.LoginForm.value);
    }
    this.LoginFormSubmitAttempt = true;
  }
}
