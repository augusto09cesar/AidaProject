package br.cefet.aida.controller;

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

import br.cefet.aida.model.AtletaEquipe;
import br.cefet.aida.service.AtletaEquipeService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/atleta-equipe")
public class AtletaEquipeController {
    private final AtletaEquipeService atletaEquipeService;

    public AtletaEquipeController(AtletaEquipeService atletaEquipeService) {
        this.atletaEquipeService = atletaEquipeService;
    }

    @GetMapping({ "/", "" })
    public List<AtletaEquipe> consultarTodos() {
        List<AtletaEquipe> atletaList = atletaEquipeService.consultarTodos();
        return atletaList;
    }

    @GetMapping("/equipe/{idEquipe}")
    public List<AtletaEquipe> consultarTodosPorEquipe(@PathVariable("idEquipe") int idEquipe) {
        List<AtletaEquipe> atletaList = atletaEquipeService.consultarTodosPorEquipe(idEquipe);
        return atletaList;
    }

    @GetMapping("/{idAtletaEquipe}")
    public AtletaEquipe consultarAtleta(@PathVariable("idAtletaEquipe") int idAtletaEquipe) {
        AtletaEquipe ret = atletaEquipeService.consultarPorId(idAtletaEquipe);
        return ret;
    }

    @PostMapping({ "", "/" })
    public AtletaEquipe inserir(@RequestBody AtletaEquipe atletaEquipe) {
        AtletaEquipe ret = atletaEquipeService.inserir(atletaEquipe);
        return ret;
    }

    @PutMapping({ "", "/" })
    public AtletaEquipe alterar(@RequestBody AtletaEquipe atletaEquipe) {
        atletaEquipeService.alterar(atletaEquipe);
        return atletaEquipe;
    }

    @DeleteMapping("/{idAtleta}")
    public AtletaEquipe excluir(@PathVariable("idAtleta") int idAtleta) {
        AtletaEquipe atleta = atletaEquipeService.consultarPorId(idAtleta);
        if (atleta == null) {
            throw new RuntimeException("Não existe atleta com este ID para ser excluído.");
        }
        atletaEquipeService.excluir(idAtleta);
        return atleta;
    }

    @DeleteMapping("/equipe/{idEquipe}/atleta/{idAtleta}")
    public AtletaEquipe removerAtleta(@PathVariable("idAtleta") int idAtleta, @PathVariable("idEquipe") int idEquipe) {
        AtletaEquipe atleta = atletaEquipeService.consultarPorIdEquipeIdAtleta(idAtleta, idEquipe);
        if (atleta == null) {
            throw new RuntimeException("Não existe atleta com este ID para ser excluído.");
        }
        atletaEquipeService.removerAtleta(idAtleta, idEquipe);
        return atleta;
    }
}
