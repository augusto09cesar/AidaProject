DROP SCHEMA IF EXISTS aidadb;

CREATE SCHEMA IF NOT EXISTS aidadb;

USE aidadb;

CREATE TABLE IF NOT EXISTS Curso (
  idCurso INT(11) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (idCurso)
);

INSERT INTO
  Curso (nome)
VALUES
  ("Desenvolvimento de Sistemas");

INSERT INTO
  Curso (nome)
VALUES
  ("Edificações");

INSERT INTO
  Curso (nome)
VALUES
  ("Química");

INSERT INTO
  Curso (nome)
VALUES
  ("Engenharia da Computação");

INSERT INTO
  Curso (nome)
VALUES
  ("Engenharia Metalúrgica");

INSERT INTO
  Curso (nome)
VALUES
  ("Arquitetura e Urbanismo");

CREATE TABLE IF NOT EXISTS Turma (
  idTurma INT(11) NOT NULL AUTO_INCREMENT,
  idCurso INT(11) NOT NULL,
  nome VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (idTurma),
  CONSTRAINT fk_Turma_Curso FOREIGN KEY (idCurso) REFERENCES Curso (idCurso) ON DELETE CASCADE ON UPDATE NO ACTION
);

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (1, "DS1");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (1, "DS2");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (1, "DS3");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (2, "EDI1");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (2, "EDI2");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (2, "EDI3");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (2, "EDI Noturno");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (3, "QUI1");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (3, "QUI2");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (3, "QUI3");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (4, "EC1");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (4, "EC2");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (4, "EC3");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (4, "EC4");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (4, "EC5");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (4, "EC6");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (4, "EC7");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (4, "EC8");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (4, "EC9");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (4, "EC10");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (5, "EM1");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (5, "EM2");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (5, "EM3");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (5, "EM4");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (5, "EM5");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (5, "EM6");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (5, "EM7");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (5, "EM8");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (5, "EM9");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (5, "EM10");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (6, "ARQ1");

INSERT INTO
  Turma (idCurso, nome)
VALUES
  (6, "ARQ2");

CREATE TABLE IF NOT EXISTS Atleta (
  idAtleta INT(11) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL DEFAULT NULL,
  email VARCHAR(45) NULL DEFAULT NULL,
  cpf VARCHAR(45) NULL DEFAULT NULL,
  idTurma INT(11) DEFAULT NULL,
  idCurso INT (11) NULL DEFAULT NULL,
  PRIMARY KEY (idAtleta),
  
   CONSTRAINT fk_Atleta_Curso FOREIGN KEY (idCurso) REFERENCES Curso (idCurso) ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT fk_Atleta_Turma FOREIGN KEY (idTurma) REFERENCES Turma (idTurma) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Usuario (
  idUsuario INT(11) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL DEFAULT NULL,
  email VARCHAR(45) NULL DEFAULT NULL,
  cpf VARCHAR(45) NULL DEFAULT NULL,
  senha VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (idUsuario)
);

INSERT INTO Usuario (nome, email, cpf, senha) VALUES ("Augusto", "augusto09cesar@gmail.com", "92688278088", "augusto09cesar");
INSERT INTO Usuario (nome, email, cpf, senha) VALUES ("Vitor Nascimento", "n.vithor111@gmail.com", "58843961047", "n.vithor111");

CREATE TABLE IF NOT EXISTS Modalidade (
  idModalidade INT(11) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (idModalidade)
);

CREATE TABLE IF NOT EXISTS Equipe (
  idEquipe INT(11) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL DEFAULT NULL,
  modalidade VARCHAR(45) NULL DEFAULT NULL,
  idModalidade INT(11) NOT NULL,
  PRIMARY KEY (idEquipe, idModalidade),
  CONSTRAINT fk_Equipe_Modalidade FOREIGN KEY (idModalidade) REFERENCES Modalidade (idModalidade) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Torneio (
  idTorneio INT(11) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(45) NULL DEFAULT NULL,
  quantidadeDeEquipes INT(11) NOT NULL,
  iniciado BIT NOT NULL,
  regras VARCHAR(45) NULL DEFAULT NULL,
  idUsuario INT(11) NOT NULL,
  idModalidade INT(11) NOT NULL,
  PRIMARY KEY (idTorneio, idUsuario, idModalidade),
  CONSTRAINT fk_Tusuario_Usuario FOREIGN KEY (idUsuario) REFERENCES Usuario (idUsuario) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_Torneio_Modalidade FOREIGN KEY (idModalidade) REFERENCES Modalidade (idModalidade) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Atleta_Equipe (
  idAtletaEquipe INT(11) NOT NULL auto_increment,
  idAtleta INT(11) NOT NULL,
  idEquipe INT(11) NOT NULL,
  PRIMARY KEY (idAtletaEquipe, idAtleta, idEquipe),
  CONSTRAINT fk_Atleta_has_Equipe_Atleta FOREIGN KEY (idAtleta) REFERENCES Atleta (idAtleta) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT fk_Atleta_has_Equipe_Equipe FOREIGN KEY (idEquipe) REFERENCES Equipe (idEquipe) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Equipe_Torneio (
  idEquipe_Torneio INT(11) NOT NULL AUTO_INCREMENT,
  idEquipe INT(11) NOT NULL,
  idTorneio INT(11) NOT NULL,
  PRIMARY KEY (idEquipe_Torneio, idEquipe, idTorneio),
  CONSTRAINT fk_Equipe_has_Torneio_Equipe FOREIGN KEY (idEquipe) REFERENCES Equipe (idEquipe) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT fk_Equipe_has_Torneio_Torneio FOREIGN KEY (idTorneio) REFERENCES Torneio (idTorneio) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS Jogo(
  idJogo INT(11) NOT NULL AUTO_INCREMENT,
  rodada INT (11) NOT NULL,
  idTorneio INT(11) NOT NULL,
  idEquipeA INT(11) NOT NULL,
  idEquipeB INT(11) NOT NULL,
  idVencedor INT (11) DEFAULT NULL,
  PRIMARY KEY (idJogo, idTorneio, idEquipeA, idEquipeB),
  
  CONSTRAINT fk_Jogo_Torneio FOREIGN KEY (idTorneio) REFERENCES Torneio (idTorneio) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT fk_Jogo_EquipeA FOREIGN KEY (idEquipeA) REFERENCES Equipe (idEquipe) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT fk_Jogo_EquipeB FOREIGN KEY (idEquipeB) REFERENCES Equipe (idEquipe) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT fk_Jogo_Vencedor FOREIGN KEY (idVencedor) REFERENCES Equipe (idEquipe) ON DELETE CASCADE ON UPDATE NO ACTION
);