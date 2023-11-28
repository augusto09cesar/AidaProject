import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { EquipeTorneio } from '../model/equipe-torneio';

@Injectable({
  providedIn: 'root'
})
export class EquipeTorneioService {

  HttpHeaders = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  url: string = 'http://localhost:8087/api/v1/equipe-torneio'

  constructor(private httpClient: HttpClient) { }

  async buscarPorIdTorneio(idTorneio: number) {
    let urlAuxiliar = this.url + "/torneio/" + idTorneio;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async excluir(idEquipeTorneio: number) {
    let urlAuxiliar = this.url + "/" + idEquipeTorneio;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async excluirPorTorneio(idTorneio: number) {
    let urlAuxiliar = this.url + "/torneio/" + idTorneio;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async removerEquipe(idTorneio: number, idEquipe: number) {
    let urlAuxiliar = this.url + "/torneio/" + idTorneio + "/equipe/" + idEquipe;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async inserir(equipeTorneio: EquipeTorneio) {
    if (equipeTorneio.idEquipe_Torneio === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(equipeTorneio), this.HttpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(equipeTorneio), this.HttpHeaders).toPromise();
    }
  }
}
