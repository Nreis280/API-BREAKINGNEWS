#O .get é o metodo HTTP (função) de pegar algo, ou seja é a resposta q vou dar para o usuário, depois da função get tem uma função de callback, q é uma função sendo executada 'atrás' de outra.

Exemplo: app.get('/', function (req, res)

ROTA
   Method HTTP - CRUD (CREAT, READ, UPDATE, DELETE)
     GET - Pega uma info
     POST - Cria uma info
     PUT - Altera toda a info
     PATH - Altera parte da info
     DELETE - Apaga uma info
  exemplo: app.get();

   Name - Um indentificador da rota
      exemplo: app.get('/', function (req, res){});

   Function (callback) - Responsavel por execultar algum comando