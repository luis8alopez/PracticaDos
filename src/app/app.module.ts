import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GramaticasComponent } from './components/gramaticas/gramaticas.component';
import { GramaticaComponent } from './components/gramatica/gramatica.component';
import { FormComponent } from './components/form/form.component';
import { ProduccionComponent } from './components/produccion/produccion.component';

@NgModule({
  declarations: [
    AppComponent,
    GramaticasComponent,
    GramaticaComponent,
    FormComponent,
    ProduccionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
