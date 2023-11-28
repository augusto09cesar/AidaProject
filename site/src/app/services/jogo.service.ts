import { Injectable } from '@angular/core';
import { Jogo } from '../model/jogo';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  HttpHeaders = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  url: string = 'http://localhost:8087/api/v1/jogo'

  constructor(private httpClient: HttpClient) { }

  async buscarPorIdJogo(idJogo: number) {
    let urlAuxiliar = this.url + "/" + idJogo;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async excluir(idJogo: number) {
    let urlAuxiliar = this.url + "/" + idJogo;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async gerarTorneio(idTorneio: number) {
    let urlAuxiliar = this.url + "/gerarTorneio/" + idTorneio;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async listarPorTorneio(idTorneio: number) {
    let urlAuxiliar = this.url + "/torneio/" + idTorneio;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async listarPorTorneioRodada(idTorneio: number, rodada: number) {
    let urlAuxiliar = this.url + "/torneio/" + idTorneio + "/rodada/" + rodada;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async inserir(jogo: Jogo, idVencedor: number) {
    jogo.idVencedor = idVencedor;
    
    if (jogo.idJogo === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(jogo), this.HttpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(jogo), this.HttpHeaders).toPromise();
    }
  }
}
