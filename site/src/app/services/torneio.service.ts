import { Injectable } from '@angular/core';
import { Modalidade } from '../model/modalidade';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Torneio } from '../model/torneio';

@Injectable({
  providedIn: 'root'
})
export class TorneioService {
  // constructor(){ }

  // salvar(torneio: torneio): boolean {
  //   let torneios = JSON.parse(localStorage.getItem('torneio') || '[]');

  //   if (torneio.id === 0) {
  //     torneio.id = (new Date().getTime() / 1000) * Math.random();
  //     torneios.push(torneio);
  //   } else {
  //     torneios.splice(torneios.findIndex((elemento: torneio) => elemento.id === torneio.id), 1, torneio);
  //   }
  //   localStorage.setItem('torneio', JSON.stringify(torneios));

  //   return true;
  // }


  // excluir(id: number) {
  //     let torneios = JSON.parse(localStorage.getItem('torneio') || '[]');
  //     torneios.splice(torneios.findIndex((elemento: torneio) => elemento.id === id), 1);
  //     localStorage.setItem('torneio', JSON.stringify(torneios));
  // }

  // listar() {
  //   return JSON.parse(localStorage.getItem('torneio') || '[]');
  // }

  // buscarPorId(id: number) {
  //   return JSON.parse(localStorage.getItem('torneio') || '[]').find((elemento: torneio) => 
  //   elemento.id === id);
  // }

  // HttpHeaders = {
  //   headers: new HttpHeaders({'Content-type': 'application/json'})
  // }

  HttpHeaders = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  url: string = 'http://localhost:8087/api/v1/torneio'

  constructor(private httpClient: HttpClient) { }

  async buscarPorIdtorneio(idTorneio: number) {
    let urlAuxiliar = this.url + "/" + idTorneio;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async excluir(idTorneio: number) {
    let urlAuxiliar = this.url + "/" + idTorneio;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async inserir(torneio: Torneio) {
    if (torneio.idTorneio === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(torneio), this.HttpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(torneio), this.HttpHeaders).toPromise();
    }
  }

  settorneio(torneio: Torneio) {
    localStorage.setItem('torneio', JSON.stringify(torneio));
  }

  gettorneio() {

    let torneio = JSON.parse(localStorage.getItem('torneio') || 'null');
    return torneio;
  }
}
