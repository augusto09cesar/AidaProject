/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package br.cefet.aida.controller;

import br.cefet.aida.model.Modalidade; 
import br.cefet.aida.service.ModalidadeService; // Updated import statement

import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/modalidade") // Updated API endpoint
public class ModalidadeController { // Updated class name
    
    private final ModalidadeService modalidadeService; // Updated service name
    
    public ModalidadeController(ModalidadeService modalidadeService){ // Updated service name
        this.modalidadeService = modalidadeService;
    }
    
    @GetMapping({"/", ""})
    public List<Modalidade> consultarTodos(){ // Updated return type
        List<Modalidade> modalidadeList = modalidadeService.consultarTodos(); // Updated service method
        return modalidadeList;
    }
    
    @GetMapping("/{idModalidade}")
    public Modalidade consultarModalidade(@PathVariable("idModalidade") int idModalidade){ // Updated parameter name
        Modalidade ret = modalidadeService.consultarPorId(idModalidade); // Updated service method
        return ret;
    }
    
    @PostMapping({"", "/"})
    public Modalidade inserir(@RequestBody Modalidade modalidade){ // Updated parameter type and variable name
        Modalidade ret = modalidadeService.inserir(modalidade); // Updated service method
        return ret;
    }
    
    @PutMapping({"", "/"})
    public Modalidade alterar(@RequestBody Modalidade modalidade){ // Updated parameter type and variable name
        modalidadeService.salvar(modalidade); // Updated service method
        return modalidade;
    }
    
    @DeleteMapping("/{idModalidade}")
    public Modalidade excluir(@PathVariable("idModalidade") int idModalidade){ // Updated method name and parameter name
        Modalidade modalidade = modalidadeService.consultarPorId(idModalidade); // Updated service method
        if (modalidade == null){
            throw new RuntimeException("Nao existe modalidade com este id para ser excluida....");
        }
        modalidadeService.excluir(idModalidade); // Updated service method
        return modalidade;
    }
}
