import { Injectable } from '@angular/core';
import { Turma } from '../model/turma';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  HttpHeaders = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  url: string = 'http://localhost:8087/api/v1/turma'

  constructor(private httpClient: HttpClient) { }

  async buscarPorIdTurma(idTurma: number) {
    let urlAuxiliar = this.url + "/" + idTurma;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async excluir(idTurma: number) {
    let urlAuxiliar = this.url + "/" + idTurma;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async listarPorCurso(idCurso: number) {
    let urlAuxiliar = this.url + "/curso/" + idCurso;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async inserir(turma: Turma) {
    if (turma.idTurma === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(turma), this.HttpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(turma), this.HttpHeaders).toPromise();
    }
  }
}
