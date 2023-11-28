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

import br.cefet.aida.model.EquipeTorneio;
import br.cefet.aida.service.EquipeTorneioService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/equipe-torneio")
public class EquipeTorneioController {
    private final EquipeTorneioService equipeTorneioService;

    public EquipeTorneioController(EquipeTorneioService equipeTorneioService) {
        this.equipeTorneioService = equipeTorneioService;
    }

    @GetMapping({ "/", "" })
    public List<EquipeTorneio> consultarTodos() {
        List<EquipeTorneio> atletaList = equipeTorneioService.consultarTodos();
        return atletaList;
    }

    @GetMapping("/torneio/{idTorneio}")
    public List<EquipeTorneio> consultarTodosPorTorneio(@PathVariable("idTorneio") int idTorneio) {
        List<EquipeTorneio> atletaList = equipeTorneioService.consultarTodosPorTorneio(idTorneio);
        return atletaList;
    }

    @GetMapping("/{idEquipeTorneio}")
    public EquipeTorneio consultaEquipeTorneio(@PathVariable("idEquipeTorneio") int idEquipeTorneio) {
        EquipeTorneio ret = equipeTorneioService.consultarPorId(idEquipeTorneio);
        return ret;
    }

    @PostMapping({ "", "/" })
    public EquipeTorneio inserir(@RequestBody EquipeTorneio equipeTorneio) {
        EquipeTorneio ret = equipeTorneioService.inserir(equipeTorneio);
        return ret;
    }

    @PutMapping({ "", "/" })
    public EquipeTorneio alterar(@RequestBody EquipeTorneio equipeTorneio) {
        equipeTorneioService.alterar(equipeTorneio);
        return equipeTorneio;
    }

    @DeleteMapping("/{idAtleta}")
    public EquipeTorneio excluir(@PathVariable("idEquipe_Torneio") int idEquipe_Torneio) {
        EquipeTorneio equipeTorneio = equipeTorneioService.consultarPorId(idEquipe_Torneio);
        if (equipeTorneio == null) {
            throw new RuntimeException("Não existe atleta com este ID para ser excluído.");
        }
        equipeTorneioService.excluir(idEquipe_Torneio);
        return equipeTorneio;
    }

    @DeleteMapping("/torneio/{idTorneio}/equipe/{idEquipe}")
    public EquipeTorneio removerEquipe(@PathVariable("idTorneio") int idTorneio, @PathVariable("idEquipe") int idEquipe) {
        EquipeTorneio equipeTorneio = equipeTorneioService.consultarPorIdTorneioIdEquipe(idTorneio, idEquipe);
        if (equipeTorneio == null) {
            throw new RuntimeException("Não existe atleta com este ID para ser excluído.");
        }
        equipeTorneioService.removerEquipe(idTorneio, idEquipe);
        return equipeTorneio;
    }

    @DeleteMapping("/torneio/{idTorneio}")
    public List<EquipeTorneio> removerEquipeTorneio(@PathVariable("idTorneio") int idTorneio) {
        List<EquipeTorneio> equipeTorneio = equipeTorneioService.consultarPorIdTorneio(idTorneio);
        if (equipeTorneio == null) {
            throw new RuntimeException("Não existe atleta com este ID para ser excluído.");
        }
        equipeTorneioService.removerEquipeTorneio(idTorneio);
        return equipeTorneio;
    }
}
