import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AdjuntarImgDialogComponent } from './adjuntar-img-dialog/adjuntar-img-dialog.component';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  @ViewChild('email', { static: true }) email!: ElementRef<HTMLInputElement>;


  formUsuario: FormGroup;
  id: any;
  usuario: any;
  disableSave: boolean;
  

  constructor(
    private fb: FormBuilder,
    private AuthSvc: FirebaseauthService,
    private firestoreService: FirestoreService,
    private dialog: MatDialog,

  ){
    this.formUsuario = this.fb.group({
      email:['', Validators.required], //Validators.required obliga al usuario a rellenar esos campos
      localizacion:[''],
      bio:[''],
      nickname:['', Validators.required]
     });
     this.disableSave = false;
     this.loadUid()
  }

  loadUid(){
    this.AuthSvc.stateAuth().subscribe((res:any) => {
      if (res!==null){
       this.id=res.uid;
        this.loadUsuario();
      }
    });
  }

  loadUsuario(){
    this.firestoreService.getDoc('Usuarios', this.id).subscribe((data:any)=>{
      this.usuario = data;
      this.formUsuario.get("nickname")?.setValue(this.usuario.nickname);
      this.formUsuario.get("email")?.setValue(this.usuario.email);
      this.formUsuario.get("bio")?.setValue(this.usuario.bio);

    });
  }

  openDialogAddImg(): void {
    const dialogRef = this.dialog.open(AdjuntarImgDialogComponent, {
      width: '500px',
      height: '300px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      console.log('Resultado:', result);
    });
  }

  validarEmail(){
    const email = this.email.nativeElement.value;
    const emailValido = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
    console.log(emailValido);
    if (emailValido) {
      
    } else {

      this.disableSave=true;
    }
  }
  

  guardar(){
    const formValue = this.formUsuario.getRawValue();
    console.log(formValue);
    this.firestoreService.updateDoc(formValue, 'Usuarios', this.usuario.uid)
  }

}
