package br.cefet.aida.controller;

import br.cefet.aida.model.Turma;
import br.cefet.aida.service.TurmaService;

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
@RequestMapping("/api/v1/turma")
public class TurmaController {
    private final TurmaService turmaService;

    public TurmaController(TurmaService turmaService) {
        this.turmaService = turmaService;
    }

    @GetMapping({ "/", "" })
    public List<Turma> consultarTodos() {
        List<Turma> turmaList = turmaService.consultarTodos();
        return turmaList;
    }

    @GetMapping("/{idTurma}")
    public Turma consultarTurma(@PathVariable("idTurma") int idTurma) {
        Turma ret = turmaService.consultarPorId(idTurma);
        return ret;
    }

    @GetMapping("/curso/{idCurso}")
    public List<Turma> consultarTodosPorCurso(@PathVariable("idCurso") int idCurso) {
        List<Turma> turmaList = turmaService.consultarTodosPorCurso(idCurso);
        return turmaList;
    }

    @PostMapping({ "", "/" })
    public Turma inserir(@RequestBody Turma Turma) {
        Turma ret = turmaService.inserir(Turma);
        return ret;
    }

    @PutMapping({ "", "/" })
    public Turma alterar(@RequestBody Turma Turma) {
        turmaService.alterar(Turma);
        return Turma;
    }

    @DeleteMapping("/{idTurma}")
    public Turma excluir(@PathVariable("idTurma") int idTurma) {
        Turma turma = turmaService.consultarPorId(idTurma);
        if (turma == null) {
            throw new RuntimeException("Não existe Turma com este ID para ser excluído.");
        }
        turmaService.excluir(idTurma);
        return turma;
    }
}
