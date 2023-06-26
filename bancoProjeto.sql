use recomendacao;

CREATE TABLE recomendacao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idPerfilRecomendou INT NOT NULL,
  idPerfilRecomendado INT NOT NULL,
  idCompetencia INT NOT NULL
);