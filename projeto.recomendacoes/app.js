/// :: Pedro Rodrigues Santos Valle - 01810422
/// :: Heloan José Jacinto Marinho - 02310024

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configura conecção com o banco
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'recomendacao'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão bem-sucedida ao banco de dados.');
    }
});

// Configurar o body-parser para lidar com requisições POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta "Assets"
app.use('/Assets', express.static(path.join(__dirname, 'Assets')));

// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/profile.html'));
});

// Exemplo de rota POST
app.post('/api/recomendacao', (req, res) => {
    const { idPerfilRecomendou, idPerfilRecomendado, idCompetencia } = req.body;
    console.log('Dados recebidos:', { idPerfilRecomendou, idPerfilRecomendado, idCompetencia });

    const sql = 'INSERT INTO recomendacao (idPerfilRecomendou, idPerfilRecomendado, idCompetencia) VALUES (?, ?, ?)';
    const values = [idPerfilRecomendou, idPerfilRecomendado, idCompetencia];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados no banco de dados:', err);
            res.status(500).json({ mensagem: 'Erro ao inserir dados no banco de dados.' });
        } else {
            console.log('Dados inseridos com sucesso.');
            res.status(200).json({ mensagem: 'Solicitação POST recebida com sucesso.' });
        }
    });
});

app.get('/api/recomendacao/:idPerfilRecomendou/:idPerfilRecomendado', (req, res) => {
    const idPerfilRecomendou = req.params.idPerfilRecomendou;
    const idPerfilRecomendado = req.params.idPerfilRecomendado;

    // Consulta os itens da tabela recomendacao com os valores fornecidos
    const sql = 'SELECT * FROM recomendacao WHERE idPerfilRecomendou = ? AND idPerfilRecomendado = ?';
    const values = [idPerfilRecomendou, idPerfilRecomendado];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao consultar dados no banco de dados:', err);
            res.status(500).json({ mensagem: 'Erro ao consultar dados no banco de dados.' });
        } else {
            console.log('Consulta realizada com sucesso.');
            res.status(200).json(result);
        }
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});