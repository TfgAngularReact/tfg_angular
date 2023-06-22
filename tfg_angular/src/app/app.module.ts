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
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';



import { NgxStarsModule } from 'ngx-stars';
import { JugadosComponent } from './componentes/misjuegos/jugados/jugados.component';
import { JuegosLikesComponent } from './componentes/misjuegos/juegos-likes/juegos-likes.component';
import { ListasComponent } from './componentes/listas/listas.component';
import { ListasPerfilComponent } from './componentes/listas/listas-perfil/listas-perfil.component';
import { ListasLikesComponent } from './componentes/listas/listas-likes/listas-likes.component';
import { ListaComponent } from './componentes/lista/lista.component';
import { SettingsComponent } from './componentes/settings/settings.component';
import { ChangePassDialogComponent } from './componentes/settings/change-pass-dialog/change-pass-dialog.component';
import { AdjuntarImgDialogComponent } from './componentes/settings/adjuntar-img-dialog/adjuntar-img-dialog.component';





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
    JugadosComponent,
    JuegosLikesComponent,
    ListasComponent,
    ListasPerfilComponent,
    ListasLikesComponent,
    ListaComponent,
    SettingsComponent,
    ChangePassDialogComponent,
    AdjuntarImgDialogComponent,
  

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
    NgxStarsModule,
    MatGridListModule,
    MatTabsModule,
    MatTooltipModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
