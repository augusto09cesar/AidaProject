/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.cefet.aida.service;

import br.cefet.aida.dao.EquipeDao;
import br.cefet.aida.model.Equipe;
import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

/**
 *
 * @author dougl
 */
@Service
public class EquipeService { // Updated class name

    private final EquipeDao equipeDao; // Updated variable name

    public EquipeService(Jdbi jdbi) {
        this.equipeDao = jdbi.onDemand(EquipeDao.class); // Updated variable name
    }

    public Equipe inserir(Equipe equipe) { // Updated parameter type and variable name
        int idEquipe = equipeDao.insert(equipe); // Updated variable name
        equipe.setIdEquipe(idEquipe); // Updated variable name
        return equipe; // Updated variable name
    }

    public List<Equipe> consultarTodos() { // Updated return type
        return equipeDao.getAll(); // Updated method name
    }

    public Equipe consultarPorIdEquipe(int idEquipe) { // Updated parameter type
        return equipeDao.get(idEquipe); // Updated method name
    }

    public void alterar(Equipe equipe) { // Updated parameter type and variable name
        equipeDao.update(equipe); // Updated variable name
    }

    public void excluir(int idEquipe) { // Updated parameter type
        equipeDao.delete(idEquipe); // Updated variable name
    }

    public List<Equipe> consultarTodosPorTorneio(int idTorneio) {
        return equipeDao.getAllByTorneio(idTorneio);
    }

    public List<Equipe> consultarTodosPorModalidade(int idModalidade) {
        return equipeDao.getAllByModalidade(idModalidade);
    }

}
