import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { MisjuegosComponent } from './componentes/misjuegos/misjuegos.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { RecuperarContraComponent } from './componentes/recuperar-contra/recuperar-contra.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ResenasComponent } from './componentes/resenas/resenas.component';
import { AuthGuard } from './guards/auth.guards';
import { ProfileGuard } from './guards/profile.guards';

const routes: Routes = [  {path:'', component:HomeComponent},
{path:'perfil', component:PerfilComponent, canActivate: [ProfileGuard]},  
{path:'misjuegos', component:MisjuegosComponent, canActivate: [ProfileGuard]},
{path:'resenas', component:ResenasComponent, canActivate: [ProfileGuard]},
{path:'login', component: LoginComponent, canActivate: [AuthGuard]},
{path:'registro', component:RegistroComponent, canActivate: [AuthGuard]},
{path:'recuperar-contrasena', component:RecuperarContraComponent, canActivate: [AuthGuard]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
