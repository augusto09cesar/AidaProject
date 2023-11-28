package br.cefet.aida.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 *
 * @author dougl
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EquipeTorneio {
    private int idEquipe_Torneio;
    private int idEquipe;
    private int idTorneio;
}
