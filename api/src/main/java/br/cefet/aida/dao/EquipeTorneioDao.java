package br.cefet.aida.dao;

import br.cefet.aida.model.EquipeTorneio;

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
@RegisterBeanMapper(EquipeTorneio.class)
public interface EquipeTorneioDao {

    @GetGeneratedKeys
    @SqlUpdate("insert into Equipe_Torneio (idEquipe, idTorneio) values (:idEquipe, :idTorneio)")
    int insert(@BindBean EquipeTorneio equipeTorneio);

    @SqlQuery("select * from Equipe_Torneio where idEquipe_Torneio = :idEquipe_Torneio;")
    EquipeTorneio get(@Bind("idEquipe_Torneio") int idEquipe_Torneio);

    @SqlQuery("select * from Equipe_Torneio;")
    List<EquipeTorneio> getAll();

    @SqlQuery("select * from Equipe_Torneio where idTorneio = :idTorneio;")
    List<EquipeTorneio> getAllByToneio(@Bind("idTorneio") int idTorneio);

    @SqlUpdate("update Equipe_Torneio set idEquipe = :idEquipe, idTorneio = :idTorneio where idEquipe_Torneio = :idEquipe_Torneio;")
    int update(@BindBean EquipeTorneio equipeTorneio);

    @SqlUpdate("delete from Equipe_Torneio where idEquipe_Torneio = :idEquipe_Torneio;")
    int delete(@Bind("idEquipe_Torneio") int idEquipe_Torneio);

    @SqlUpdate("delete from Equipe_Torneio where idEquipe = :idEquipe;")
    int deleteAlteta(@Bind("idEquipe") int idEquipe);
    
    @SqlUpdate("delete from Equipe_Torneio where idTorneio = :idTorneio and idEquipe = :idEquipe;")
    int removerEquipe(@Bind("idTorneio") int idTorneio, @Bind("idEquipe") int idEquipe);

    @SqlQuery("select * from Equipe_Torneio where idTorneio = :idTorneio and idEquipe = :idEquipe;")
    EquipeTorneio gerByIdTorneioIdEquipe(@Bind("idTorneio") int idTorneio, @Bind("idEquipe") int idEquipe);

    @SqlQuery("select * from Equipe_Torneio where idTorneio = :idTorneio;")
    List<EquipeTorneio> gerByIdTorneio(@Bind("idTorneio") int idTorneio);

    @SqlUpdate("delete from Equipe_Torneio where idTorneio = :idTorneio;")
    void deleteTorneio(@Bind("idTorneio") int idTorneio);
}
