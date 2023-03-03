create table user
(
    id         int auto_increment
        primary key,
    nome       varchar(255) not null,
    sobrenome  varchar(255) not null,
    telefone   varchar(255) not null,
    email      varchar(255) not null,
    senha      varchar(255) not null,
    cliente_id int          null,
    constraint IDX_e12875dfb3b1d92d7d7c5377e2
        unique (email)
);


create table cliente
(
    id            int auto_increment
        primary key,
    cnpj          varchar(255) not null,
    cep           varchar(255) not null,
    endereco      varchar(255) not null,
    numero        varchar(255) not null,
    complemento   varchar(255) null,
    bairro        varchar(255) not null,
    cidade        varchar(255) not null,
    uf            varchar(255) not null,
    userId        int          null,
    nome_fantasia varchar(255) not null,
    telefone      varchar(255) not null,
    constraint REL_e20981b80ef5571232c163f6a4
        unique (userId),
    constraint FK_e20981b80ef5571232c163f6a4e
        foreign key (userId) references user (id)
);


