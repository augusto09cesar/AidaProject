import { Curso } from "./curso";
import { Turma } from "./turma";

export class Atleta {
    idAtleta: number;
    nome: string;
    email: string;
    cpf: string;
    idTurma: number;
    turma: Turma;
    idCurso: number;
    curso: Curso;

    constructor() {
        this.idAtleta = 0;
        this.nome = "";
        this.email = "";
        this.cpf = "";
        this.idTurma = 0;
        this.turma = new Turma();
        this.idCurso = 0;
        this.curso = new Curso();
    }
}
