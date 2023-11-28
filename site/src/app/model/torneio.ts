import { Modalidade } from "./modalidade";
import { Usuario } from "./usuario";

export class Torneio {
    idTorneio: number;
    nome: string;
    iniciado: boolean;
    quantidadeDeEquipes: number;
    regras: string;
    idUsuario: number;
    idModalidade: number;
    modalidade: Modalidade;
    usuario: Usuario;

    constructor() {
        this.idTorneio = 0;
        this.nome = "";
        this.iniciado = false;
        this.quantidadeDeEquipes = 0;
        this.regras = "";
        this.idUsuario = 0;
        this.idModalidade = 0;
        this.modalidade = new Modalidade();
        this.usuario = new Usuario();
    }
}
