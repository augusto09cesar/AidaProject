/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.cefet.aida.dao;

import br.cefet.aida.model.Turma;

import java.util.List;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

/**
 *
 * @author dougl
 */
@RegisterBeanMapper(Turma.class)
public interface TurmaDao {

    @GetGeneratedKeys
    @SqlUpdate("insert into Turma (idCurso, nome) values (:idCurso, :nome)")
    int insert(@BindBean Turma Turma);

    @SqlQuery("select * from Turma where idTurma = :idTurma;")
    Turma get(@Bind("idTurma") int idTurma);

    @SqlQuery("select * from Turma;")
    List<Turma> getAll();

    @SqlQuery("select * from Turma where idCurso = :idCurso;")
    List<Turma> getAllByCurso(@Bind("idCurso") int idCurso);

    @SqlUpdate("update Turma " +
            " set nome = :nome, " +
            " idCurso = :idCurso " +
            " where idTurma = :idTurma;")
    int update(@BindBean Turma Turma);

    @SqlUpdate("delete from Turma where idTurma = :idTurma;")
    int delete(@Bind("idTurma") int idTurma);
}