CREATE DATABASE receitas;

USE receitas;

CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    ingredientes TEXT NOT NULL
);

-- Exemplos de receitas
INSERT INTO recipes (nome, ingredientes)
VALUES 
('Pizza Margherita', 'tomate, queijo, manjericão'),
('Sanduíche de Queijo', 'pão, queijo, presunto'),
('Salada Caprese', 'tomate, queijo, manjericão, azeite');
