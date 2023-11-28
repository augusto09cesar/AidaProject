package br.cefet.aida.controller;

import br.cefet.aida.model.Equipe;
import br.cefet.aida.service.EquipeService;

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
@RequestMapping("/api/v1/equipe")
public class EquipeController {
    private final EquipeService equipeService;

    public EquipeController(EquipeService equipeService) {
        this.equipeService = equipeService;
    }

    @GetMapping({ "/", "" })
    public List<Equipe> consultarTodos() {
        List<Equipe> equipeList = equipeService.consultarTodos();
        return equipeList;
    }

    @GetMapping("/{idEquipe}")
    public Equipe consultarEquipe(@PathVariable("idEquipe") int idEquipe) {
        Equipe ret = equipeService.consultarPorIdEquipe(idEquipe);
        return ret;
    }

    @PostMapping({ "", "/" })
    public Equipe inserir(@RequestBody Equipe equipe) {
        Equipe ret = equipeService.inserir(equipe);
        return ret;
    }

    @PutMapping({ "", "/" })
    public Equipe alterar(@RequestBody Equipe equipe) {
        equipeService.alterar(equipe);
        return equipe;
    }

    @GetMapping("/torneio/{idTorneio}")
    public List<Equipe> consultarTodosPorTorneio(@PathVariable("idTorneio") int idTorneio) {
        List<Equipe> equipeList = equipeService.consultarTodosPorTorneio(idTorneio);
        return equipeList;
    }

    @GetMapping("/modalidade/{idModalidade}")
    public List<Equipe> consultarTodosPorModalidade(@PathVariable("idModalidade") int idModalidade) {
        List<Equipe> equipeList = equipeService.consultarTodosPorModalidade(idModalidade);
        return equipeList;
    }


    @DeleteMapping("/{idEquipe}")
    public Equipe excluir(@PathVariable("idEquipe") int idEquipe) {
        Equipe equipe = equipeService.consultarPorIdEquipe(idEquipe);
        if (equipe == null) {
            throw new RuntimeException("Não existe equipe com este ID para ser excluída.");
        }
        equipeService.excluir(idEquipe);
        return equipe;
    }
}
