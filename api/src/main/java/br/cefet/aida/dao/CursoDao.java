/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.cefet.aida.dao;

import br.cefet.aida.model.Curso;

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
@RegisterBeanMapper(Curso.class)
public interface CursoDao {

    @GetGeneratedKeys
    @SqlUpdate("insert into Curso (nome) values (:nome)")
    int insert(@BindBean Curso curso);

    @SqlQuery("select * from Curso where idCurso = :idCurso;")
    Curso get(@Bind("idCurso") int idCurso);

    @SqlQuery("select * from Curso;")
    List<Curso> getAll();

    @SqlUpdate("update Curso set nome = :nome where idCurso = :idCurso;")
    int update(@BindBean Curso Curso);

    @SqlUpdate("delete from Curso where idCurso = :idCurso;")
    int delete(@Bind("idCurso") int idCurso);
}