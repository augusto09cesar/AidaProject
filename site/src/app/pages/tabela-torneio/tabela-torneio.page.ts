import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Jogo } from 'src/app/model/jogo';
import { Torneio } from 'src/app/model/torneio';
import { JogoService } from 'src/app/services/jogo.service';
import { TorneioService } from 'src/app/services/torneio.service';

@Component({
  selector: 'app-tabela-torneio',
  templateUrl: './tabela-torneio.page.html',
  styleUrls: ['./tabela-torneio.page.scss'],
})
export class TabelaTorneioPage implements OnInit {
  jogos: Jogo[];
  rodadas: number[];
  rodadaAtual: number;
  torneio: Torneio;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private toastController: ToastController, private alertController: AlertController,
    private torneioService: TorneioService, private jogoService: JogoService, private loadingController: LoadingController) {
    this.jogos = [];
    this.rodadas = [];
    this.torneio = new Torneio();
    this.rodadaAtual = 1;

    this.formGroup = this.formBuilder.group({
      'rodada': ["", Validators.compose([
        Validators.required,
      ])],
    });

    this.jogoService.listarPorTorneioRodada(this.torneio.idTorneio, this.rodadaAtual).then((json) => {
      this.jogos = <Jogo[]>(json);
    });
  }

  ngOnInit() {
  }

  async buscarPorRodada() {
    this.rodadaAtual = this.formGroup.value.rodada;

    await this.jogoService.listarPorTorneioRodada(this.torneio.idTorneio, this.rodadaAtual).then((json) => {
      this.jogos = <Jogo[]>(json);
    });
  }

  async ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.params['id'];

    if (id != null) {
      await this.torneioService.buscarPorIdtorneio(parseInt(id)).then(async (json) => {
        this.torneio = <Torneio>(json);
      });
    }

    let numero = this.torneio.quantidadeDeEquipes;

    console.log(numero);

    if (numero === 2) {
      this.rodadas = [1];
    } else if (numero === 4) {
      this.rodadas = [1, 2];
    } else if (numero === 8) {
      this.rodadas = [1, 2, 3];
    } else {
      this.rodadas = [1, 2, 3, 4];
    }

    await this.jogoService.listarPorTorneioRodada(this.torneio.idTorneio, 1).then((json) => {
      this.jogos = <Jogo[]>(json);
    });

    this.formGroup.get('rodada')?.setValue(1);
  }

  exibirLoader() {
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res) => {
      res.present();
    })
  }

  fecharLoader() {
    setTimeout(() => {
      this.loadingController.dismiss().then(() => {
      }).catch((erro) => {
        console.log('Erro: ', erro)
      });
    }, 1000);
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}
