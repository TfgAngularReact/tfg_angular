import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { MisjuegosComponent } from './componentes/misjuegos/misjuegos.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ResenasComponent } from './componentes/resenas/resenas.component';

const routes: Routes = [  {path:'', component:HomeComponent},
{path:'perfil', component:PerfilComponent},
{path:'misjuegos', component:MisjuegosComponent},
{path:'resenas', component:ResenasComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
