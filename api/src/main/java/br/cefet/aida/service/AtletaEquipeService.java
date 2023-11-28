/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.cefet.aida.service;

import br.cefet.aida.dao.AtletaEquipeDao;
import br.cefet.aida.model.AtletaEquipe;

import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

/**
 *
 * @author dougl
 */
@Service
public class AtletaEquipeService { // Updated class name

    private final AtletaEquipeDao atletaEquipeDao; // Updated variable name

    public AtletaEquipeService(Jdbi jdbi) {
        this.atletaEquipeDao = jdbi.onDemand(AtletaEquipeDao.class); // Updated variable name
    }

    public AtletaEquipe inserir(AtletaEquipe atletaEquipe) { // Updated parameter type and variable name
        int idAtleta = atletaEquipeDao.insert(atletaEquipe); // Updated variable name
        atletaEquipe.setIdAtletaEquipe(idAtleta); // Updated variable name
        return atletaEquipe; // Updated variable name
    }

    public List<AtletaEquipe> consultarTodos() { // Updated return type
        return atletaEquipeDao.getAll(); // Updated method name
    }

    public List<AtletaEquipe> consultarTodosPorEquipe(int idEquipe) { // Updated return type
        return atletaEquipeDao.getAllByEquipe(idEquipe); // Updated method name
    }

    public AtletaEquipe consultarPorIdEquipeIdAtleta(int idAtleta, int idEquipe) { // Updated parameter type
        return atletaEquipeDao.getByIdEquipeIdAtleta(idAtleta, idEquipe); // Updated method name
    }

    public AtletaEquipe consultarPorId(int idAtletaEquipe) { // Updated parameter type
        return atletaEquipeDao.getById(idAtletaEquipe); // Updated method name
    }


    public void alterar(AtletaEquipe atletaEquipe) { // Updated parameter type and variable name
        atletaEquipeDao.update(atletaEquipe); // Updated variable name
    }

    public void excluir(int idAtletaEquipe) { // Updated parameter type
        atletaEquipeDao.delete(idAtletaEquipe); // Updated variable name
    }

    public void removerAtleta(int idAtleta, int idEquipe) { // Updated parameter type
        atletaEquipeDao.removerAtleta(idAtleta, idEquipe); // Updated variable name
    }
}
