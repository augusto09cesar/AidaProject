/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.cefet.aida.service;

import java.util.Collections;
import br.cefet.aida.dao.JogoDao;
import br.cefet.aida.model.Equipe;
import br.cefet.aida.model.EquipeTorneio;
import br.cefet.aida.model.Jogo;
import br.cefet.aida.model.Torneio;

import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

/**
 *
 * @author dougl
 */
@Service
public class JogoService { // Updated class name

    private final JogoDao jogoDao; // Updated variable name
    private final EquipeService equipeService;
    private final EquipeTorneioService equipeTorneioService;
    private final TorneioService torneioService;

    public JogoService(Jdbi jdbi, EquipeService equipeService, EquipeTorneioService equipeTorneioService,
            TorneioService torneioService) {
        this.jogoDao = jdbi.onDemand(JogoDao.class); // Updated variable name
        this.equipeService = equipeService;
        this.equipeTorneioService = equipeTorneioService;
        this.torneioService = torneioService;
    }

    public Jogo inserir(Jogo jogo) { // Updated parameter type and variable name
        int idJogo = jogoDao.insert(jogo); // Updated variable name
        jogo.setIdJogo(idJogo); // Updated variable name
        return jogo; // Updated variable name
    }

    public List<Jogo> consultarTodos() { // Updated return type
        List<Jogo> jogoList = jogoDao.getAll();

        for (Jogo jogo : jogoList) {
            Equipe equipeA = equipeService.consultarPorIdEquipe(jogo.getIdEquipeA());
            jogo.setEquipeA(equipeA);

            Equipe equipeB = equipeService.consultarPorIdEquipe(jogo.getIdEquipeB());
            jogo.setEquipeB(equipeB);

            if (jogo.getIdVencedor() != 0) {
                Equipe equipeVencedor = equipeService.consultarPorIdEquipe(jogo.getIdVencedor());
                jogo.setEquipeVencedor(equipeVencedor);
            }
        }

        return jogoList;
    }

    public List<Jogo> consultarPorIdTorneio(int idTorneio) { // Updated return type
        List<Jogo> jogoList = jogoDao.getAllByTorneio(idTorneio);

        for (Jogo jogo : jogoList) {
            Equipe equipeA = equipeService.consultarPorIdEquipe(jogo.getIdEquipeA());
            jogo.setEquipeA(equipeA);

            Equipe equipeB = equipeService.consultarPorIdEquipe(jogo.getIdEquipeB());
            jogo.setEquipeB(equipeB);

            if (jogo.getIdVencedor() != 0) {
                Equipe equipeVencedor = equipeService.consultarPorIdEquipe(jogo.getIdVencedor());
                jogo.setEquipeVencedor(equipeVencedor);
            }
        }

        return jogoList;
    }

    public Jogo consultarPorId(int idJogo) { // Updated parameter type
        Jogo jogo = jogoDao.get(idJogo); // Updated method name

        if (jogo != null) {
            Equipe equipeA = equipeService.consultarPorIdEquipe(jogo.getIdEquipeA());
            jogo.setEquipeA(equipeA);

            Equipe equipeB = equipeService.consultarPorIdEquipe(jogo.getIdEquipeB());
            jogo.setEquipeB(equipeB);

            if (jogo.getIdVencedor() != 0) {
                Equipe equipeVencedor = equipeService.consultarPorIdEquipe(jogo.getIdVencedor());
                jogo.setEquipeVencedor(equipeVencedor);
            }
        }

        return jogo;
    }

    public void alterar(Jogo jogo) { // Updated parameter type and variable name
        jogoDao.update(jogo); // Updated variable name

        Jogo jogoAux;

        int rodada = jogo.getRodada();
        int idTorneio = jogo.getIdTorneio();

        Torneio torneio = torneioService.consultarPorIdTorneio(idTorneio);

        int quantidadeDeEquipes = torneio.getQuantidadeDeEquipes();

        if (!((quantidadeDeEquipes == 2 && rodada == 1) || (quantidadeDeEquipes == 4 && rodada == 2)
                || (quantidadeDeEquipes == 8 && rodada == 3) || (quantidadeDeEquipes == 16 && rodada == 4))) {
            if (jogo.getIdJogo() % 2 == 1) {
                jogoAux = consultarPorId(jogo.getIdJogo() + 1);
            } else {
                jogoAux = consultarPorId(jogo.getIdJogo() - 1);
            }

            if (jogoAux.getIdVencedor() != 0 && jogo.getIdVencedor() != 0) {
                Jogo jogoNovo = new Jogo();
                jogoNovo.setIdEquipeA(jogo.getIdVencedor());
                jogoNovo.setIdEquipeB(jogoAux.getIdVencedor());
                jogoNovo.setIdTorneio(jogoAux.getIdTorneio());
                jogoNovo.setRodada(jogo.getRodada() + 1);

                inserir(jogoNovo);
            }
        }
    }

    public void excluir(int idJogo) { // Updated parameter type
        jogoDao.delete(idJogo); // Updated variable name
    }

    public List<Jogo> consultarPorIdTorneioRodada(int idTorneio, int rodada) {
        List<Jogo> jogoList = jogoDao.getAllByTorneioRodada(idTorneio, rodada);

        for (Jogo jogo : jogoList) {
            Equipe equipeA = equipeService.consultarPorIdEquipe(jogo.getIdEquipeA());
            jogo.setEquipeA(equipeA);

            Equipe equipeB = equipeService.consultarPorIdEquipe(jogo.getIdEquipeB());
            jogo.setEquipeB(equipeB);

            if (jogo.getIdVencedor() != 0) {
                Equipe equipeVencedor = equipeService.consultarPorIdEquipe(jogo.getIdVencedor());
                jogo.setEquipeVencedor(equipeVencedor);
            }
        }

        return jogoList;
    }

    public void gerarTorneio(int idTorneio) {
        List<EquipeTorneio> equipesTorneio = equipeTorneioService.consultarPorIdTorneio(idTorneio);

        Collections.shuffle(equipesTorneio);

        for (int i = 0; i < equipesTorneio.size(); i += 2) {
            if (i + 1 < equipesTorneio.size()) {
                EquipeTorneio equipeA = equipesTorneio.get(i);
                EquipeTorneio equipeB = equipesTorneio.get(i + 1);

                Jogo jogo = new Jogo();
                jogo.setIdEquipeA(equipeA.getIdEquipe());
                jogo.setIdEquipeB(equipeB.getIdEquipe());
                jogo.setIdTorneio(idTorneio);
                jogo.setRodada(1);

                inserir(jogo);
            }
        }
    }
}
