/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package br.cefet.aida.dao;

import br.cefet.aida.model.Modalidade; 
import java.util.List;
import org.jdbi.v3.sqlobject.config.RegisterBeanMapper;
import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.GetGeneratedKeys;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

@RegisterBeanMapper(Modalidade.class) // Updated entity class
public interface ModalidadeDao { // Updated interface name
    
    @GetGeneratedKeys
    @SqlUpdate("insert into modalidade (idModalidade, nome) values (:idModalidade, :nome)") // Updated table and column names
    int insert(@BindBean Modalidade modalidade);
    
    @SqlQuery("select * from modalidade where idModalidade = :idModalidade") // Updated table name
    Modalidade get(@Bind("idModalidade") int idModalidade);

    @SqlQuery("select * from modalidade order by nome") // Updated table name
    List<Modalidade> getAll();
    
    @SqlUpdate("update modalidade set idModalidade = :idModalidade, nome = :nome where idModalidade = :idModalidade") // Updated table and column names
    int update(@BindBean Modalidade modalidade);
    
    @SqlUpdate("delete from modalidade where idModalidade = :idModalidade") // Updated table name
    int delete(@Bind("idModalidade") int idModalidade);
}
