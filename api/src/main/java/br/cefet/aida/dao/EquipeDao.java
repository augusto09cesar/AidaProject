/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.cefet.aida.dao;

import br.cefet.aida.model.Equipe;
import java.util.List;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(Equipe.class)
public interface EquipeDao {

    @GetGeneratedKeys
    @SqlUpdate("insert into equipe (idEquipe, nome, idModalidade, modalidade) values (:idEquipe, :nome, :idModalidade, :modalidade)")
    int insert(@BindBean Equipe equipe);

    @SqlQuery("select * from equipe where idEquipe = :idEquipe;")
    Equipe get(@Bind("idEquipe") int idEquipe);

    @SqlQuery("select * from equipe order by nome;")
    List<Equipe> getAll();

    @SqlQuery("select * from equipe where nome like :nome order by nome;")
    List<Equipe> getAllByName(@Bind("nome") String nome);

    @SqlUpdate("update equipe set nome = :nome, idModalidade = :idModalidade, modalidade = :modalidade where idEquipe = :idEquipe;")
    int update(@BindBean Equipe equipe);

    @SqlUpdate("delete from equipe where idEquipe = :idEquipe;")
    int delete(@Bind("idEquipe") int idEquipe);

    @SqlQuery("SELECT equipe.* FROM equipe INNER JOIN Equipe_Torneio ON equipe.idEquipe = Equipe_Torneio.idEquipe AND Equipe_Torneio.idTorneio = :idTorneio;")
    List<Equipe> getAllByTorneio(@Bind("idTorneio") int idTorneio);

    @SqlQuery("SELECT equipe.* FROM equipe INNER JOIN Modalidade ON equipe.idModalidade = modalidade.idModalidade AND modalidade.idModalidade = :idModalidade;")
    List<Equipe> getAllByModalidade(@Bind("idModalidade") int idModalidade);
}
