/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.cefet.aida.service;

import br.cefet.aida.dao.EquipeTorneioDao;
import br.cefet.aida.model.EquipeTorneio;
import java.util.List;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Service;

/**
 *
 * @author dougl
 */
@Service
public class EquipeTorneioService {
    private final EquipeTorneioDao equipeTorneioDao; // Updated variable name

    public EquipeTorneioService(Jdbi jdbi) {
        this.equipeTorneioDao = jdbi.onDemand(EquipeTorneioDao.class); // Updated variable name
    }

    public EquipeTorneio inserir(EquipeTorneio equipeTorneio) { // Updated parameter type and variable name
        int idAtleta = equipeTorneioDao.insert(equipeTorneio); // Updated variable name
        equipeTorneio.setIdEquipe_Torneio(idAtleta); // Updated variable name
        return equipeTorneio; // Updated variable name
    }

    public List<EquipeTorneio> consultarTodos() { // Updated return type
        return equipeTorneioDao.getAll(); // Updated method name
    }

    public List<EquipeTorneio> consultarTodosPorTorneio(int idTorneio) { // Updated return type
        return equipeTorneioDao.getAllByToneio(idTorneio); // Updated method name
    }

    public EquipeTorneio consultarPorId(int idEquipeTorneio) { // Updated parameter type
        return equipeTorneioDao.get(idEquipeTorneio); // Updated method name
    }

    public void alterar(EquipeTorneio equipeTorneio) { // Updated parameter type and variable name
        equipeTorneioDao.update(equipeTorneio); // Updated variable name
    }

    public void excluir(int idEquipeTorneio) { // Updated parameter type
        equipeTorneioDao.delete(idEquipeTorneio); // Updated variable name
    }

    public void removerEquipe(int idTorneio, int idEquipe) { // Updated parameter type
        equipeTorneioDao.removerEquipe(idTorneio, idEquipe); // Updated variable name
    }

    public EquipeTorneio consultarPorIdTorneioIdEquipe(int idTorneio, int idEquipe) {
        return equipeTorneioDao.gerByIdTorneioIdEquipe(idTorneio, idEquipe); // Updated method name
    }

    public List<EquipeTorneio> consultarPorIdTorneio(int idTorneio) {
        return equipeTorneioDao.gerByIdTorneio(idTorneio); // Updated method name
    }

    public void removerEquipeTorneio(int idTorneio) {
        equipeTorneioDao.deleteTorneio(idTorneio);
    }
}
