package br.cefet.aida.controller;

import br.cefet.aida.model.Curso;
import br.cefet.aida.service.CursoService;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/curso")
public class CursoController {
    private final CursoService cursoService;

    public CursoController(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    @GetMapping({ "/", "" })
    public List<Curso> consultarTodos() {
        List<Curso> cursoList = cursoService.consultarTodos();
        return cursoList;
    }

    @GetMapping("/{idCurso}")
    public Curso consultarCurso(@PathVariable("idCurso") int idCurso) {
        Curso ret = cursoService.consultarPorId(idCurso);
        return ret;
    }

    @PostMapping({ "", "/" })
    public Curso inserir(@RequestBody Curso curso) {
        Curso ret = cursoService.inserir(curso);
        return ret;
    }

    @PutMapping({ "", "/" })
    public Curso alterar(@RequestBody Curso curso) {
        cursoService.alterar(curso);
        return curso;
    }

    @DeleteMapping("/{idCurso}")
    public Curso excluir(@PathVariable("idCurso") int idCurso) {
        Curso Curso = cursoService.consultarPorId(idCurso);
        if (Curso == null) {
            throw new RuntimeException("Não existe Curso com este ID para ser excluído.");
        }
        cursoService.excluir(idCurso);
        return Curso;
    }
}
