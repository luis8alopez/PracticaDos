import { Produccion } from './produccion.model';
import { permutation, onlyUnique, separate, perm } from '../util/functions';

export class Gramatica {
    producciones: Produccion[];
    T: string[] = []
    N: string[] = [];
    NAnulables: string[] = [];
    primerosN: string[] = [];
    siguientesN: string[] = [];
    primerosPorProd: string[] = [];

    constructor(producciones: Produccion[], N: string[], T: string[]) {
        this.producciones = producciones;
        this.NAnulables = this.producciones.filter(produccion => produccion.ladoDerecho === '@').map((produccion) => produccion.ladoIzquierdo);
        this.N = N;
        this.T = T;
    }

    getNAnulables() {
        return this.NAnulables;
    }

    esAnulable(N: string): boolean {
        return this.NAnulables.includes(N);
    }

    esTerminal(symbol: string): boolean {
        return this.T.includes(symbol);
    }

    esNoTerminal(symbol: string): boolean {
        return this.N.includes(symbol);
    }
    esNoTerminalInicial(N: string): boolean {
        return this.producciones[0].ladoIzquierdo === N;
    }

    getPrimerosN(N: string) {
        let primeros = [];
        let ldsp = this.producciones.filter(p => N === p.ladoIzquierdo).map(p => p.ladoDerecho);
        let ladosDerechos = ldsp.map(separate);
        for (let i = 0; i < ladosDerechos.length; i++) {
            const ladoDerecho = ladosDerechos[i];
            if (this.esTerminal(ladoDerecho[0])) primeros.push(ladoDerecho[0]);
            if (this.esNoTerminal(ladoDerecho[0])) {
                if (N === ladoDerecho[0]) continue;
                if (!this.esAnulable(ladoDerecho[0])) {
                    primeros.concat(this.getPrimerosN(ladoDerecho[0]));
                } else {
                    let ntac = [];
                    let j = 0;
                    while (this.esAnulable(ladoDerecho[j]) && ntac.length <= ladoDerecho.length) {
                        if (N === ladoDerecho[j]) continue;
                        ntac.push(ladoDerecho[j]);
                        j++;
                    }
                    let siguiente = ladoDerecho[j];
                    if (this.esTerminal(siguiente)) primeros.push(siguiente);
                    if (this.esNoTerminal(siguiente) && siguiente !== N) ntac.push(siguiente);
                    primeros.concat(ntac.map(nt => this.getPrimerosN(nt)));
                }
            }
        }
        this.primerosN = this.primerosN.concat(primeros);
        this.primerosN = [].concat.apply([], this.primerosN);
        primeros = [].concat.apply([], primeros);
        return this.primerosN.filter(onlyUnique);
    }
    primeros(nt: string): string[] {
        this.primerosN = [];
        return this.getPrimerosN(nt);
    }
    getPrimerosPorProduccion(prodNumb: number): string[] {
        let primeros = []
        let prod = this.producciones.find(prod => prod.numero === prodNumb);
        let ladoDerecho = separate(prod.ladoDerecho);
        if (ladoDerecho[0] === '@') {
            return [];
        }
        if (this.esTerminal(ladoDerecho[0])) {
            primeros.push(ladoDerecho[0]);
        }
        if (this.esNoTerminal(ladoDerecho[0])) {
            if (!this.esAnulable(ladoDerecho[0])) {
                if (prod.ladoIzquierdo === ladoDerecho[0]) return this.primeros(ladoDerecho[0]);
                primeros.concat(this.primeros(ladoDerecho[0]));
            }
            if (this.esAnulable(ladoDerecho[0])) {
                let ntac = [];
                let j = 0;
                while (this.esAnulable(ladoDerecho[j]) && ntac.length <= ladoDerecho.length) {
                    ntac.push(ladoDerecho[j]);
                    j++;
                }
                let siguiente = ladoDerecho[j];
                if (this.esTerminal(siguiente)) primeros.push(siguiente);
                if (this.esNoTerminal(siguiente) && siguiente !== prod.ladoIzquierdo) ntac.push(siguiente);
                ntac.forEach(nt => {
                    let p = this.primeros(nt);
                    primeros.push(p);
                });
            }
        }
        this.primerosPorProd = this.primerosPorProd.concat(primeros);
        this.primerosPorProd = [].concat.apply([], this.primerosPorProd);
        primeros = [].concat.apply([], primeros);
        return this.primerosPorProd.filter(onlyUnique);
    }

    getPrimerosPorProdGlobal(number: number): string[] {
        this.primerosPorProd = [];
        return this.getPrimerosPorProduccion(number);
    }

    getSiguientesN(N: string): string[] {
        let siguientes = [];
        let prods = this.producciones.filter(p => p.ladoDerecho.includes(N));
        let ldsp = prods.map(p => p.ladoDerecho);
        let ladosDerechos = ldsp.map(separate);
        if (this.esNoTerminalInicial(N)) {
            siguientes.push('/');
        }
        for (let i = 0; i < ladosDerechos.length; i++) {
            let ladoDerecho = ladosDerechos[i];
            let ladoDerechoIdx = ladosDerechos[i].indexOf(N);
            if (ladoDerecho[ladoDerechoIdx + 1] === undefined) {
                //Esta al final del lado derecho
                if (prods[i].ladoIzquierdo === ladoDerecho[ladoDerechoIdx]) {
                    //siguentes(<S>) = siguentes(<S>)
                    console.log('IGUALES');
                    continue;
                }
                if (prods[i].ladoIzquierdo !== ladoDerecho[ladoDerechoIdx]) {
                    //siguentes(<A>) = siguentes(<S>)
                    console.log('DIFERENTES');
                    siguientes.concat(this.siguientes(prods[i].ladoIzquierdo));
                }
            }

            if (this.esTerminal(ladoDerecho[ladoDerechoIdx + 1])) {
                siguientes.push(ladoDerecho[ladoDerechoIdx + 1]);
            }
            if (this.esNoTerminal(ladoDerecho[ladoDerechoIdx + 1])) {
                if (!this.esAnulable(ladoDerecho[ladoDerechoIdx + 1])) {
                    siguientes.push(this.primeros(N));
                }
                if (this.esAnulable(ladoDerecho[ladoDerechoIdx + 1])) {
                    let ntac = [];
                    let j = ladoDerechoIdx + 1;
                    while (this.esAnulable(ladoDerecho[j]) && j <= ladoDerecho.length) {
                        if (N === ladoDerecho[j]) {
                            j++
                            continue;
                        }
                        ntac.push(ladoDerecho[j]);
                        j++;
                    }
                    let siguiente = ladoDerecho[j];
                    if (this.esTerminal(siguiente)) siguientes.push(siguiente);
                    if (this.esNoTerminal(siguiente) && siguiente !== N) ntac.push(siguiente);
                    siguientes.concat(ntac.map(nt => this.getPrimerosN(nt)));
                }
            }
        }

        this.siguientesN = this.siguientesN.concat(siguientes);
        this.siguientesN = [].concat.apply([], this.siguientesN);
        siguientes = [].concat.apply([], siguientes);
        return this.siguientesN.filter(onlyUnique);
    }

    siguientes(noTerminal: string): string[] {
        this.siguientesN = [];
        return this.getSiguientesN(noTerminal);
    }
    getConjuntoSeleccion(): any[] {
        let conjSeleccion = [];
        this.producciones.forEach(produccion => {
            conjSeleccion.push({
                numero: produccion.numero,
                seleccion: this.getPrimerosPorProdGlobal(produccion.numero)
            });
        });
        return conjSeleccion;
    }
}