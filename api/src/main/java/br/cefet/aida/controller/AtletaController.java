package br.cefet.aida.controller;

import br.cefet.aida.model.Atleta;
import br.cefet.aida.service.AtletaService;

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
@RequestMapping("/api/v1/atleta")
public class AtletaController {
    private final AtletaService atletaService;

    public AtletaController(AtletaService atletaService) {
        this.atletaService = atletaService;
    }

    @GetMapping({ "/", "" })
    public List<Atleta> consultarTodos() {
        List<Atleta> atletaList = atletaService.consultarTodos();
        return atletaList;
    }

    @GetMapping("/{idAtleta}")
    public Atleta consultarAtleta(@PathVariable("idAtleta") int idAtleta) {
        Atleta ret = atletaService.consultarPorId(idAtleta);
        return ret;
    }

    @GetMapping("/equipe/{idEquipe}")
    public List<Atleta> consultarTodosPorEquipe(@PathVariable("idEquipe") int idEquipe) {
        List<Atleta> atletaList = atletaService.consultarTodosPorEquipe(idEquipe);
        return atletaList;
    }

    @PostMapping({ "", "/" })
    public Atleta inserir(@RequestBody Atleta atleta) {
        Atleta ret = atletaService.inserir(atleta);
        return ret;
    }

    @PutMapping({ "", "/" })
    public Atleta alterar(@RequestBody Atleta atleta) {
        atletaService.alterar(atleta);
        return atleta;
    }

    @DeleteMapping("/{idAtleta}")
    public Atleta excluir(@PathVariable("idAtleta") int idAtleta) {
        Atleta atleta = atletaService.consultarPorId(idAtleta);
        if (atleta == null) {
            throw new RuntimeException("Não existe atleta com este ID para ser excluído.");
        }
        atletaService.excluir(idAtleta);
        return atleta;
    }
}
