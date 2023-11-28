package br.cefet.aida.dao;

import br.cefet.aida.model.Torneio;

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
@RegisterBeanMapper(Torneio.class)
public interface TorneioDao {

    @GetGeneratedKeys
    @SqlUpdate("insert into Torneio (nome, quantidadeDeEquipes, regras, idUsuario, idModalidade, iniciado) values (:nome, :quantidadeDeEquipes, :regras, :idUsuario, :idModalidade, :iniciado)")
    int insert(@BindBean Torneio torneio);

    @SqlQuery("select * from Torneio where idTorneio = :idTorneio;")
    Torneio get(@Bind("idTorneio") int idTorneio);

    @SqlQuery("select * from Torneio order by nome;")
    List<Torneio> getAll();

    @SqlQuery("select * from Torneio where nome like :nome order by nome;")
    List<Torneio> getAllByName(@Bind("nome") String nome);

    @SqlUpdate("update Torneio set nome = :nome, iniciado = :iniciado, quantidadeDeEquipes = :quantidadeDeEquipes, regras = :regras, idUsuario = :idUsuario, idModalidade = :idModalidade where idTorneio = :idTorneio;")
    int update(@BindBean Torneio torneio);

    @SqlUpdate("delete from Torneio where idTorneio = :idTorneio;")
    int delete(@Bind("idTorneio") int idTorneio);
}
