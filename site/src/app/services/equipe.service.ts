import { Injectable } from '@angular/core';
import { Equipe } from '../model/equipe';
import { HttpClient, HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  
  
  // constructor(){ }

  // salvar(equipe: Equipe): boolean {
  //   let equipes = JSON.parse(localStorage.getItem('equipe') || '[]');

  //   if (equipe.id === 0) {
  //     equipe.id = (new Date().getTime() / 1000) * Math.random();
  //     equipes.push(equipe);
  //   } else {
  //     equipes.splice(equipes.findIndex((elemento: Equipe) => elemento.id === equipe.id), 1, equipe);
  //   }
  //   localStorage.setItem('equipe', JSON.stringify(equipes));
    
  //   return true;
  // }


  // excluir(id: number) {
  //     let equipes = JSON.parse(localStorage.getItem('equipe') || '[]');
  //     equipes.splice(equipes.findIndex((elemento: Equipe) => elemento.id === id), 1);
  //     localStorage.setItem('equipe', JSON.stringify(equipes));
  // }

  // listar() {
  //   return JSON.parse(localStorage.getItem('equipe') || '[]');
  // }

  // buscarPorId(id: number) {
  //   return JSON.parse(localStorage.getItem('equipe') || '[]').find((elemento: Equipe) => 
  //   elemento.id === id);
  // }

  // HttpHeaders = {
  //   headers: new HttpHeaders({'Content-type': 'application/json'})
  // }

  HttpHeaders = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  url: string = 'http://localhost:8087/api/v1/equipe'

  constructor(private httpClient: HttpClient) { }

  async buscarPorIdEquipe(idEquipe: number){
    let urlAuxiliar = this.url + "/" + idEquipe;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async listarPorTorneio(idTorneio: number) {
    let urlAuxiliar = this.url + "/torneio/" + idTorneio;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async buscarPorIdModalidade(idModalidade: number) {
    let urlAuxiliar = this.url + "/modalidade/" + idModalidade;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async excluir(idEquipe: number){
    let urlAuxiliar = this.url + "/" + idEquipe;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar(){
    return await this.httpClient.get(this.url).toPromise();
  }

  async inserir(equipe: Equipe){

    console.log(equipe);

    if(equipe.idEquipe === 0){
      return await this.httpClient.post(this.url, JSON.stringify(equipe), this.HttpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(equipe), this.HttpHeaders).toPromise();
    }
  }

  setEquipe(equipe: Equipe){
    localStorage.setItem('equipe', JSON.stringify(equipe));
  }

  getEquipe(){
  
    let equipe = JSON.parse(localStorage.getItem('equipe') || 'null');
    return equipe;
  }
}
