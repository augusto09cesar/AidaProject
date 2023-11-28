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
public class Torneio {
    private int idTorneio;
    private String nome;
    private boolean iniciado;
    private int quantidadeDeEquipes;
    private String regras;
    private int idUsuario;
    private int idModalidade;
    private Modalidade modalidade;
    private Usuario usuario;
}
