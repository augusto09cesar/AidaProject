import { Injectable } from '@angular/core';
import { Atleta } from '../model/atleta';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AtletaService {

  // constructor(){ }

  // salvar(atleta: Atleta): boolean {
  //   let atletas = JSON.parse(localStorage.getItem('atleta') || '[]');

  //   if (atleta.idAtleta === 0) {
  //     atleta.idAtleta = (new Date().getTime() / 1000) * Math.random();
  //     atletas.push(atleta);
  //   } else {
  //     atletas.splice(atletas.findIndex((elemento: Atleta) => elemento.idAtleta === atleta.idAtleta), 1, atleta);
  //   }
  //   localStorage.setItem('atleta', JSON.stringify(atletas));
    
  //   return true;
  // } 


  // excluir(idAtleta: number) {
  //     let atletas = JSON.parse(localStorage.getItem('atleta') || '[]');
  //     atletas.splice(atletas.findIndex((elemento: Atleta) => elemento.idAtleta === idAtleta), 1);
  //     localStorage.setItem('atleta', JSON.stringify(atletas));
  // }

  // listar() {
  //   return JSON.parse(localStorage.getItem('atleta') || '[]');
  // }

  // buscarPoridAtleta(idAtleta: number) {
  //   return JSON.parse(localStorage.getItem('atleta') || '{}').find((elemento: Atleta) => elemento.idAtleta === idAtleta);
  // }


  HttpHeaders = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  url: string = 'http://localhost:8087/api/v1/atleta'

  constructor(private httpClient: HttpClient) { }

  async buscarPoridAtleta(idAtleta: number){
    let urlAuxiliar = this.url + "/" + idAtleta;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async excluir(idAtleta: number){
    let urlAuxiliar = this.url + "/" + idAtleta;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar(){
    return await this.httpClient.get(this.url).toPromise();
  }

  async listarPorEquipe(idEquipe: number){
    let urlAuxiliar = this.url + "/equipe/" + idEquipe;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async inserir(atleta: Atleta){

    if(atleta.idAtleta === 0){
      return await this.httpClient.post(this.url, JSON.stringify(atleta), this.HttpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(atleta), this.HttpHeaders).toPromise();
    }
  }

  setAtleta(atleta: Atleta){
    localStorage.setItem('atleta', JSON.stringify(atleta));
  }

  getAtleta(){
    let atleta = JSON.parse(localStorage.getItem('atleta') || 'null');
    return atleta;
  }
}
