import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Usuario } from '../../models';
import { Timestamp } from 'firebase/firestore';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registrarUsuario: Usuario = {
    email: "",
    nickname: "",
    uid: "",
    likes: [],
    fechaRegistro: Timestamp.now(),
    listas: [],
    reseñas: [],
    jugados: [],
    seguidos: [],
    seguidores: [],
    img_perfil:"",
    resenas_like: []
  };
  password: string;
  repetirPass: string;
  submitted = false;
  
  constructor(private fb: FormBuilder,
    private AuthSvc: FirebaseauthService,
    private toastr: ToastrService,
    private router: Router,
    private firebaseErrorCode: FirebaseCodeErrorService,
    private db: AngularFireDatabase,
    private firestoreService: FirestoreService
    ){

    this.password = '';
    this.repetirPass = '';

  }

  async registrar(){
    const email = this.registrarUsuario.email;
    const usuario = this.registrarUsuario.nickname;

    if(this.password !== this.repetirPass){
      this.toastr.error('Las constraseñas son distintas', 'Error')
      return; //Si pones el return solo, se para la ejecución del programa
    }

    //Compruebo que los campos no sean vacios
    if(this.registrarUsuario.email && this.registrarUsuario.nickname && this.password && this.repetirPass){
        if((await this.checkIfUsernameExists(usuario))){
              this.toastr.error('El nombre de usuario ya existe');
              return;
            }

            this.AuthSvc.registrar(email, this.password, usuario).then(async (user)=>{

              const uid = await this.AuthSvc.getUid();

              if(uid !== null){
                this.registrarUsuario.uid = uid;
              }
                  //Ahora vamos a coger el uid para guardarlo en la base de datos y tener constancia de los usuarios
            
            this.guardarUser(this.registrarUsuario.uid); // Aqui ya tendriamos el usuario guardado en el modulo de BD


              this.router.navigate(['/']);

            }).catch((error)=>{
              this.toastr.error(this.firebaseErrorCode.firebaseError(error.code), 'Error')});
    }
    else{
      //Lanzo error y paro la ejecución del programa
      this.toastr.error('Debes rellenar todos los campos');
      return;

    }

    
  }






  async guardarUser(uid: string){
    const path ="Usuarios";


    this.firestoreService.createDoc(this.registrarUsuario,path, uid).then(  res=> {
      // Si el objeto se guarda correctamente  nos deberia de cerrar el mensaje de guardando 
        console.log('Usuario Guardado con exito en el modulo de BD')
    } ).catch( error=> {
      console.log("Error sus muerto");
      
    })    ;
    
  }





  async checkIfUsernameExists(username: string) {


    const usernameRef = this.firestoreService.getCollection('Usuarios');
    var query = usernameRef.ref.where("nickname", "==", username);
    console.log(query);
    var res= false;
    query.get()
        .then(function(querySnapshot) {
            if (querySnapshot.empty) {
              res = false;
              console.log("false");
            } else {
              res = true;

            }
        })
        .catch(function(error) {
            console.log("Error al comprobar el nickname:", error);
        });
        console.log(res);
        return res;
  }


}
