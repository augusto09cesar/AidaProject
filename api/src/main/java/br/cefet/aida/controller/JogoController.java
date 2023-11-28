package br.cefet.aida.controller;

import br.cefet.aida.model.Jogo;
import br.cefet.aida.service.JogoService;

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
@RequestMapping("/api/v1/jogo")
public class JogoController {
    private final JogoService jogoService;

    public JogoController(JogoService jogoService) {
        this.jogoService = jogoService;
    }

    @GetMapping({ "/", "" })
    public List<Jogo> consultarTodos() {
        List<Jogo> jogoList = jogoService.consultarTodos();
        return jogoList;
    }

    @GetMapping("/{idJogo}")
    public Jogo consultarJogo(@PathVariable("idJogo") int idJogo) {
        Jogo ret = jogoService.consultarPorId(idJogo);
        return ret;
    }

    @GetMapping("torneio/{idTorneio}")
    public List<Jogo> consultarJogosPorTorneio(@PathVariable("idTorneio") int idTorneio) {
        List<Jogo> ret = jogoService.consultarPorIdTorneio(idTorneio);
        return ret;
    }

    @GetMapping("torneio/{idTorneio}/rodada/{rodada}")
    public List<Jogo> consultarJogosPorTorneio(@PathVariable("idTorneio") int idTorneio,
            @PathVariable("rodada") int rodada) {
        List<Jogo> ret = jogoService.consultarPorIdTorneioRodada(idTorneio, rodada);
        
        return ret;
    }

    @GetMapping("gerarTorneio/{idTorneio}")
    public void gerarTorneio(@PathVariable("idTorneio") int idTorneio) {
        jogoService.gerarTorneio(idTorneio);
    }

    @PostMapping({ "", "/" })
    public Jogo inserir(@RequestBody Jogo jogo) {
        Jogo ret = jogoService.inserir(jogo);
        return ret;
    }

    @PutMapping({ "", "/" })
    public Jogo alterar(@RequestBody Jogo jogo) {
        jogoService.alterar(jogo);
        return jogo;
    }

    @DeleteMapping("/{idJogo}")
    public Jogo excluir(@PathVariable("idJogo") int idjogo) {
        Jogo jogo = jogoService.consultarPorId(idjogo);
        if (jogo == null) {
            throw new RuntimeException("Não existe jogo com este ID para ser excluído.");
        }
        jogoService.excluir(idjogo);
        return jogo;
    }
}
