/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.cefet.aida.service;

import br.cefet.aida.dao.TurmaDao;
import br.cefet.aida.model.Turma;
import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

/**
 *
 * @author dougl
 */
@Service
public class TurmaService { // Updated class name
    
    private final TurmaDao turmaDao; // Updated variable name
    
    public TurmaService(Jdbi jdbi){
        this.turmaDao = jdbi.onDemand(TurmaDao.class); // Updated variable name
    }
    
    public Turma inserir (Turma turma){ // Updated parameter type and variable name
        int idTurma = turmaDao.insert(turma); // Updated variable name
        turma.setIdTurma(idTurma); // Updated variable name
        return turma; // Updated variable name
    }
    
    public List<Turma> consultarTodosPorCurso(int idCurso){
        return turmaDao.getAllByCurso(idCurso);
    }

    public List<Turma> consultarTodos(){ // Updated return type
        return turmaDao.getAll(); // Updated method name
    }
    
    public Turma consultarPorId(int idTurma){ // Updated parameter type
        return turmaDao.get(idTurma); // Updated method name
    }
    
    public void alterar(Turma turma){ // Updated parameter type and variable name
        turmaDao.update(turma); // Updated variable name
    }
    
    public void excluir(int idTurma){ // Updated parameter type
        turmaDao.delete(idTurma); // Updated variable name
    }
}
