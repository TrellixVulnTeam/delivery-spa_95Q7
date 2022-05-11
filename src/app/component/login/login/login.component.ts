import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { Login } from 'src/app/core/models/login.model';
import { RotasApp } from 'src/app/shared/enum/rotas-app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroupLogin: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.required]);
  credentials: Login;
  exibirSpinner: boolean;

  constructor(
    private formBuilder: FormBuilder,
     private router: Router,
     public dialogRef: MatDialogRef<LoginComponent>,
     public autenticationService: AuthenticationService
  ) {

  }
  
  ngOnInit(): void {
    this.validations();
  }

  private validations() {
    let emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let numberOnlyRegex: RegExp = /^[0-9]*$/
    let doubleOnlyRegex: RegExp = /^\d{1,2}(\.\d{0,2}){0,1}$/
    this.formGroupLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(emailRegex)]],
      password: [null, [Validators.required]],
    });
  }

  getEmailErrorMessage() {
      return this.email.hasError('required') ? 'Campo obrigatório' :
      this.email.hasError('pattern') ? 'Não é email válido' :
      this.email.hasError('alreadyInUse') ? 'Este email já está sendo usado' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Campo obrigatório' : '';     
}

login() {
  if (this.formGroupLogin.valid) {
    this.exibirSpinner = true
    let cred: Login = this.mapperForm2Aluno();
    this.autenticationService.authenticate(cred)
    .pipe(
      finalize(() => {
          this.exibirSpinner = false  
      })
    )
    .subscribe({
      next: response => {
        this.dialogRef.close();
        this.autenticationService.successfulLogin(response.headers.get('Authorization'));
        this.router.navigate([RotasApp.CATEGORY])
      },
      error: error => {
      }
    });
  }
 }

 private mapperForm2Aluno() {
  let credential: Login = new Login();
  Object.assign(credential, this.formGroupLogin.value);
  return credential;
}

}
