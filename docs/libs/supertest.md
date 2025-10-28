### Instalar SuperTest via npm

Fonte: https://github.com/ladjs/supertest/blob/master/README.md

Este comando instala a biblioteca SuperTest como dependência de desenvolvimento no seu projeto usando npm.

```Bash
npm install supertest --save-dev
```

--------------------------------

### Testando endpoint GET com SuperTest (básico)

Fonte: https://github.com/ladjs/supertest/blob/master/README.md

Exemplo básico de uso do SuperTest com uma aplicação Express. Define um endpoint GET simples e usa `request()` para enviar a requisição, afirmar cabeçalhos e status da resposta e tratar o resultado via callback.

```javascript
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
```

--------------------------------

### Habilitando HTTP/2 com SuperTest

Fonte: https://github.com/ladjs/supertest/blob/master/README.md

Exemplo que demonstra como habilitar o protocolo HTTP/2 para testes usando SuperTest. Mostra passar a opção `{ http2: true }` para a função `request()` e para `request.agent()` ao inicializar a instância de teste.

```javascript
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

request(app, { http2: true })
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

request.agent(app, { http2: true })
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')

### Testando endpoint GET com SuperTest e Mocha (done)

Fonte: https://github.com/ladjs/supertest/blob/master/README.md

Exemplo de integração do SuperTest com o framework de testes Mocha. Mostra um caso de teste usando `describe` e `it`, fazendo uma requisição GET, definindo cabeçalhos e afirmando o tipo e status da resposta, passando o callback `done` do Mocha diretamente para a chamada final `.expect()`.

```javascript
describe('GET /user', function() {
  it('responde com json', function(done) {
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
```

--------------------------------

### Adicionar autenticação HTTP Basic com SuperTest e Mocha

Fonte: https://github.com/ladjs/supertest/blob/master/README.md

Exemplo que mostra como adicionar autenticação HTTP Basic a uma requisição SuperTest usando `.auth()`. Inclui passar usuário e senha antes de fazer a requisição e afirmar a resposta dentro de um teste Mocha.

```javascript
describe('GET /user', function() {
  it('responde com json', function(done) {
    request(app)
      .get('/user')
      .auth('username', 'password')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
```

--------------------------------

### Testando com SuperTest usando Promises

Fonte: https://github.com/ladjs/supertest/blob/master/README.md

Exemplo que mostra o uso do SuperTest com Promises. Retorna a cadeia do SuperTest (que suporta Promises) e usa `.then()` para tratar a resposta e executar asserts adicionais no corpo da resposta.

```javascript
describe('GET /users', function() {
  it('responde com json', function() {
    return request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
         expect(response.body.email).toEqual('foo@bar.com');
      })
  });
});
```

--------------------------------

### Usando função customizada em .expect() para modificar a resposta (SuperTest)

Fonte: https://github.com/ladjs/supertest/blob/master/README.md

Exemplo que demonstra o uso de uma função customizada dentro de `.expect()` para interceptar e modificar o objeto de resposta antes dasserem avaliadas asserções subsequentes. Permite transformações como normalizar maiúsculas/minúsculas ou corrigir IDs para facilitar comparações.

```javascript
describe('POST /user', function() {
  it('user.name deve casar com "john" sem diferenciar maiúsculas', function(done) {
    request(app)
      .post('/user')
      .send('name=john') // envio x-www-form-urlencoded
      .set('Accept', 'application/json')
      .expect(function(res) {
        res.body.id = 'some fixed id';
        res.body.name = res.body.name.toLowerCase();
      })
      .expect(200, {
        id: 'some fixed id',
        name: 'john'
      }, done);
  });
});
```

--------------------------------

### Reutilizando a instância request do SuperTest para o mesmo host

Fonte: https://github.com/ladjs/supertest/blob/master/README.md

Mostra como inicializar a variável `request` com a aplicação alvo ou URL uma vez, permitindo chamadas subsequentes como `request.get('/')` apontarem automaticamente para esse host sem precisar passar `app`/URL novamente.

```javascript
request = request('http://localhost:5555');
```

--------------------------------

### Testando com SuperTest usando async/await

Fonte: https://github.com/ladjs/supertest/blob/master/README.md

Exemplo que demonstra o uso do SuperTest com a sintaxe moderna async/await. Mostra aguardar (await) a cadeia do SuperTest e então realizar asserts no objeto de resposta obtido (headers, status e body).

```javascript
describe('GET /users', function() {
  it('responde com json', async function() {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json')
    expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.email).toEqual('foo@bar.com');
  });
});
```

--------------------------------

### Persistência de cookies com supertest.agent (JS)

Fonte: https://github.com/ladjs/supertest/blob/master/README.md

Mostra como usar `agent()` do supertest com uma aplicação Express para simular uma sessão de usuário persistente, demonstrando como cookies são salvos e enviados em múltiplas requisições dentro da mesma instância do agent.

```js
const request = require('supertest');
const should = require('should');
const express = require('express');
const cookieParser = require('cookie-parser');

describe('request.agent(app)', function() {
  const app = express();
  app.use(cookieParser());

  app.get('/', function(req, res) {
    res.cookie('cookie', 'hey');
    res.send();
  });

  app.get('/return', function(req, res) {
    if (req.cookies.cookie) res.send(req.cookies.cookie);
    else res.send(':(')
  });

  const agent = request.agent(app);

  it('deve salvar cookies', function(done) {
    agent
    .get('/')
    .expect('set-cookie', 'cookie=hey; Path=/', done);
  });

  it('deve enviar cookies', function(done) {
    agent
    .get('/return')
    .expect('hey', done);
  });
});
```

--------------------------------

### Uploads multipart (multipart/form-data) com SuperTest

Fonte: https://github.com/ladjs/supertest/blob/master/README.md

Snippet que ilustra como realizar uploads multipart (form-data) usando SuperTest, aproveitando funcionalidades do SuperAgent. Mostra como adicionar campos com `.field()` e anexar arquivos com `.attach()`.

```javascript
request(app)
  .post('/')
  .field('name', 'my awesome avatar')
  .field('complex_object', '{"attribute": "value"}', {contentType: 'application/json'})
  .attach('avatar', 'test/fixtures/avatar.jpg')
  ...
```

--------------------------------

### Afirmando status e corpo da resposta com SuperTest (JS)

Fonte: https://github.com/ladjs/supertest/blob/master/README.md

Demonstra o uso básico do método `.expect()` do supertest para afirmar o código de status HTTP ou o conteúdo do corpo da resposta. Inclui um callback para tratar possíveis erros.

```js
request.get('/').expect(200, function(err){
  console.log(err);
});
```

```js
request.get('/').expect('heya', function(err){
  console.log(err);
});
```

--------------------------------

### Definindo múltiplos cookies com .set() (JS)

Fonte: https://github.com/ladjs/supertest/blob/master/README.md

Exemplo de como definir explicitamente múltiplos cookies em uma requisição supertest fornecendo um array de strings de cookies para o header `Cookie` via `.set()`.

```js
agent(app)
  .get('/api/content')
  .set('Cookie', ['nameOne=valueOne;nameTwo=valueTwo'])
  .send()
  .expect(200)
  .end((err, res) => {
    if (err) {
      return done(err);
    }
    expect(res.text).to.be.equal('hey');
    return done();
  });
```

--------------------------------

### Usando funções de asserção customizadas com .expect() (JS)

Fonte: https://github.com/ladjs/supertest/blob/master/README.md

Explica como usar uma função JavaScript customizada com `.expect()` do supertest para realizar asserções complexas ou específicas no objeto de resposta. A função deve lançar um erro caso a asserção falhe.

```js
request(app)
  .get('/')
  .expect(hasPreviousAndNextKeys)
  .end(done);

function hasPreviousAndNextKeys(res) {
  if (!('next' in res.body)) throw new Error("missing next key");
  if (!('prev' in res.body)) throw new Error("missing prev key");
}
```

--------------------------------

### Tratando erros de asserção com o callback .end() (Mocha)

Fonte: https://github.com/ladjs/supertest/blob/master/README.md

Exemplo que demonstra como lidar adequadamente com erros de asserção ao usar o callback `.end()` no SuperTest dentro de um teste Mocha. Checa por um erro no callback e o passa para `done()` para falhar o teste caso haja uma asserção que não passou.

```javascript
describe('POST /users', function() {
  it('responde com json', function(done) {
    request(app)
      .post('/users')
      .send({name: 'john'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
```