/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.cefet.aida.service;

import br.cefet.aida.dao.CursoDao;
import br.cefet.aida.model.Curso;
import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

/**
 *
 * @author dougl
 */
@Service
public class CursoService { // Updated class name
    
    private final CursoDao CursoDao; // Updated variable name
    
    public CursoService(Jdbi jdbi){
        this.CursoDao = jdbi.onDemand(CursoDao.class); // Updated variable name
    }
    
    public Curso inserir (Curso Curso){ // Updated parameter type and variable name
        int idCurso = CursoDao.insert(Curso); // Updated variable name
        Curso.setIdCurso(idCurso); // Updated variable name
        return Curso; // Updated variable name
    }

    public List<Curso> consultarTodos(){ // Updated return type
        return CursoDao.getAll(); // Updated method name
    }
    
    public Curso consultarPorId(int idCurso){ // Updated parameter type
        return CursoDao.get(idCurso); // Updated method name
    }
    
    public void alterar(Curso Curso){ // Updated parameter type and variable name
        CursoDao.update(Curso); // Updated variable name
    }
    
    public void excluir(int idCurso){ // Updated parameter type
        CursoDao.delete(idCurso); // Updated variable name
    }
}
