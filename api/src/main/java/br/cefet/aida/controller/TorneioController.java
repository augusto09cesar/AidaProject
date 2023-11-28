package br.cefet.aida.controller;

import br.cefet.aida.model.Torneio;
import br.cefet.aida.service.TorneioService;

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
@RequestMapping("/api/v1/torneio")
public class TorneioController {
    private final TorneioService torneioService;

    public TorneioController(TorneioService torneioService) {
        this.torneioService = torneioService;
    }

    @GetMapping({ "/", "" })
    public List<Torneio> consultarTodos() {
        List<Torneio> TorneioList = torneioService.consultarTodos();
        return TorneioList;
    }

    @GetMapping("/{idTorneio}")
    public Torneio consultarTorneio(@PathVariable("idTorneio") int idTorneio) {
        Torneio ret = torneioService.consultarPorIdTorneio(idTorneio);
        return ret;
    }

    @PostMapping({ "", "/" })
    public Torneio inserir(@RequestBody Torneio Torneio) {
        Torneio ret = torneioService.inserir(Torneio);
        return ret;
    }

    @PutMapping({ "", "/" })
    public Torneio alterar(@RequestBody Torneio Torneio) {
        torneioService.alterar(Torneio);
        return Torneio;
    }

    @DeleteMapping("/{idTorneio}")
    public Torneio excluir(@PathVariable("idTorneio") int idTorneio) {
        Torneio Torneio = torneioService.consultarPorIdTorneio(idTorneio);
        if (Torneio == null) {
            throw new RuntimeException("Não existe Torneio com este ID para ser excluída.");
        }
        torneioService.excluir(idTorneio);
        return Torneio;
    }
}
