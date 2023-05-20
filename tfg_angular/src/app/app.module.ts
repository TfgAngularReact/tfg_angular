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

import { HttpClientModule } from '@angular/common/http';
import {FlexLayoutModule} from "@angular/flex-layout";
import { JuegoComponent } from './componentes/juego/juego.component';
import { AddListaDialogComponent } from './componentes/add-lista-dialog/add-lista-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field'
import { ResenaDialogComponent } from './componentes/resena-dialog/resena-dialog.component';


import { NgxStarsModule } from 'ngx-stars';





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
    JuegoComponent,
    AddListaDialogComponent,
    ResenaDialogComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    NgxStarsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
