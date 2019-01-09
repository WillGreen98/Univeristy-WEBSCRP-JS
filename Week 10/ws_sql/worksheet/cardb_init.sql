create database if not exists WEBSCRP;

create table if not exists WEBSCRP.ws_sql_car(
    id int primary key auto_increment,
    reg varchar(8),
    make varchar(20),
    model varchar(30),
    model_year YEAR(4),
    price decimal(9, 2)
);