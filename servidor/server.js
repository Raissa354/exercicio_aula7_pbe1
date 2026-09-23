const express = require("express");
const inventario = require("../dados.json");

const mostrarInventario = (req, res) => {
    res.send(inventario)
}

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

        res.send("Novo Inventario recebido!")
        inventario.push(req.body)
    } else {
        res.send("Erro ao receber pedido no estoque!")
    }
}

const excluirInventario = (req, res) => {
    const id = req.params.id;

    inventario.forEach((inventarios, indice) => {
        if(inventarios.id == id){
            inventario.splice(indice, 1);
        }
    });

    res.send("Inventario Excluido do estoque com sucesso!")
};

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
    res.send("Pedido atulizado com sucesso");
};

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
const porta = 3000;

app.get("/", mostrarInventario);
app.post("/", novoInventario);
app.delete("/:id", excluirInventario);
app.put("/:id", alterarInventario);

app.listen(porta, () => {
console.log(`Servidor: http://127.0.0.1:${porta}`);
});