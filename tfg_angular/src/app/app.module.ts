import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { MisjuegosComponent } from './componentes/misjuegos/misjuegos.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes=[
  {path:'', component:HomeComponent},
  {path:'perfil', component:PerfilComponent},
  {path:'misjuegos', component:MisjuegosComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PerfilComponent,
    MisjuegosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
