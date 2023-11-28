/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.cefet.aida.service;

import br.cefet.aida.dao.AtletaDao;
import br.cefet.aida.model.Atleta;
import br.cefet.aida.model.Curso;
import br.cefet.aida.model.Turma;

import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

/**
 *
 * @author dougl
 */
@Service
public class AtletaService { // Updated class name

    private final AtletaDao atletaDao; // Updated variable name
    private final CursoService cursoService;
    private final TurmaService turmaService;

    public AtletaService(Jdbi jdbi, CursoService cursoService, TurmaService turmaService) {
        this.atletaDao = jdbi.onDemand(AtletaDao.class); // Updated variable name
        this.cursoService = cursoService;
        this.turmaService = turmaService;
    }

    public Atleta inserir(Atleta atleta) { // Updated parameter type and variable name
        int idAtleta = atletaDao.insert(atleta); // Updated variable name
        atleta.setIdAtleta(idAtleta); // Updated variable name
        return atleta; // Updated variable name
    }

    public List<Atleta> consultarTodosPorEquipe(int idEquipe) {
        List<Atleta> atletaList = atletaDao.getAllByEquipe(idEquipe);

        for (Atleta atleta : atletaList) {
            Curso curso = cursoService.consultarPorId(atleta.getIdCurso());
            atleta.setCurso(curso);

            Turma turma = turmaService.consultarPorId(atleta.getIdTurma());
            atleta.setTurma(turma);
        }

        return atletaList;
    }

    public List<Atleta> consultarTodos() { // Updated return type
        List<Atleta> atletaList = atletaDao.getAll();

        for (Atleta atleta : atletaList) {
            Curso curso = cursoService.consultarPorId(atleta.getIdCurso());
            atleta.setCurso(curso);

            Turma turma = turmaService.consultarPorId(atleta.getIdTurma());
            atleta.setTurma(turma);
        }

        return atletaList;
    }

    public Atleta consultarPorId(int idAtleta) { // Updated parameter type
        Atleta atleta = atletaDao.get(idAtleta); // Updated method name

        if (atleta != null){
            Curso curso = cursoService.consultarPorId(atleta.getIdCurso());
            atleta.setCurso(curso);

            Turma turma = turmaService.consultarPorId(atleta.getIdTurma());
            atleta.setTurma(turma);
        }

        return atleta;
    }

    public void alterar(Atleta atleta) { // Updated parameter type and variable name
        atletaDao.update(atleta); // Updated variable name
    }

    public void excluir(int idAtleta) { // Updated parameter type
        atletaDao.delete(idAtleta); // Updated variable name
    }
}
