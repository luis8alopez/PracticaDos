import { Component, OnInit, Input } from '@angular/core';
import { Gramatica } from 'src/app/models/gramatica.model';
import { GramaticasService } from 'src/app/services/gramaticas.service';

@Component({
  selector: 'app-gramatica',
  templateUrl: './gramatica.component.html'
})
export class GramaticaComponent implements OnInit {
  @Input() gramatica: Gramatica;
  conjuntoSeleccion = [];
  constructor(private gramaticasService: GramaticasService) { }
  ngOnInit() {
    this.conjuntoSeleccion = this.gramaticasService.getConjuntoSeleccion(this.gramatica);
    console.log(this.conjuntoSeleccion);

  }
}
