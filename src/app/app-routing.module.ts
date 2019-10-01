import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { GramaticasComponent } from './components/gramaticas/gramaticas.component';
import { GramaticaComponent } from './components/gramatica/gramatica.component';


const routes: Routes = [
  { path: 'ingresarGramatica', component: FormComponent },
  { path: 'gramaticas', component: GramaticasComponent },
  { path: 'gramatica', component: GramaticaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'ingresarGramatica' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
