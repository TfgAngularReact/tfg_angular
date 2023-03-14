import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { MisjuegosComponent } from './componentes/misjuegos/misjuegos.component';
import { RouterModule, Routes } from '@angular/router';
import { ResenasComponent } from './componentes/resenas/resenas.component';
import { AngularFireModule } from '@angular/fire/compat';

import { FirestoreModule, provideFirestore,getFirestore } from '@angular/fire/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RecuperarContraComponent } from './componentes/recuperar-contra/recuperar-contra.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastRef, ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PerfilComponent,
    MisjuegosComponent,
    ResenasComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarContraComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
