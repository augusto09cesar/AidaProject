import { Injectable } from '@angular/core';
import { Curso } from '../model/curso';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  HttpHeaders = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  url: string = 'http://localhost:8087/api/v1/curso'

  constructor(private httpClient: HttpClient) { }

  async buscarPorIdCurso(idCurso: number) {
    let urlAuxiliar = this.url + "/" + idCurso;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async excluir(idcurso: number) {
    let urlAuxiliar = this.url + "/" + idcurso;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async inserir(curso: Curso) {
    if (curso.idCurso === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(curso), this.HttpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(curso), this.HttpHeaders).toPromise();
    }
  }
}
