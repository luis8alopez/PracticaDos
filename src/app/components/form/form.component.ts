import { Component } from '@angular/core';
import { Produccion } from 'src/app/models/produccion.model';
import { GramaticasService } from 'src/app/services/gramaticas.service';
import { Gramatica } from 'src/app/models/gramatica.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent {
  producciones: Produccion[] = [];
  ladoIzquierdo: string;
  ladoDerecho: string;
  terminal: string;
  noTerminal: string;
  N: string[] = [];
  T: string[] = [];
  constructor(private gramaticasService: GramaticasService, private router: Router) { }

  agregarTerminal() {
    if (!this.terminal) return;
    this.T.push(this.terminal);
    this.terminal = null;
  }

  borrarTerminal(index: number) {
    this.T.splice(index, 1);
  }

  agregarNoTerminal() {
    if (!this.noTerminal) return;
    this.N.push(this.noTerminal);
    this.noTerminal = null;
  }

  borrarNoTerminal(index: number) {
    this.N.splice(index, 1);
  }

  agregarProduccion() {
    if (!this.ladoIzquierdo || !this.ladoDerecho) return;
    const numero = this.producciones.length + 1;
    const produccion: Produccion = { numero, ladoIzquierdo: this.ladoIzquierdo, ladoDerecho: this.ladoDerecho };
    this.producciones.push(produccion);
    this.ladoIzquierdo = null;
    this.ladoDerecho = null;
  }

  borrarProduccion(index: number) {
    this.producciones.splice(index, 1);
  }

  agregarGramatica() {
    const gramatica = new Gramatica(this.producciones, this.N, this.T);
    this.gramaticasService.gramaticas.push(gramatica);
    this.router.navigate(['gramaticas']);
  }
  verGramaticas() {
    this.router.navigate(['gramaticas']);
  }
}
