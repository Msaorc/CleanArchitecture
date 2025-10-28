### Preparar exemplos do Express.js: instalar dependências

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/Readme.md

Os comandos abaixo navegam até o diretório do repositório Express clonado e instalam as dependências necessárias para executar os exemplos disponíveis no repositório.

```bash
cd express
npm install
```

--------------------------------

### Instalar serve-static

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/serve-static/README.md

Instruções para instalar o pacote `serve-static` via npm.

```bash
npm install serve-static
```
### Instalar nodemon globalmente

Fonte: https://github.com/remy/nodemon

Instala `nodemon` globalmente via npm. O nodemon observa mudanças em arquivos e reinicia automaticamente o processo Node.js durante o desenvolvimento.

```bash
npm install -g nodemon
```

---------------------------------

### Instalar nodemon como dependência de desenvolvimento

Fonte: https://github.com/remy/nodemon

Instala `nodemon` como dependência de desenvolvimento para o projeto, permitindo seu uso em scripts npm sem precisar de instalação global.

```bash
npm install --save-dev nodemon
```

---------------------------------

### Executar uma aplicação com nodemon

Fonte: https://github.com/remy/nodemon

Inicia uma aplicação com nodemon, observando mudanças e reiniciando automaticamente — útil durante o desenvolvimento.

```bash
nodemon --exec "node --inspect" app.js
```

---------------------------------

### Exemplo de script `package.json` para nodemon

Fonte: https://github.com/remy/nodemon

Exemplo mostrando como adicionar um script `dev` em `package.json` para executar a aplicação com nodemon.

```json
{
  "scripts": {
    "dev": "nodemon src/index.js"
  }
}
```

---------------------------------

### Usar nodemon com ts-node em projetos TypeScript

Fonte: https://github.com/remy/nodemon

Exemplo mostrando como usar `nodemon` com `ts-node` para executar arquivos TypeScript diretamente em desenvolvimento. A flag `--watch` instrui o nodemon a monitorar arquivos `.ts`.

```bash
nodemon --watch 'src/**/*.ts' --exec "ts-node" src/index.ts
```

Instala o pacote `send`, usado por exemplos simples de servidor estático.

```bash
npm install send
```

--------------------------------


### Executar um exemplo específico do Express.js

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/Readme.md

Este comando executa um arquivo de exemplo do Express.js (por exemplo, `content-negotiation`) com Node.js, permitindo verificar o comportamento demonstrado isoladamente.

```bash
node examples/content-negotiation
```

--------------------------------

### Iniciar servidor da aplicação Express

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/Readme.md

Comando para iniciar a aplicação Express (normalmente executa o script `start` definido em `package.json`).

```bash
npm start
```

--------------------------------

### Instalar content-disposition via npm

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/content-disposition/README.md

Instala a biblioteca `content-disposition` usando o npm.

```bash
npm install content-disposition
```

--------------------------------

### Instalar nodemon (globalmente ou como dependência de dev)

Fonte: https://github.com/remy/nodemon/blob/main/README.md

Instruções para instalar o `nodemon` via npm ou yarn — globalmente (acesso em todo o sistema) ou localmente como dependência de desenvolvimento (usado via `npm scripts` ou `npx`).

Instalação global:

```bash
npm install -g nodemon # ou: yarn global add nodemon
```

Instalação como dependência de desenvolvimento:

```bash
npm install --save-dev nodemon # ou: yarn add nodemon -D
```

--------------------------------


### Instalar `vary` (módulo Node.js)

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/vary/README.md

Instruções para instalar o módulo `vary` via npm.

```bash
npm install vary
```

--------------------------------

### Instalar dependências do projeto Express

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/Readme.md

Comando para instalar todas as dependências listadas em `package.json` do projeto Express.

```bash
npm install
```

--------------------------------

### Instalar media-typer via npm

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/media-typer/README.md

Instala o pacote `media-typer` via npm.

```bash
npm install media-typer
```

--------------------------------

### Exemplo básico de `nodemon.json`

Fonte: https://github.com/remy/nodemon/blob/main/doc/cli/config.txt

Arquivo de configuração minimal para nodemon — define extensões monitoradas, ativação de verbose e comando a executar.

```json
{
  "ext": "*.pde",
  "verbose": true,
  "exec": "processing --sketch=game --run"
}
```

--------------------------------


### Instalar `fresh` via npm

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/fresh/README.md

Instala o módulo `fresh` com npm.

```bash
npm install fresh
```

--------------------------------

### Instalar `mime` via npm

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/send/node_modules/mime/README.md

Instala o pacote `mime` via npm.

```bash
npm install mime
```

--------------------------------

### nodemon

Nodemon é uma ferramenta de desenvolvimento que observa mudanças em arquivos e reinicia automaticamente seu processo Node.js, acelerando o ciclo de desenvolvimento. Abaixo há instruções comuns de instalação, exemplos de uso e um exemplo de configuração `nodemon.json`.

---

---

### Instalar nodemon como dependência de desenvolvimento

Fonte: https://github.com/remy/nodemon

Instala `nodemon` como dependência de desenvolvimento no projeto, permitindo seu uso via scripts npm ou npx.

```bash
npm install --save-dev nodemon
```

---

### Executar a aplicação com nodemon

Executa a aplicação observando mudanças e reiniciando automaticamente. A opção `--exec` permite personalizar o comando.

```bash
nodemon --exec "node --inspect" app.js
```

---

### Exemplo de script `package.json`

Adicione um script `dev` para rodar a aplicação em modo desenvolvimento com nodemon:

```json
{
  "scripts": {
    "dev": "nodemon src/index.js"
  }
}
```

---

### Usar nodemon com ts-node (TypeScript)

Para projetos TypeScript, combine `nodemon` com `ts-node` para executar arquivos `.ts` diretamente:

```bash
nodemon --watch 'src/**/*.ts' --exec "ts-node" src/index.ts
```

---

### Exemplo básico de `nodemon.json`

Arquivo de configuração com opções comuns: `watch`, `ignore`, `execMap`, `events`, `env`, `ext`.

```json
{
  "restartable": "rs",
  "ignore": [
    ".git",
    "node_modules/**/node_modules"
  ],
  "verbose": true,
  "execMap": {
    "js": "node --harmony"
  },
  "events": {
    "restart": "echo \"App restarted due to: $FILENAME\""
  },
  "watch": [
    "src",
    "test"
  ],
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "js,json,ts"
}
```

---

### Lidando com sinais personalizados (graceful shutdown)

Nodemon pode enviar sinais (ex.: `SIGHUP`) para sua aplicação permitindo que ela faça limpeza antes de reiniciar:

```bash
nodemon --signal SIGHUP server.js
```

No código Node.js, capture sinais para fazer encerramento gracioso:

```javascript
process.on('SIGHUP', () => {
  console.log('Recebido SIGHUP, encerrando...');
  // limpar recursos, fechar DB, etc.
  process.exit(0);
});
```

---

### Resolver problemas de permissão ao instalar nodemon globalmente

Se ocorrer `EACCES` ao instalar globalmente, uma alternativa é usar a flag `--unsafe-perm` (com cuidado) ou instalar localmente e usar `npx`.

Instalação global (com sudo quando necessário):

```bash
sudo npm install -g nodemon --unsafe-perm
```

Instalação local (recomendada para evitar problemas de permissão):

```bash
npm install --save-dev nodemon
npx nodemon src/index.js
```

---

### Comandos úteis e instalação de dependências relacionadas

Comandos para instalar dependências usadas nos exemplos (Express e bibliotecas auxiliares):

```bash
# instalar dependências do projeto
npm install

# instalar pacote `send` (exemplos)
npm install send

# instalar outras dependências usadas em vários exemplos/testes
npm install content-disposition vary media-typer finalhandler mime mime-types negotiator
```

---


### Executar exemplos do Express (diretório examples)

Se o repositório fornecer exemplos, execute os arquivos específicos para observar comportamentos demonstrados:

```bash
node examples/content-negotiation
npm start
```

Para executar a suíte de testes de um projeto auxiliar (ex.: `utils-merge`), primeiro instale dependências e depois execute os testes:

```bash
npm install
npm test
```

Fonte e referência: https://github.com/remy/nodemon

--------------------------------

### Instalar `depd` via npm

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/depd/Readme.md

Instala a biblioteca `depd` usando o npm.

```bash
npm install depd
```

--------------------------------

### Instalar `crc` via npm

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/etag/node_modules/crc/README.md

Instala o módulo `crc` via npm.

```bash
npm install crc
```

Instala o módulo `crc` usando o npm (exemplo repetido anteriormente).

```bash
npm install crc
```

--------------------------------


### Instalar `ipaddr.js` via npm

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/proxy-addr/node_modules/ipaddr.js/README.md

Instala a biblioteca `ipaddr.js` usando o npm.

```bash
npm install ipaddr.js
```

--------------------------------

### Configuração programática do Nodemon e tratamento de eventos

Fonte: https://github.com/remy/nodemon/blob/main/doc/requireable.md

Exemplo de como inicializar o Nodemon como um módulo requerido, configurá-lo com um script e extensões, e anexar listeners para os eventos `start`, `quit` e `restart` para gerenciar o ciclo de vida da aplicação.

```javascript
var nodemon = require('nodemon');

nodemon({
  script: 'app.js',
  ext: 'js json'
});

nodemon.on('start', function () {
  console.log('App has started');
}).on('quit', function () {
  console.log('App has quit');
  process.exit();
}).on('restart', function (files) {
  console.log('App restarted due to: ', files);
});
```

--------------------------------


### Instalar pacote `utils-merge` (npm)

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/utils-merge/README.md

Comando para instalar o pacote `utils-merge` localmente ou globalmente via npm; fornece utilitários de merge para uso em aplicações.

```bash
npm install utils-merge
```

--------------------------------


### Servir arquivos estáticos como downloads

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/serve-static/README.md

Exemplo de servir arquivos estáticos forçando download através do cabeçalho `Content-Disposition`, usando `content-disposition`, `finalhandler` e `http`.

```js
var contentDisposition = require('content-disposition')
var finalhandler = require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')

// Servir a pasta public/ftp
var serve = serveStatic('public/ftp', {
  'index': false,
  'setHeaders': setHeaders
})

// Definir header para forçar download
function setHeaders(res, path) {
  res.setHeader('Content-Disposition', contentDisposition(path))
}

// Criar servidor
var server = http.createServer(function(req, res){
  var done = finalhandler(req, res)
  serve(req, res, done)
})

// Iniciar escuta
server.listen(3000)
```

--------------------------------

### Instalar utilitário `debug` via npm

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/debug/Readme.md

Instala o pacote `debug` via npm, utilizado para logging em aplicações Node.js.

```bash
npm install debug
```

--------------------------------

### Instalar `type-is` via npm

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/type-is/README.md

Instala a biblioteca `type-is` usando o npm.

```bash
npm install type-is
```

--------------------------------

### `nodemon.json` global com mapa de executáveis (execMap)

Fonte: https://github.com/remy/nodemon/blob/main/doc/cli/config.txt

Exemplo de um arquivo `nodemon.json` global — útil para definir executáveis padrão para diferentes tipos de arquivo entre vários projetos. A propriedade `execMap` mapeia extensões para comandos.

```json
{
  "verbose": true,
  "execMap": {
    "rb": "ruby",
    "pde": "processing --sketch={{pwd}} --run"
  }
}
```

--------------------------------

### Load Mappings from Apache .types File Example

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/send/node_modules/mime/README.md

Mostra como carregar mapeamentos MIME adicionais a partir de um arquivo local no formato Apache `.types`, permitindo tipos personalizados por projeto.

```JavaScript
mime.load('./my_project.types');
```

--------------------------------

### Instalar pacote `forwarded` via npm

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/proxy-addr/node_modules/forwarded/README.md

Instala o pacote `forwarded` via npm, tornando-o disponível para uso em projetos Node.js.

```bash
npm install forwarded
```

--------------------------------

### Instalar `parseurl` via npm

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/parseurl/README.md

Instala a biblioteca `parseurl` via npm, adicionando-a às dependências do projeto.

```bash
npm install parseurl
```

--------------------------------

### Interacting with nodemon as a Spawned Child Process

Fonte: https://github.com/remy/nodemon/blob/main/doc/events.md

Mostra como iniciar o nodemon como um processo filho usando `child_process` do Node.js, utilizando a opção `ipc` para comunicação entre processos. Esse padrão permite que o processo pai escute eventos `message` do nodemon (ex.: 'start', 'crash') e envie comandos ('restart', 'quit') ao filho. Também enfatiza a importância de escutar o evento nativo `exit` do processo filho para encerramento limpo.

```js
// exemplo usando `spawn`; também é possível usar `fork` ou outras funções
// https://nodejs.org/api/child_process.html
const { spawn } = require('child_process');

function spawnNodemon() {
  const cp = spawn('nodemon', ['path/to/file.js', '--watch', 'path/to/watch'], {
    // a parte importante é a 4ª opção 'ipc'
    // assim `process.send` ficará disponível no processo filho (nodemon)
    // permitindo comunicar-se de volta com o processo pai (via `.on()`, `.send()`)
    // https://nodejs.org/api/child_process.html#child_process_options_stdio
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'],
  });

  return cp;
}

var app = spawnNodemon();

app.on('message', function (event) {
  if (event.type === 'start') {
    console.log('nodemon started');
  } else if (event.type === 'crash') {
    console.log('script crashed for some reason');
  }
});

// forçar reinício
app.send('restart');

// forçar saída
app.send('quit');

app.on('exit', function () {
  console.log('nodemon quit');
});
```

--------------------------------

### Basic Static File Serving with 'send'

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/send/Readme.md

Exemplo simples de servidor HTTP em Node.js que demonstra o uso do `send` para servir arquivos estáticos diretamente a partir da URL da requisição.

```js
var http = require('http');
var send = require('send');

var app = http.createServer(function(req, res){
  send(req, req.url).pipe(res);
}).listen(3000);
```

--------------------------------

### Instalar `range-parser` via npm

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/range-parser/README.md

Exemplo de instalação do módulo `range-parser` via npm. Deve ser executado no diretório raiz do projeto.

```bash
npm install range-parser
```

--------------------------------

### API Reference: mime.load(filepath)

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/send/node_modules/mime/README.md

Load mappings from an Apache ".types" format file. The .types file format is simple; refer to the `types` directory for examples.

```APIDOC
mime.load(filepath: string): void
  filepath: The path to the .types file.
```

--------------------------------

### Basic Debug Usage in Node.js Application

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/debug/Readme.md

Este exemplo demonstra como inicializar e usar o módulo `debug` em uma aplicação Node.js. Cria um servidor HTTP e registra mensagens no namespace `http`, mostrando como rastrear o boot da aplicação e o tratamento de requisições.

```javascript
var debug = require('debug')('http')
  , http = require('http')
  , name = 'My App';

// app de exemplo

debug('booting %s', name);

http.createServer(function(req, res){
  debug(req.method + ' ' + req.url);
  res.end('hello\n');
}).listen(3000, function(){
  debug('listening');
});

// algum tipo de worker de exemplo

require('./worker');
```

--------------------------------

### Negociação do cabeçalho HTTP `Accept`

Fonte: https://github.com/remy/nodemon/blob/main/test/fixtures/watch-count/node_modules/express/node_modules/accepts/node_modules/negotiator/README.md

Demonstra como usar o `Negotiator` para determinar os tipos de mídia preferidos com base no cabeçalho `Accept` e em uma lista de tipos disponíveis. Mostra como obter todos os tipos preferidos, filtrar pelos tipos disponíveis e obter o tipo preferido principal a partir do objeto de requisição.

```js
availableMediaTypes = ['text/html', 'text/plain', 'application/json']

// The negotiator constructor receives a request object
negotiator = new Negotiator(request)

// Let's say Accept header is 'text/html, application/*;q=0.2, image/jpeg;q=0.8'

negotiator.mediaTypes()
// -> ['text/html', 'image/jpeg', 'application/*']

negotiator.mediaTypes(availableMediaTypes)
// -> ['text/html', 'application/json']

negotiator.mediaType(availableMediaTypes)
// -> 'text/html'
```

--------------------------------

### Entendendo a saída verbose do Nodemon

Fonte: https://github.com/remy/nodemon/blob/main/faq.md

Explica as informações detalhadas exibidas pelo nodemon quando executado em modo verbose (`--verbose` ou `-V`): configurações carregadas, regras de ignore, extensões observadas, PIDs e informações sobre reinicializações (arquivos que dispararam, regras correspondentes etc.).

```text
14 Apr 15:24:58 - [nodemon] v1.0.17
14 Apr 15:24:58 - [nodemon] reading config /Users/remy/Sites/jsbin-private/nodemon.json
14 Apr 15:24:58 - [nodemon] to restart at any time, enter `rs`
14 Apr 15:24:58 - [nodemon] or send SIGHUP to 58118 to restart
14 Apr 15:24:58 - [nodemon] ignoring: /Users/remy/Sites/jsbin-private/.git/**/* node_modules/**/node_modules
14 Apr 15:24:58 - [nodemon] watching: /Users/remy/Sites/jsbin/views/**/* /Users/remy/Sites/jsbin/lib/**/* ../json/*.json config.dev.json
14 Apr 15:24:58 - [nodemon] watching extensions: json,js,html
14 Apr 15:24:58 - [nodemon] starting `node run.js`
14 Apr 15:24:58 - [nodemon] child pid: 9292
```

```text
14 Apr 15:25:56 - [nodemon] files triggering change check: ../jsbin/lib/app.js
14 Apr 15:25:56 - [nodemon] matched rule: **/Users/remy/Sites/jsbin/lib/**/*
14 Apr 15:25:56 - [nodemon] changes after filters (before/after): 1/1
14 Apr 15:25:56 - [nodemon] restarting due to changes...
14 Apr 15:25:56 - [nodemon] ../jsbin/lib/app.js

14 Apr 15:25:56 - [nodemon] starting `node run.js`
14 Apr 15:25:56 - [nodemon] child pid: 9556
```

--------------------------------

### Aplicação de regras do Nodemon: cenário de arquivos de teste

Fonte: https://github.com/remy/nodemon/blob/main/doc/rules.md

Exemplo em JavaScript que demonstra a aplicação das regras do `nodemon` a arquivos dentro do diretório `test/`. O exemplo ilustra como padrões `ignore` interagem com diretórios `watch` mais abrangentes (por exemplo, `test/app.js` vs `test/app.coffee`).

```js
const files = ['test/app.js', 'test/app.coffee'];

// afterIgnore = ['test/app.js'] now since test/app.coffee matches *.coffee
const afterIgnore = files.filter(applyIgnore);

// watch.length = 2 as watch implies test/*.*
const watched = files.filter(applyWatch);
```