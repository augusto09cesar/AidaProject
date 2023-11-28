/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.cefet.aida.service;

import br.cefet.aida.model.Modalidade;

import br.cefet.aida.dao.ModalidadeDao; // Updated import statement

import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

@Service
public class ModalidadeService { // Updated class name
    
    private final ModalidadeDao modalidadeDao; // Updated variable name
    
    public ModalidadeService(Jdbi jdbi){
        this.modalidadeDao = jdbi.onDemand(ModalidadeDao.class); // Updated variable name
    }
    
    public Modalidade inserir(Modalidade modalidade){ // Updated parameter type and variable name
        int idModalidade = modalidadeDao.insert(modalidade); // Updated variable name
        modalidade.setIdModalidade(idModalidade); // Updated variable name
        return modalidade; // Updated variable name
    }
    
    public List<Modalidade> consultarTodos(){ // Updated return type
        return modalidadeDao.getAll(); // Updated method name
    }
    
    public Modalidade consultarPorId(int idModalidade){ // Updated parameter type
        return modalidadeDao.get(idModalidade); // Updated method name
    }
    
    public void salvar(Modalidade modalidade){ // Updated parameter type
        modalidadeDao.update(modalidade); // Updated variable name
    }
    
    public void excluir(int idModalidade){ // Updated parameter type
        modalidadeDao.delete(idModalidade); // Updated variable name
    }
    
}
