/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.cefet.aida.dao;

import br.cefet.aida.model.Jogo;

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
@RegisterBeanMapper(Jogo.class)
public interface JogoDao {

    @GetGeneratedKeys
    @SqlUpdate("insert into Jogo (idTorneio, rodada, idEquipeA, idEquipeB) values (:idTorneio, :rodada, :idEquipeA, :idEquipeB)")
    int insert(@BindBean Jogo Jogo);

    @SqlQuery("select * from Jogo where idJogo = :idJogo;")
    Jogo get(@Bind("idJogo") int idJogo);

    @SqlQuery("select * from Jogo;")
    List<Jogo> getAll();

    @SqlQuery("select * from Jogo where idTorneio = :idTorneio;")
    List<Jogo> getAllByTorneio(@Bind("idTorneio") int idTorneio);

    @SqlQuery("select * from Jogo where idTorneio = :idTorneio and rodada = :rodada;")
    List<Jogo> getAllByTorneioRodada(@Bind("idTorneio") int idTorneio, @Bind("rodada") int rodada);

    @SqlUpdate("update Jogo " +
            " set idVencedor = :idVencedor" +
            " where idJogo = :idJogo;")
    int update(@BindBean Jogo Jogo);

    @SqlUpdate("delete from Jogo where idJogo = :idJogo;")
    int delete(@Bind("idJogo") int idJogo);
}