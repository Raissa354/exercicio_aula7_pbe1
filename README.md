
<h1>API de Inventário com Node.js e Express</h1>

Neste projeto foi desenvolvida uma API para controlar um inventário de itens utilizando Node.js, Express e um arquivo dados.json para armazenar as informações. A API permite consultar, adicionar, alterar e excluir itens utilizando os métodos HTTP GET, POST, PUT e DELETE.

<h2>1. Importação do Express e dos dados</h2>

Primeiramente, o Express é importado para possibilitar a criação do servidor e das rotas da aplicação.

const express = require("express");
const inventario = require("../dados.json");


O express é utilizado para criar o servidor e configurar as requisições. Já o dados.json contém os itens cadastrados no inventário.

<h2>2. Estrutura do arquivo JSON</h2>

O arquivo dados.json possui os itens do inventário:

[
  {
    "id": 1,
    "item": "Notebook Dell",
    "local": "Laboratório 01",
    "dataRegistro": "2026-09-01",
    "valor": 3500.00,
    "patrimonio": "PAT-00125"
  },
  {
    "id": 2,
    "item": "Projetor Epson",
    "local": "Sala 03",
    "dataRegistro": "2026-09-03",
    "valor": 2800.00,
    "patrimonio": "PAT-00126"
  }
]


Cada objeto representa um item do inventário. Os dados armazenados são:

id: número de identificação do item;

item: nome do equipamento;

local: local onde o equipamento está;

dataRegistro: data em que foi registrado;

valor: valor do equipamento;

patrimonio: número de patrimônio.

<h2>3. Configuração do Express</h2>

Depois, é criada a aplicação utilizando o Express:

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const porta = 3000;


O express.json() permite que a API receba informações no formato JSON.

O express.urlencoded() permite receber dados enviados por formulários.

A aplicação será executada na porta 3000.

<h2>4. GET — Consultar o inventário</h2>

O método GET é utilizado para consultar os itens cadastrados.

const mostrarInventario = (req, res) => {
    res.send(inventario);
};


Depois, a função é associada à rota principal:

app.get("/", mostrarInventario);


Quando uma requisição GET é feita para:

http://127.0.0.1:3000/


a API retorna todos os itens existentes no inventário.

Exemplo

Ao realizar um GET, a resposta será semelhante a:

[
  {
    "id": 1,
    "item": "Notebook Dell",
    "local": "Laboratório 01",
    "dataRegistro": "2026-09-01",
    "valor": 3500,
    "patrimonio": "PAT-00125"
  }
]

<h2>5. POST — Adicionar um novo item</h2>

O método POST é utilizado para cadastrar um novo item no inventário.

const novoInventario = (req, res) => {
    if (req.body) {

        const novoId = inventario.length > 0
            ? Math.max(...inventario.map(item => item.id)) + 1
            : 1;

        const novoItem = {
            id: novoId,
            ...req.body
        };

        inventario.push(novoItem);

        res.send("Novo Inventario recebido!");
    } else {
        res.send("Erro ao receber pedido no estoque!");
    }
};


A função utiliza req.body para receber os dados enviados pelo usuário.

O código também cria automaticamente um novo id. Para isso, ele verifica o maior ID existente e adiciona 1.

A rota utilizada é:

app.post("/", novoInventario);

Exemplo de POST

Podemos enviar:

{
  "item": "Computador HP",
  "local": "Laboratório 02",
  "dataRegistro": "2026-09-10",
  "valor": 4200,
  "patrimonio": "PAT-00127"
}


A API adicionará esse objeto ao inventário com um novo ID.

<h2>6. PUT — Alterar um item</h2>

O método PUT é utilizado para atualizar os dados de um item existente.

const alterarInventario = (req, res) => {
    const id = req.params.id;
    const dados = req.body;

    inventario.forEach((inventarios) => {
        if(inventarios.id == id) {
            inventarios.item = dados.item;
            inventarios.local = dados.local;
            inventarios.dataRegistro = dados.dataRegistro;
            inventarios.valor = dados.valor;
            inventarios.patrimonio = dados.patrimonio;
        }
    });

    res.send("Pedido atualizado com sucesso");
};


A rota utiliza o id do item:

app.put("/:id", alterarInventario);


Por exemplo:

PUT http://127.0.0.1:3000/1


Nesse caso, o item que possui id = 1 será alterado.

Os novos dados podem ser enviados no corpo da requisição:

{
  "item": "Notebook Dell Atualizado",
  "local": "Laboratório 02",
  "dataRegistro": "2026-09-15",
  "valor": 3800,
  "patrimonio": "PAT-00125"
}


A API procura o item com o ID informado e substitui os dados antigos pelos novos.

<h2>7. DELETE — Excluir um item</h2>

O método DELETE é utilizado para remover um item do inventário.

const excluirInventario = (req, res) => {
    const id = req.params.id;

    inventario.forEach((inventarios, indice) => {
        if(inventarios.id == id){
            inventario.splice(indice, 1);
        }
    });

    res.send("Inventario Excluido do estoque com sucesso!");
};


A rota utilizada é:

app.delete("/:id", excluirInventario);


Para excluir o item de ID 2, por exemplo, podemos fazer:

DELETE http://127.0.0.1:3000/2


A API procura o item correspondente ao ID e utiliza splice() para removê-lo do array.

<h2>8. Rotas da API</h2>

No final do código, todas as operações são configuradas:

app.get("/", mostrarInventario);
app.post("/", novoInventario);
app.delete("/:id", excluirInventario);
app.put("/:id", alterarInventario);


Dessa forma, temos:

Método	Rota	Função
GET	/	Consultar todos os itens
POST	/	Adicionar um novo item
PUT	/:id	Alterar um item
DELETE	/:id	Excluir um item
<h2>9. Inicialização do servidor</h2>

Por último, o servidor é iniciado na porta 3000:

app.listen(porta, () => {
    console.log(`Servidor: http://127.0.0.1:${porta}`);
});


Quando o programa é executado, o servidor fica disponível em:

http://127.0.0.1:3000

<h2>10. Testando a API</h2>

As requisições podem ser testadas utilizando ferramentas como Postman, Insomnia ou outra ferramenta para testar APIs.

Os testes principais são:

GET

GET http://127.0.0.1:3000/


Consulta o inventário.

POST

POST http://127.0.0.1:3000/


Envia os dados de um novo equipamento.

PUT

PUT http://127.0.0.1:3000/1


Altera o equipamento de ID 1.

DELETE

DELETE http://127.0.0.1:3000/1


Exclui o equipamento de ID 1.

<h2>Conclusão></h2>

O projeto utiliza uma API REST simples para realizar o gerenciamento de um inventário. O método GET é responsável pela consulta dos dados, o POST pelo cadastro de novos itens, o PUT pela alteração dos itens existentes e o DELETE pela exclusão.

Com isso, foi possível criar um sistema básico de gerenciamento de estoque utilizando Node.js, Express, JSON e os principais métodos HTTP.

<h2>foto do projeto</h2>
<img width="1696" height="967" alt="Captura de tela 2026-09-29 094410" src="https://github.com/user-attachments/assets/38e931ce-2917-48ef-8531-173f27584d79" />


<br>
<img width="1664" height="927" alt="Captura de tela 2026-09-29 094347" src="https://github.com/user-attachments/assets/4ae182eb-62d8-4735-ba97-38d1c0c9c4c0" />


<br>
<img width="1737" height="977" alt="Captura de tela 2026-09-29 094332" src="https://github.com/user-attachments/assets/ccc88c68-7a10-4246-8dc4-8aab00447783" />


<br>
<img width="595" height="491" alt="Captura de tela 2026-09-29 094251" src="https://github.com/user-attachments/assets/de593f44-60f9-45c0-a53f-840f94e41c6a" />


## 📚 O que estou aprendendo

- Git
- GitHub
- Branches
- Pull Requests
