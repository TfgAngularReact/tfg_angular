import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginUsuario: FormGroup;
  constructor(
    private fb: FormBuilder,
    private AuthSvc: FirebaseauthService,
    private toastr: ToastrService,
    private router: Router
  ){
    this.loginUsuario = this.fb.group({
      email:['', Validators.required],
      password:['', Validators.required]});
  }

  login(){
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
    this.AuthSvc.login(email,password).then((user)=>{
      console.log(user);
      this.router.navigate(['/']);

    }).catch((error)=>{
      console.log(error);
    });
  }

}
