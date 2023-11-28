import { Equipe } from "./equipe";

export class Jogo {
    idJogo: number;
    rodada: number;
    idTorneio: number;
    idEquipeA: number;
    equipeA: Equipe;
    idEquipeB: number;
    equipeB: Equipe;
    idVencedor: number;
    equipeVencedor: Equipe;

    constructor() {
        this.idJogo = 0;
        this.idTorneio = 0;
        this.idEquipeA = 0;
        this.rodada = 0;
        this.equipeA = new Equipe();
        this.idEquipeB = 0;
        this.equipeB = new Equipe;
        this.idVencedor = 0;
        this.equipeVencedor = new Equipe();
    }
}
