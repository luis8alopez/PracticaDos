import { Injectable } from '@angular/core';
import { Gramatica } from '../models/gramatica.model';
import { separate } from '../util/functions';
@Injectable({
  providedIn: 'root'
})
export class GramaticasService {
  gramaticas: Gramatica[] = [];
  N1 = ['<A>', '<B>', '<C>', '<D>', '<E>'];
  T1 = ['a', 'b', 'c', 'd', 'e', 'f'];
  NA1 = ['<B>', '<D>', '<E>'];
  gramatica1 = new Gramatica([
    { numero: 1, ladoIzquierdo: '<A>', ladoDerecho: 'a<B><C>' },
    { numero: 2, ladoIzquierdo: '<A>', ladoDerecho: '<D>b<A>' },
    { numero: 3, ladoIzquierdo: '<B>', ladoDerecho: '@' },
    { numero: 4, ladoIzquierdo: '<B>', ladoDerecho: 'b<A><B>' },
    { numero: 5, ladoIzquierdo: '<C>', ladoDerecho: 'c<C>' },
    { numero: 6, ladoIzquierdo: '<C>', ladoDerecho: '<D>d<B>' },
    { numero: 7, ladoIzquierdo: '<D>', ladoDerecho: '@' },
    { numero: 8, ladoIzquierdo: '<D>', ladoDerecho: 'e<E>' },
    { numero: 9, ladoIzquierdo: '<E>', ladoDerecho: '<B><D>' },
    { numero: 10, ladoIzquierdo: '<E>', ladoDerecho: 'f' }
  ], this.N1, this.T1);
  N2 = ['<S>', '<A>'];
  T2 = ['a', 'c'];
  NA2 = ['<S>'];
  gramatica2 = new Gramatica([
    { numero: 1, ladoIzquierdo: '<S>', ladoDerecho: '<S>c' },
    { numero: 2, ladoIzquierdo: '<S>', ladoDerecho: 'c<A>' },
    { numero: 3, ladoIzquierdo: '<S>', ladoDerecho: '@' },
    { numero: 4, ladoIzquierdo: '<A>', ladoDerecho: 'a<A>' },
    { numero: 5, ladoIzquierdo: '<A>', ladoDerecho: 'a' }
  ], this.N2, this.T2)
  N3 = ['<S>', '<A>', '<B>', '<C>', '<D>', '<F>'];
  T3 = ['a', 'p', 'q', 'b', 'd', 'r', 'f', 'g'];
  NA3 = ['<A>', '<C>', '<D>', '<F>'];
  gramatica3 = new Gramatica([
    { numero: 1, ladoIzquierdo: '<S>', ladoDerecho: '<A><B><C><D>' },
    { numero: 2, ladoIzquierdo: '<A>', ladoDerecho: 'a<A>p' },
    { numero: 3, ladoIzquierdo: '<A>', ladoDerecho: '@' },
    { numero: 4, ladoIzquierdo: '<B>', ladoDerecho: '<B>q' },
    { numero: 5, ladoIzquierdo: '<B>', ladoDerecho: 'b' },
    { numero: 6, ladoIzquierdo: '<C>', ladoDerecho: '<A><F>' },
    { numero: 7, ladoIzquierdo: '<D>', ladoDerecho: 'd<D>r' },
    { numero: 8, ladoIzquierdo: '<D>', ladoDerecho: '@' },
    { numero: 9, ladoIzquierdo: '<F>', ladoDerecho: 'f<F>g' },
    { numero: 10, ladoIzquierdo: '<F>', ladoDerecho: '@' },
  ], this.N3, this.T3);

  N4 = ['<S>', '<A>', '<B>'];
  T4 = ['a', 'b'];
  NA4 = ['<A>', '<B>'];
  gramatica4 = new Gramatica([
    { numero: 1, ladoIzquierdo: '<S>', ladoDerecho: '<A><S><B>' },
    { numero: 2, ladoIzquierdo: '<S>', ladoDerecho: 'a' },
    { numero: 3, ladoIzquierdo: '<A>', ladoDerecho: 'a<A>' },
    { numero: 4, ladoIzquierdo: '<A>', ladoDerecho: '@' },
    { numero: 5, ladoIzquierdo: '<B>', ladoDerecho: 'b<B>' },
    { numero: 6, ladoIzquierdo: '<B>', ladoDerecho: '@' }
  ], this.N4, this.T4);

  constructor() {
    this.gramatica1.NAnulables = this.NA1;
    this.gramatica2.NAnulables = this.NA2;
    this.gramatica3.NAnulables = this.NA3;
    this.gramatica4.NAnulables = this.NA4;
    this.gramaticas = [this.gramatica1, this.gramatica2, this.gramatica3, this.gramatica4];

    // console.log('GRAMATICA 1');

    // console.log('Primeros <A>', this.gramatica1.primeros('<A>'));
    // console.log('Primeros <B>', this.gramatica1.primeros('<B>'));
    // console.log('Primeros <C>', this.gramatica1.primeros('<C>'));
    // console.log('Primeros <D>', this.gramatica1.primeros('<D>'));
    // console.log('Primeros <E>', this.gramatica1.primeros('<E>'));
    // console.log('Primeros(1)', this.gramatica1.getPrimerosPorProdGlobal(1));
    // console.log('Primeros(2)', this.gramatica1.getPrimerosPorProdGlobal(2));
    // console.log('Primeros(3)', this.gramatica1.getPrimerosPorProdGlobal(3));
    // console.log('Primeros(4)', this.gramatica1.getPrimerosPorProdGlobal(4));
    // console.log('Primeros(5)', this.gramatica1.getPrimerosPorProdGlobal(5));
    // console.log('Primeros(6)', this.gramatica1.getPrimerosPorProdGlobal(6));
    // console.log('Primeros(7)', this.gramatica1.getPrimerosPorProdGlobal(7));
    // console.log('Primeros(8)', this.gramatica1.getPrimerosPorProdGlobal(8));
    // console.log('Primeros(9)', this.gramatica1.getPrimerosPorProdGlobal(9));
    // console.log('Primeros(10)', this.gramatica1.getPrimerosPorProdGlobal(10));

    // console.log('GRAMATICA 2');

    // console.log('Primeros <A>', this.gramatica2.primeros('<A>'));
    // console.log('Primeros <S>', this.gramatica2.primeros('<S>'));
    // console.log('Primeros(1)', this.gramatica2.getPrimerosPorProdGlobal(1));
    // console.log('Primeros(2)', this.gramatica2.getPrimerosPorProdGlobal(2));
    // console.log('Primeros(3)', this.gramatica2.getPrimerosPorProdGlobal(3));
    // console.log('Primeros(4)', this.gramatica2.getPrimerosPorProdGlobal(4));
    // console.log('Primeros(5)', this.gramatica2.getPrimerosPorProdGlobal(5));

    // console.log('GRAMATICA 3');
    // console.log('Primeros <S>', this.gramatica3.primeros('<S>'));
    // console.log('Primeros <A>', this.gramatica3.primeros('<A>'));
    // console.log('Primeros <B>', this.gramatica3.primeros('<B>'));
    // console.log('Primeros <C>', this.gramatica3.primeros('<C>'));
    // console.log('Primeros <D>', this.gramatica3.primeros('<D>'));
    // console.log('Primeros <F>', this.gramatica3.primeros('<F>'));
    // console.log('Primeros(1)', this.gramatica3.getPrimerosPorProdGlobal(1));
    // console.log('Primeros(2)', this.gramatica3.getPrimerosPorProdGlobal(2));
    // console.log('Primeros(3)', this.gramatica3.getPrimerosPorProdGlobal(3));
    // console.log('Primeros(4)', this.gramatica3.getPrimerosPorProdGlobal(4));
    // console.log('Primeros(5)', this.gramatica3.getPrimerosPorProdGlobal(5));
    // console.log('Primeros(6)', this.gramatica3.getPrimerosPorProdGlobal(6));
    // console.log('Primeros(7)', this.gramatica3.getPrimerosPorProdGlobal(7));
    // console.log('Primeros(8)', this.gramatica3.getPrimerosPorProdGlobal(8));
    // console.log('Primeros(9)', this.gramatica3.getPrimerosPorProdGlobal(9));
    // console.log('Primeros(10)', this.gramatica3.getPrimerosPorProdGlobal(10));

    // console.log('GRAMATICA 4');

    // console.log('Primeros <S>', this.gramatica4.primeros('<S>'));
    // console.log('Primeros <A>', this.gramatica4.primeros('<A>'));
    // console.log('Primeros <B>', this.gramatica4.primeros('<B>'));
    // console.log('Primeros(1)', this.gramatica4.getPrimerosPorProdGlobal(1));
    // console.log('Primeros(2)', this.gramatica4.getPrimerosPorProdGlobal(2));
    // console.log('Primeros(3)', this.gramatica4.getPrimerosPorProdGlobal(3));
    // console.log('Primeros(4)', this.gramatica4.getPrimerosPorProdGlobal(4));
    // console.log('Primeros(5)', this.gramatica4.getPrimerosPorProdGlobal(5));
    // console.log('Primeros(6)', this.gramatica4.getPrimerosPorProdGlobal(6));

    // console.log('CONJUNTO DE SELECCION GRAMATICA 1', this.gramatica1.getConjuntoSeleccion());
    //console.log('SIGUIENTES <A>', this.gramatica1.siguientes('<E>'));

  }
  getPrimeros(gramatica: Gramatica): string[] {
    let primerosTotales = [];
    gramatica.N.forEach(NT => {
      primerosTotales.push({
        N: NT,
        primeros: gramatica.primeros(NT)
      })
    });
    return primerosTotales;

  }
  getConjuntoSeleccion(gramatica: Gramatica): any[] {
    return gramatica.getConjuntoSeleccion();
  }
}
