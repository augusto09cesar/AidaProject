import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AtletaEquipe } from '../model/atleta-equipe';

@Injectable({
  providedIn: 'root'
})
export class AtletaEquipeService {
  HttpHeaders = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  url: string = 'http://localhost:8087/api/v1/atleta-equipe'

  constructor(private httpClient: HttpClient) { }

  async buscarPorIdEquipe(idEquipe: number) {
    let urlAuxiliar = this.url + "/equipe/" + idEquipe;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async excluir(idAtletaEquipe: number) {
    let urlAuxiliar = this.url + "/" + idAtletaEquipe;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async removerAtleta(idEquipe: number, idAtleta: number) {
    let urlAuxiliar = this.url + "/equipe/" + idEquipe + "/atleta/" + idAtleta;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }


  async listar() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async inserir(atletaEquipe: AtletaEquipe) {

    if (atletaEquipe.idAtletaEquipe === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(atletaEquipe), this.HttpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(atletaEquipe), this.HttpHeaders).toPromise();
    }
  }
}
