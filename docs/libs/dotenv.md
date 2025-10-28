# dotenv

## Introdução

Dotenv é um módulo Node.js de dependência zero que carrega variáveis de ambiente a partir de um arquivo `.env` para `process.env`. Essa abordagem segue a metodologia Twelve-Factor App, que recomenda a separação da configuração do código. Armazenando configurações específicas de ambiente — como credenciais de banco, chaves de API e endpoints — em arquivos `.env`, sua aplicação pode manter diferentes configurações para desenvolvimento, homologação e produção sem alterar o código-fonte.

O pacote fornece uma API simples com funções úteis como `config()` para carregar variáveis, `parse()` para interpretar o conteúdo de um `.env` em um objeto, `populate()` para injetar variáveis em objetos personalizados e suporte a arquivos `.env.vault` criptografados quando disponível. O dotenv lida com valores multilinha, comentários, múltiplas codificações e permite carregar múltiplos arquivos com regras de precedência. Por padrão, variáveis já presentes no ambiente não são sobrescritas, a menos que se use a opção `override`.

## Referência rápida e exemplos

### Carregamento básico

Carregue variáveis de um arquivo `.env` para `process.env` com descoberta automática:

```javascript
// .env
// DB_HOST=localhost
// DB_USER=admin
// DB_PASS=secret123
// PORT=3000

require('dotenv').config();

console.log(process.env.DB_HOST); // 'localhost'
console.log(process.env.DB_USER); // 'admin'
console.log(process.env.PORT);    // '3000'

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};
```

### Uso com ES Modules

Pré-carregamento simples:

```javascript
import 'dotenv/config';
import express from 'express';

const app = express();
app.listen(process.env.PORT);
```

Configuração avançada:

```javascript
import dotenv from 'dotenv';

const result = dotenv.config({
  path: '/custom/path/to/.env',
  encoding: 'latin1',
  debug: true
});

if (result.error) {
  console.error('Falha ao carregar .env:', result.error);
  throw result.error;
}

console.log('Variáveis carregadas:', result.parsed);
```

### Arquivos customizados e precedência

Você pode passar um caminho único ou uma lista de arquivos. O primeiro arquivo na lista tem precedência sobre os seguintes:

```javascript
const dotenv = require('dotenv');

// Caminho único
dotenv.config({ path: './config/.env.production' });

// Múltiplos arquivos - o primeiro vence
dotenv.config({ path: ['.env.local', '.env'] });

// Exemplo: valores vindos de .env.local sobrescrevem .env
```

### parse()

Converte uma string ou buffer no formato `.env` para um objeto JavaScript sem modificar `process.env`.

```javascript
const dotenv = require('dotenv');
const fs = require('fs');

const envString = 'DB_HOST=localhost\nDB_PORT=5432\nAPI_KEY=abc123';
const config = dotenv.parse(envString);
console.log(config);

const buf = Buffer.from('BASIC=basic\nNUMBER=42');
const parsed = dotenv.parse(buf);
console.log(parsed);

const fileContents = fs.readFileSync('.env', { encoding: 'utf8' });
const envConfig = dotenv.parse(fileContents);
console.log(envConfig);
```

### populate()

Popula um objeto alvo com variáveis (útil para testes ou isolamento):

```javascript
const dotenv = require('dotenv');

const parsed = { API_KEY: 'secret_key', DB_HOST: 'localhost', PORT: '3000' };
const myObject = {};
dotenv.populate(myObject, parsed);
console.log(myObject);

// População com override
const target = { API_KEY: 'old_key', EXISTING: 'value' };
const source = { API_KEY: 'new_key', DB_HOST: 'localhost' };


console.log(target);
```

### Debug

Ativa logs detalhados para entender o comportamento de carregamento e parsing:

```javascript
const dotenv = require('dotenv');
dotenv.config({ debug: true });
```

### Override (sobrescrever variáveis existentes)

Por padrão o dotenv não sobrescreve variáveis já definidas no processo. Para forçar sobrescrita use:

```javascript
require('dotenv').config({ override: true });
```

### Carregar em um objeto alvo (sem modificar process.env)

```javascript
const dotenv = require('dotenv');
const customEnv = {};
dotenv.config({ processEnv: customEnv });
console.log(customEnv);
```

### Suporte a valores multilinha

Valores multilinha (ex.: chaves privadas, certificados) são suportados e preservam quebras de linha.

```javascript
require('dotenv').config();
console.log(process.env.PRIVATE_KEY);
```

### Pré-carregamento via CLI

Você pode pré-carregar o dotenv sem alterar o código:

```bash
node -r dotenv/config server.js
# Com opções:
node -r dotenv/config server.js dotenv_config_path=/custom/.env dotenv_config_debug=true
```

### Modo silencioso

Suprime logs informacionais mantendo erros visíveis — útil em produção.

```javascript
const dotenv = require('dotenv');
dotenv.config({ debug: false });
```

---

Fonte: https://github.com/motdotla/dotenv
// Comportamento padrão com logs
dotenv.config();
// Saída: [dotenv@17.2.3] injetando env (5) a partir de .env -- dica: ...

// Modo silencioso - suprime logs
dotenv.config({ quiet: true });
// Sem saída (a menos que ocorra erro)

// Modo silencioso com tratamento de erro
const result = dotenv.config({ quiet: true });
if (result.error) {
  console.error('Erro de configuração:', result.error.message);
  process.exit(1);
}

// Modo silencioso condicional
const isProduction = process.env.NODE_ENV === 'production';
dotenv.config({ quiet: isProduction });
```

### Cofre (vault) criptografado

Carrega variáveis criptografadas de arquivos `.env.vault` usando chaves para implantações seguras.

```javascript
// .env.vault:
// DOTENV_VAULT_PRODUCTION="encrypted_base64_string..."
// DOTENV_VAULT_DEVELOPMENT="encrypted_base64_string..."

// Defina a chave de descriptografia via variável de ambiente
process.env.DOTENV_KEY = 'dotenv://:key_1234567890abcdef@dotenvx.com/vault/.env.vault?environment=production';

// Config detecta e descriptografa automaticamente
const result = require('dotenv').config();

console.log(result.parsed);
// { API_KEY: 'decrypted_production_key', DB_HOST: 'prod.example.com' }

// Passe DOTENV_KEY diretamente nas opções
require('dotenv').config({
  DOTENV_KEY: 'dotenv://:key_abcdef@dotenvx.com/vault/.env.vault?environment=development'
});

// Uso da função decrypt
const dotenv = require('dotenv');
const encrypted = 'base64_encrypted_ciphertext...';
const key = 'dotenv://:key_1234567890abcdef@dotenvx.com/vault/.env.vault?environment=production';

try {
  const decrypted = dotenv.decrypt(encrypted, key);
  console.log(decrypted); // "API_KEY=secret\nDB_HOST=localhost"
} catch (error) {
  if (error.code === 'INVALID_DOTENV_KEY') {
    console.error('Chave de descriptografia inválida');
  } else if (error.code === 'DECRYPTION_FAILED') {
    console.error('Falha na descriptografia - verifique sua chave');
  }
}
```

### Codificação

Especifique a codificação dos arquivos `.env` quando não forem UTF-8.

```javascript
const dotenv = require('dotenv');

// Codificação Latin1
dotenv.config({ encoding: 'latin1' });

// Codificação ASCII
dotenv.config({ encoding: 'ascii' });

// Codificação UTF-16
dotenv.config({ encoding: 'utf16le' });

// UTF-8 por padrão (explícito)
dotenv.config({ encoding: 'utf8' });

// Útil para sistemas legados ou requisitos específicos
dotenv.config({
  path: './legacy/.env',
  encoding: 'iso-8859-1'
});
```

### Padrões de tratamento de erro

Implemente tratamento robusto para arquivos ausentes, erros de parse e problemas de configuração.

```javascript
const dotenv = require('dotenv');

// Tratamento básico de erro
const result = dotenv.config();

if (result.error) {
  console.error('Falha ao carregar .env:', result.error);

  if (result.error.code === 'ENOENT') {
    console.error('Arquivo .env não encontrado');
  }

  // Não sair - use valores padrão
  console.log('Continuando com valores padrão de ambiente');
} else {
  console.log('Carregadas com sucesso', Object.keys(result.parsed).length, 'variáveis');
}

// Tratamento estrito para produção
try {
  const config = dotenv.config({ path: '.env.production' });

  if (config.error) {
    throw config.error;
  }

  // Valide variáveis obrigatórias
  const required = ['DB_HOST', 'DB_USER', 'DB_PASS', 'API_KEY'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Variáveis de ambiente obrigatórias ausentes: ${missing.join(', ')}`);
  }

  console.log('Configuração validada com sucesso');
} catch (error) {
  console.error('Erro de configuração:', error.message);
  process.exit(1);
}

// Tratamento de erro de parse
try {
  const parsed = dotenv.parse(Buffer.from('INVALID'));
  console.log(parsed); // Pode ser objeto vazio
} catch (error) {
  console.error('Erro de parse:', error.message);
}
```

### Comentários e caracteres especiais

Trate comentários, caracteres especiais e diferentes estilos de aspas em arquivos `.env`.

```javascript
// .env com comentários e caracteres especiais:
// # Isto é um comentário
// DATABASE_URL=postgres://user:pass@localhost/db
//
// # Comentários inline
// API_KEY=secret123 # chave de produção
//
// # Símbolos # em valores precisam de aspas
// SECRET_HASH="algo-com-um-#-hash"
//
// # Valores JSON
// JSON_CONFIG={"foo": "bar", "nested": {"key": "value"}}
//
// # URLs com caracteres especiais
// WEBHOOK_URL=https://example.com/hook?token=abc123&id=456
//
// # Valores vazios
// EMPTY_VAR=
//
// # Espaços em valores
// SPACED_VALUE="  valor com espaços  "
// UNQUOTED=value without spaces

require('dotenv').config();

console.log(process.env.DATABASE_URL);
// 'postgres://user:pass@localhost/db'

console.log(process.env.SECRET_HASH);
// 'algo-com-um-#-hash'

console.log(process.env.JSON_CONFIG);
// '{"foo": "bar", "nested": {"key": "value"}}'

console.log(process.env.EMPTY_VAR);
// ''

console.log(process.env.SPACED_VALUE);
// '  valor com espaços  '

console.log(process.env.UNQUOTED);
// 'value without spaces' (trimmed)
```

## Resumo

Dotenv é a solução padrão da indústria para gerenciar configurações específicas de ambiente em aplicações Node.js. É especialmente útil em ambientes de desenvolvimento local, onde desenvolvedores precisam configurar rapidamente conexões de banco, chaves de API e endpoints sem alterar o código. A biblioteca é adequada para arquiteturas de microsserviços, pipelines CI/CD e ambientes em nuvem, permitindo configurações isoladas por serviço e por ambiente.

Padrões de integração são simples: em aplicações pequenas, uma única chamada `require('dotenv').config()` no ponto de entrada carrega as variáveis necessárias. Em aplicações maiores, é possível usar múltiplos arquivos `.env` com regras de precedência (`.env.local` sobrescrevendo `.env`), objetos alvo personalizados para testes e a função `populate()` para gerência avançada. O dotenv integra-se facilmente com frameworks como Express, NestJS e Fastify, e suporta módulos ES6 via `import 'dotenv/config'`. Para produção, há suporte a cofres criptografados (`.env.vault`) para armazenamento seguro de credenciais sensíveis. O design não invasivo garante que variáveis de ambiente existentes permaneçam inalteradas, a menos que sejam explicitamente sobrescritas, tornando-o seguro para uso em containers e plataformas de nuvem.

```
