import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 

  // constructor(){ }

  // salvar(usuario: Usuario): boolean {
  //   let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  //   console.log(usuario);
  //   if (usuario.id === 0) {
  //     usuario.id = (new Date().getTime() / 1000) * Math.random();
  //     usuarios.push(usuario);
  //   } else {
  //     usuarios.splice(usuarios.findIndex((elemento: Usuario) => elemento.id === usuario.id), 1, usuario);

  //     }

  //   localStorage.setItem('usuarios', JSON.stringify(usuarios));

  //   return true;
  // }




  // excluir(id: number) {
  //     let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  //     usuarios.splice(usuarios.findIndex((elemento: Usuario) => elemento.id === id), 1);
  //     localStorage.setItem('usuarios', JSON.stringify(usuarios));
  // }

  // listar() {
  //   return JSON.parse(localStorage.getItem('usuarios') || '[]');
  // }

  // buscarPorId(id: number) {
  //   return JSON.parse(localStorage.getItem('usuarios') || '{}').find((elemento: Usuario) => 
  //   elemento.id === id);
  // }

  // verficarUsuario(email: string, senha: string){
  //   let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]').find((elemento: Usuario) => 
  //   elemento.email === email && elemento.senha === senha);
  //   console.log(usuarios);
  //   if(usuarios != null){
  //     return usuarios;
  //   }else{
  //     return null;
  //   }
  // }



  HttpHeaders = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }

  url: string = 'http://localhost:8087/api/v1/usuario'

  constructor(private httpClient: HttpClient) { }

  async buscarPorId(idUsuario: number) {
    let urlAuxiliar = this.url + "/" + idUsuario;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async excluir(idUsuario: number) {
    let urlAuxiliar = this.url + "/" + idUsuario;
    return await this.httpClient.delete(urlAuxiliar).toPromise();
  }

  async listar() {
    return await this.httpClient.get(this.url).toPromise();
  }

  async verificarEmail(email: string) {
    let urlAuxiliar = this.url + "/verificar/" + email;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async verificarUsuario(email: string, senha: string) {
    let urlAuxiliar = this.url + "/" + email + "/" + senha + "/authenticate";
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

  async acessar(usuario: Usuario) {
    if (usuario.idUsuario === 0) {
      return await this.httpClient.post(this.url, JSON.stringify(usuario), this.HttpHeaders).toPromise();
    } else {
      return await this.httpClient.put(this.url, JSON.stringify(usuario), this.HttpHeaders).toPromise();
    }
  }

  setUser(usuario: Usuario) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }

  getUser() {
    let usuario = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');
    return usuario;
  }

  async logout() {
    localStorage.removeItem('usuarioLogado');
  }

  
  async recuperarSenha(email: String) {
    let urlAuxiliar = this.url + "/recover/" + email;
    return await this.httpClient.get(urlAuxiliar).toPromise();
  }

}
