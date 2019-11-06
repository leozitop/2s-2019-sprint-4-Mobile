create database M_Roman
use M_Roman

--DDL--

create table Usuarios (
IdUsuario int primary key identity,
Email varchar(200) unique not null,
Senha varchar(200) not null,
Nome varchar(200),
Permissao varchar(200));

create table Temas (
IdTema int primary key identity,
Tema varchar(200));

create table Projetos (
IdProjeto int primary key identity,
Projeto varchar(200),
Descricao varchar(200),
IdUsuario int foreign key references Usuarios(IdUsuario),
IdTema int foreign key references Temas(IdTema));




-- DML --

insert into Professores (Nome)
values('Erik'),('Helena'),('Roberto'),('Tsuka'),('César'),('Gabriel')

insert into Usuarios (Nome, Email, Senha, Permissao)
values('Leo','leo@gmail.com','123456', 'COMUM'),('Diego','diego@gmail.com','654321', 'PROFESSOR')

insert into Temas(Tema)
values('HQ'),('Gestão'),('Jogos'),('Cinema'),('Automóveis'),('Alimentos')

insert into Projetos (Projeto, Descricao, IdUsuario, IdTema)
values ('Controle de Estoque','Efetuar o controle do estoque de materiais',1,2),
('Listagem de persongens','Listar os personagens das hqs mais iradas',1,1),
('Campeonato de jogos','Organizar um campeonato de jogos',2,3),
('OpFlix','Listar uma enorme lista de lançamentos',2,4),
('Tsukar','Organizar um estacionamento de carros',1,5),
('Alimentação saudável','Tornar a alimentação saudável',2,6)


-- DQL --

select	Nome, Descricao, from Projetos
join Professores 
on Professores.IdProfessor = Projetos.IdProfessor
join Temas
on Temas.IdTema = Projetos.IdTema

-- DQL --

SELECT Projetos.Projeto, Projetos.Descricao, Temas.Tema, 
Usuarios.Nome
FROM Projetos
FULL JOIN Temas
ON Projetos.IdTema = Temas.IdTema
FULL JOIN Usuarios
ON	Usuarios.IdUsuario = Projetos.IdUsuario

select * from Usuarios

