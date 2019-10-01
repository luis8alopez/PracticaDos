import { Component, OnInit, Input } from '@angular/core';
import { Produccion } from 'src/app/models/produccion.model';

@Component({
  selector: 'app-produccion',
  template: '<span>{{produccion.numero}}. {{produccion.ladoIzquierdo}} &#8594; {{produccion.ladoDerecho}}<span>'
})
export class ProduccionComponent implements OnInit {
  @Input() produccion: Produccion[];
  constructor() { }
  ngOnInit() { }
}
