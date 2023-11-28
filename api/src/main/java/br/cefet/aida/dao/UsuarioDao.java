/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.cefet.aida.dao;

import br.cefet.aida.model.Usuario;
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
@RegisterBeanMapper(Usuario.class)
public interface UsuarioDao {

        @GetGeneratedKeys
        @SqlUpdate("insert into usuario (nome, email, cpf, senha) values (:nome, :email, :cpf, :senha)")
        int insert(@BindBean Usuario usuario);

        @SqlQuery("select * " +
                        " from usuario " +
                        " where idUsuario = :idUsuario;")
        Usuario get(@Bind("idUsuario") int idUsuario);

        @SqlQuery("select * " +
                        " from usuario " +
                        " where email like :email;")
        Usuario getbyemail(@Bind("email") String email);

        @SqlQuery("select * " +
                        " from usuario " +
                        " order by nome;")
        List<Usuario> getAll();

        @SqlQuery("select * " +
                        " from usuario " +
                        " where nome like :nome " +
                        " order by nome;")
        List<Usuario> getAllByName(@Bind("nome") String nome);

        @SqlUpdate("update usuario " +
                        " set nome = :nome, " +
                        "     email = :email, " +
                        "     cpf = :cpf, " +
                        "     senha = :senha " +
                        " where idUsuario = :idUsuario;")
        int update(@BindBean Usuario usuario);

        @SqlUpdate("delete " +
                        " from usuario " +
                        " where idUsuario = :idUsuario;")
        int delete(@Bind("idUsuario") int idUsuario);
}
