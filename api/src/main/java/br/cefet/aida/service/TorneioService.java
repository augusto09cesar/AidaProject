/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.cefet.aida.service;

import br.cefet.aida.dao.TorneioDao;
import br.cefet.aida.model.Modalidade;
import br.cefet.aida.model.Torneio;
import br.cefet.aida.model.Usuario;

import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

/**
 *
 * @author dougl
 */
@Service
public class TorneioService {
    private final TorneioDao torneioDao;
    private final UsuarioService usuarioService;
    private final ModalidadeService modalidadeService;

    public TorneioService(Jdbi jdbi, UsuarioService usuarioService, ModalidadeService modalidadeService) {
        this.torneioDao = jdbi.onDemand(TorneioDao.class);
        this.usuarioService = usuarioService;
        this.modalidadeService = modalidadeService;
    }

    public Torneio inserir(Torneio torneio) {
        int idTorneio = torneioDao.insert(torneio);
        torneio.setIdTorneio(idTorneio);
        return torneio;
    }

    public List<Torneio> consultarTodos() {
        List<Torneio> torneioList = torneioDao.getAll();

        for (Torneio torneio : torneioList) {
            Modalidade modalidade = modalidadeService.consultarPorId(torneio.getIdModalidade());
            torneio.setModalidade(modalidade);

            Usuario usuario = usuarioService.consultarPorId(torneio.getIdUsuario());
            torneio.setUsuario(usuario);
        }

        return torneioList;
    }

    public Torneio consultarPorIdTorneio(int idTorneio) {
        Torneio torneio = torneioDao.get(idTorneio);

        if (torneio != null) {
            Modalidade modalidade = modalidadeService.consultarPorId(torneio.getIdModalidade());
            torneio.setModalidade(modalidade);

            Usuario usuario = usuarioService.consultarPorId(torneio.getIdUsuario());
            torneio.setUsuario(usuario);
        }

        return torneio;
    }

    public void alterar(Torneio Torneio) {
        torneioDao.update(Torneio);
    }

    public void excluir(int idTorneio) {
        torneioDao.delete(idTorneio);
    }
}
