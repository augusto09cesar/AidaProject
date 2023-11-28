import { Injectable } from '@angular/core';
import { Modalidade } from '../model/modalidade';
import { HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ModalidadeService {
  HttpHeaders = {
    headers: new HttpHeaders({'Content-type': 'application/json'})
 }

 url: string = 'http://localhost:8087/api/v1/modalidade'

  constructor(private httpClient: HttpClient) { }

  // constructor(){ }

  

  // salvar(modalidade: Modalidade): boolean {
  //   let modalidades = JSON.parse(localStorage.getItem('modalidade') || '[]');

  //   if (modalidade.id === 0) {
  //     modalidade.id = (new Date().getTime() / 1000) * Math.random();
  //     modalidades.push(modalidade);
  //   } else {
  //     modalidades.splice(modalidades.findIndex((elemento: Modalidade) => elemento.id === modalidade.id), 1, modalidade);
  //   }
  //   localStorage.setItem('modalidade', JSON.stringify(modalidades));
    
  //   return true;
  // }


  // excluir(id: number) {
  //     let modalidades = JSON.parse(localStorage.getItem('modalidade') || '[]');
  //     modalidades.splice(modalidades.findIndex((elemento: Modalidade) => elemento.id === id), 1);
  //     localStorage.setItem('modalidade', JSON.stringify(modalidades));
  // }

  // listar() {
  //   return JSON.parse(localStorage.getItem('modalidade') || '[]');
  // }

  // buscarPorId(id: number) {
  //   return JSON.parse(localStorage.getItem('modalidade') || '{}').find((elemento: Modalidade) => elemento.id === id);
  // }




async buscarPorId(idModalidade: number){
   let urlAuxiliar = this.url + "/" + idModalidade;
   return await this.httpClient.get(urlAuxiliar).toPromise();
 }

async excluir(idModalidade: number){
    let urlAuxiliar = this.url + "/" + idModalidade;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

 async listar(){
   return await this.httpClient.get(this.url).toPromise();
 }

  async inserir(modalidade: Modalidade){

    if(modalidade.idModalidade === 0){
      return await this.httpClient.post(this.url, JSON.stringify(modalidade), this.HttpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(modalidade), this.HttpHeaders).toPromise();
    }
 }



  setModalidade(modalidade: Modalidade){
    localStorage.setItem('modalidade', JSON.stringify(modalidade));
  }

  getModalidade(){
  
    let modalidade = JSON.parse(localStorage.getItem('modalidade') || 'null');
    return modalidade;
  }

}