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
public class Atleta {
    private int idAtleta;
    private String nome;
    private String email;
    private String cpf;
    private int idTurma;
    private Turma turma;
    private int idCurso;
    private Curso curso; 
         
}
