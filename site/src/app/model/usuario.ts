export class Usuario {

    idUsuario: number;
    nome: string;
    email: string;
    cpf: string;
    senha: string;

    constructor(){
        this.idUsuario = 0;
        this.nome = "";
        this.email = "";
        this.cpf = "";
        this.senha = "";
    }
}