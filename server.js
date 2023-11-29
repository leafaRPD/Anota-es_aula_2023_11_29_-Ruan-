const express = require('express')
const servidor = express()

servidor.use(express.json())

const nomes = ['Ruan', 'Lucas', 'Rafael']

servidor.get('/nomes', (req, res) => {
    // localhost:3000/nomes ou localhost:3000/nomes?termo=r
    const termoPesquisado = req.query.termo
    // // Com operador ternario
    const nomesFiltrados = termoPesquisado ? nomes.filter(nome => nome.toLowerCase().includes(termoPesquisado.toLowerCase())) : nomes

    res.status(200).send({
        dados: nomesFiltrados
    })
    // // Sem operador ternario
    // if(termoPesquisado){
    //     const nomesFiltrados = nomes.filter(nome => nome.toLowerCase().includes(termoPesquisado.toLowerCase()))
    //     res.status(200).send({
    //         dados: nomesFiltrados
    //     })
    // } else {
    //     res.status(200).send({
    //         dados: nomes
    //     })
    // }
})

servidor.get('/nomes/:indice', (req, res) => {
    // localhost:3000/nomes/1 GET
    const indiceRecebido = req.params.indice
    res.status(200).send({
        dados: nomes[indiceRecebido]
    })
})

servidor.post('/nomes', (req, res) => {
    // localhost:3000/nomes POST com body
    const nome = req.body.nome
    if (nome) {
        nomes.push(nome)
        res.status(201).send({ mensagem: "Registro inserido com sucesso!" })
    } else {
        res.status(400).send({ mensagem: "Favor informar um nome" })
    }
})

servidor.delete('/nomes/:indice', (req, res) => {
    // localhost:3000/nomes/1 DELETE
    const indiceRecebido = req.params.indice
    nomes.splice(indiceRecebido, 1)
    res.status(200).send({ mensagem: "Registro excluido com sucesso" })
})

servidor.put('/nomes/:indice', (req, res) => {
    // localhost:3000/nomes/1 PUT com body
    const indiceRecebido = req.params.indice
    const novoNome = req.body.nome
    nomes.splice(indiceRecebido, 1, novoNome)
    res.status(200).send({ mensagem: "Registro atualizado com sucesso" })
})

servidor.listen(3000, () => console.log('Servidor iniciado'))