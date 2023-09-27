import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/compat/app';

@Component({
  selector: 'app-change-pass-dialog',
  templateUrl: './change-pass-dialog.component.html',
  styleUrls: ['./change-pass-dialog.component.css']
})
export class ChangePassDialogComponent {
  formContrasena: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AngularFireAuth
    ){
    this.formContrasena = this.fb.group({
      currentPassword:['', Validators.required], //Validators.required obliga al usuario a rellenar esos campos
      newPassword:['', Validators.required],
      repitPass:['', Validators.required]
     });
  }

  async changePassword() {
    const currentPasswordControl = this.formContrasena.get('currentPassword');
    const newPasswordControl = this.formContrasena.get('newPassword');
    let currentPassword = "";
    let newPassword = "";
  
    if (currentPasswordControl && newPasswordControl) {
      currentPassword = currentPasswordControl.value;
      newPassword = newPasswordControl.value;
    }
  
    const user = await this.auth.currentUser;
  
    if (user) {
      try {
        const email = user.email;
        if(email !== null){
          const credentials = firebase.default.auth.EmailAuthProvider.credential(
            email,
            currentPassword
        );
  
        await user.reauthenticateWithCredential(credentials);
        await user.updatePassword(newPassword);
        console.log('Contraseña actualizada exitosamente.');
        }
        else {
          console.error('No se pudo obtener el correo electrónico del usuario.');
        }

      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Usuario no encontrado.');
    }
  }
  
}
