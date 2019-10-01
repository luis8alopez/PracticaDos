import { Component, OnInit } from '@angular/core';
import { GramaticasService } from 'src/app/services/gramaticas.service';
import { Gramatica } from 'src/app/models/gramatica.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gramaticas',
  templateUrl: './gramaticas.component.html'
})
export class GramaticasComponent implements OnInit {
  gramaticas: Gramatica[] = [];
  constructor(private gramaticasService: GramaticasService, private router: Router) {
    this.gramaticas = this.gramaticasService.gramaticas;
    console.log(this.gramaticas);
  }
  ngOnInit() { }

  verForm() {
    this.router.navigate(['form']);
  }

}
