const express = require('express')
const app = express()


//o .get é o metodo de pegar algo, ou seja é a resposta q vou dar para o usuário, depois da função get tem uma função de callback, q é uma função sendo executada 'atrás' de outra.
app.get('/home', function (req, res)  {
  // quando utilizamos o function e => sem um nome, estamos crinando uma funçõa Callback, que nada mais é do que uma funçao sendo execultada por tras de outra
  res.send('Hello World')
})

app.listen(3000);