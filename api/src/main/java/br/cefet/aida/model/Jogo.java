/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
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
public class Jogo {
    private int idJogo;
    private int idTorneio;
    private int idEquipeA;
    private int rodada;
    private Equipe equipeA;
    private int idEquipeB;
    private Equipe equipeB;
    private int idVencedor;
    private Equipe equipeVencedor;
}
