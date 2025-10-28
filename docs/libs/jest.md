### Inicializar configuração do Jest usando npm

Fonte: https://github.com/jestjs/jest/blob/main/website/versioned_docs/version-29.7/GettingStarted.md

Executa o comando interativo de inicialização do Jest via npm. Esse comando guia você na geração de um arquivo básico `jest.config.js` adaptado ao seu projeto.

```bash
npm init jest@latest
```

--------------------------------

### Instalar Jest como dependência de desenvolvimento

Fonte: https://github.com/jestjs/jest/blob/main/docs/GettingStarted.md

Instala o framework de testes Jest como dependência de desenvolvimento no seu projeto usando npm ou Yarn. Esse comando adiciona o Jest ao `package.json` do projeto.

```bash
npm install --save-dev jest
```

```bash
yarn add --dev jest
```

--------------------------------

### Instalar preset Babel para suporte a TypeScript

Fonte: https://github.com/jestjs/jest/blob/main/README.md

Instala `@babel/preset-typescript` como dependência de desenvolvimento. Esse preset permite que o Babel transpile sintaxe TypeScript para JavaScript.

```bash
yarn add --dev @babel/preset-typescript
```

--------------------------------

### Instalar dependências Babel para Jest

Fonte: https://github.com/jestjs/jest/blob/main/docs/GettingStarted.md

Instala os pacotes Babel necessários (`babel-jest`, `@babel/core`, `@babel/preset-env`) como dependências de desenvolvimento. Eles são usados para transpilar código JavaScript (por exemplo, ES6+) antes do Jest executar os testes.

```bash
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

```bash
yarn add --dev babel-jest @babel/core @babel/preset-env
```

--------------------------------

### Exemplo de saída de um teste Jest bem-sucedido

Fonte: https://github.com/jestjs/jest/blob/main/README.md

Exibe a saída típica do Jest no terminal após executar um teste com sucesso. A saída indica que o teste passou, qual arquivo de teste foi executado, a descrição do teste e o tempo de execução.

```bash
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```

--------------------------------

### Executar Jest pela linha de comando com opções

Fonte: https://github.com/jestjs/jest/blob/main/docs/GettingStarted.md

Mostra como executar o Jest diretamente pela linha de comando com opções específicas. Este exemplo executa testes que batem com 'my-test', habilita notificações e usa o arquivo de configuração `config.json`.

```bash
jest my-test --notify --config=config.json
```

--------------------------------

### Instalar tipos da API global do Jest

Fonte: https://github.com/jestjs/jest/blob/main/website/versioned_docs/version-29.7/GettingStarted.md

Este comando instala o pacote `@jest/globals` como dependência de desenvolvimento. Ele fornece as definições de tipos da API global do Jest e garante compatibilidade com a versão do Jest usada. Essas APIs devem ser importadas explicitamente nos arquivos de teste.

```bash
npm install --save-dev @jest/globals
```

--------------------------------

### Instalar dependências Babel para uso no Jest

Fonte: https://github.com/jestjs/jest/blob/main/website/versioned_docs/version-29.7/GettingStarted.md

Instala os pacotes Babel necessários como dependências de desenvolvimento. `babel-jest`, `@babel/core` e `@babel/preset-env` são usados para transpilar arquivos JavaScript dentro dos testes do Jest.

```bash
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

--------------------------------

### Instalar Jest como dependência de desenvolvimento com npm

Fonte: https://github.com/jestjs/jest/blob/main/README.md

Instala o Jest como dependência de desenvolvimento usando npm, atualizando o `package.json` do projeto.

```bash
npm install --save-dev jest
```

--------------------------------

### Instalar Jest como dependência de desenvolvimento com Yarn

Fonte: https://github.com/jestjs/jest/blob/main/README.md

Instala o Jest como dependência de desenvolvimento usando Yarn, adicionando-o em `devDependencies`.

```bash
yarn add --dev jest
```

--------------------------------

### Setup assíncrono único (beforeAll/afterAll)

Fonte: https://github.com/jestjs/jest/blob/main/docs/SetupAndTeardown.md

Mostra como usar os hooks `beforeAll` e `afterAll` no Jest para executar operações de setup/teardown que devem rodar apenas uma vez antes/depois de todos os testes. O exemplo ilustra inicialização e limpeza assíncrona de uma base de dados de cidades.

```javascript
beforeAll(() => {
  return initializeCityDatabase();
});

afterAll(() => {
  return clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

--------------------------------

### Instalar dependências Babel para testes com Jest

Fonte: https://github.com/jestjs/jest/blob/main/README.md

Instala `babel-jest`, `@babel/core` e `@babel/preset-env` como dependências de desenvolvimento para permitir a transpiração de código nos testes.

```bash
yarn add --dev babel-jest @babel/core @babel/preset-env
```

--------------------------------

### Iniciar servidor de desenvolvimento do site do Jest

Fonte: https://github.com/jestjs/jest/blob/main/CONTRIBUTING.md

Comandos para entrar no diretório `website`, instalar dependências específicas, executar um script de suporte e iniciar um servidor local para visualizar a documentação do Jest durante contribuições.

```bash
cd website       # Apenas se você não estiver no diretório website
yarn
node fetchSupporters.js
yarn start
```

--------------------------------

### Gerar um arquivo de configuração básico do Jest

Fonte: https://github.com/jestjs/jest/blob/main/docs/GettingStarted.md

Usa o CLI do Jest para gerar interativamente um `jest.config.js` básico, com perguntas que ajudam a configurar opções iniciais.

```bash
npm init jest@latest
```

```bash
yarn create jest
```

--------------------------------

### Setup repetido (beforeEach/afterEach)

Fonte: https://github.com/jestjs/jest/blob/main/docs/SetupAndTeardown.md

Exemplo de uso dos hooks `beforeEach` e `afterEach` para executar lógica de setup/teardown antes e depois de cada teste individual.

```javascript
beforeEach(() => {
  initializeCityDatabase();
});

afterEach(() => {
  clearCityDatabase();
});

test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```

--------------------------------

### Ordem de execução dos hooks de setup/teardown

Fonte: https://github.com/jestjs/jest/blob/main/docs/SetupAndTeardown.md

Exemplo que ilustra a ordem exata em que os hooks `beforeAll`, `afterAll`, `beforeEach`, `afterEach` e `test` são executados, incluindo um bloco `describe` aninhado, usando `console.log` para visualização.

```javascript
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));

test('', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));

  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```

--------------------------------

### Instalar preset Babel para TypeScript no Jest

Fonte: https://github.com/jestjs/jest/blob/main/website/versioned_docs/version-29.7/GettingStarted.md

Instala `@babel/preset-typescript` como dependência de desenvolvimento para permitir que o Jest processe arquivos `.ts` (não realiza checagem de tipos em tempo de teste).

```bash
npm install --save-dev @babel/preset-typescript
```

--------------------------------

### Instalar ts-jest para suporte a TypeScript

Fonte: https://github.com/jestjs/jest/blob/main/docs/GettingStarted.md

`ts-jest` é um preprocessor para Jest projetado para TypeScript, oferecendo suporte a source maps. Instale-o para permitir transpilar e executar testes em TypeScript.

```bash
npm install --save-dev ts-jest
```

--------------------------------

### Configurar Jest para transpilar TypeScript via Babel

Fonte: https://github.com/jestjs/jest/blob/main/docs/GettingStarted.md

Configuracão que permite ao Jest transpilar TypeScript usando Babel. Requer `@babel/preset-typescript` no `babel.config.js`. Observe que isso trata apenas da transpiração, não da checagem de tipos.

```bash
npm install --save-dev @babel/preset-typescript
```

```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
```

--------------------------------

### Executar arquivos de setup após preparação do ambiente

Fonte: https://github.com/jestjs/jest/blob/main/website/versioned_docs/version-29.7/Configuration.md

Exemplos de configuração da opção `setupFilesAfterEnv` do Jest para especificar módulos que são executados após o ambiente de teste ser configurado, mas antes da execução dos testes. Ideal para configurações globais como matchers personalizados.

```javascript
/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
};

module.exports = config;
```

```typescript
import type {Config} from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
};

export default config;
```

--------------------------------

### Instalar dependências do site do Jest (Bash)

Fonte: https://github.com/jestjs/jest/blob/main/website/README.md

Comando para instalar todas as dependências do projeto `website` do Jest — normalmente um passo único para preparar o ambiente de desenvolvimento.

```bash
yarn
```

--------------------------------

### Exemplo TypeScript com imports dos globais do Jest

Fonte: https://github.com/jestjs/jest/blob/main/website/versioned_docs/version-29.7/GettingStarted.md

Snippet TypeScript que demonstra um teste básico usando as APIs globais do Jest (`describe`, `expect`, `test`) importadas de `@jest/globals`, garantindo tipagem e autocompletar no editor.

```typescript
import {describe, expect, test} from '@jest/globals';
import {sum} from './sum';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

--------------------------------

### Adicionar preset TypeScript na configuração do Babel

Fonte: https://github.com/jestjs/jest/blob/main/README.md

Atualiza `babel.config.js` para incluir `@babel/preset-typescript` no array de presets, integrando a transpiração TypeScript ao setup do Babel para o Jest.

```javascript
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
```

--------------------------------

### Configurar ESLint para reconhecer APIs globais do Jest

Fonte: https://github.com/jestjs/jest/blob/main/website/versioned_docs/version-30.0/GettingStarted.md

Configura `languageOptions.globals` do ESLint para incluir `globals.jest`. Isso evita erros `no-undef` quando se usam APIs globais do Jest sem importá-las.

```javascript
import {defineConfig} from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
]);
```

--------------------------------

### Gerar um arquivo de configuração básico do Jest com Yarn

Fonte: https://github.com/jestjs/jest/blob/main/README.md

Inicia um processo interativo usando o Yarn para criar um `jest.config.js` padrão para o seu projeto. O Jest fará uma série de perguntas para ajustar a configuração ao seu caso de uso.

```bash
yarn create jest
```

--------------------------------

### Demonstrar a ordem de execução de blocos describe e test no Jest

Fonte: https://github.com/jestjs/jest/blob/main/website/versioned_docs/version-29.7/SetupAndTeardown.md

Este exemplo ilustra como o Jest executa blocos `describe` e funções `test`. Os callbacks de `describe` são executados primeiro, seguidos pelos testes na ordem em que aparecem. Os logs no console mostram a sequência de execução.

```js
describe('describe outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');

    test('test 1', () => console.log('test 1'));
  });

  console.log('describe outer-b');

  test('test 2', () => console.log('test 2'));

  describe('describe inner 2', () => {
    console.log('describe inner 2');

    test('test 3', () => console.log('test 3'));
  });

  console.log('describe outer-c');
});
```

--------------------------------

### Configurar Jest `setupFilesAfterEnv` para setup de testes

Fonte: https://github.com/jestjs/jest/blob/main/docs/Configuration.md

A opção `setupFilesAfterEnv` especifica módulos que devem ser executados após o framework de teste ser instalado, mas antes da execução dos arquivos de teste. É ideal para adicionar matchers personalizados (por exemplo, `jest-extended`) ou configurar hooks globais. Os exemplos a seguir mostram como aplicar isso em arquivos de configuração Jest em JavaScript e TypeScript, além de um arquivo de setup de exemplo.

```javascript
const matchers = require('jest-extended');
expect.extend(matchers);

afterEach(() => {
  jest.useRealTimers();
});
```

```javascript
/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
};

module.exports = config;
```

```typescript
import type {Config} from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
};

export default config;
```


--------------------------------

### Definir uma função de Global Setup para o Jest em JavaScript

Fonte: https://github.com/jestjs/jest/blob/main/website/versioned_docs/version-29.7/Configuration.md

Este exemplo em JavaScript ilustra uma função `globalSetup` que é executada uma vez antes de todas as suítes de teste. Pode ser usada para inicializar recursos (por exemplo, configurar um banco de dados) e armazenar referências em `globalThis` para uso posterior no `globalTeardown`. A função recebe `globalConfig` e `projectConfig` como argumentos.

```javascript
module.exports = async function (globalConfig, projectConfig) {
  console.log(globalConfig.testPathPattern);
  console.log(projectConfig.cache);

  // Define referência ao mongod para permitir seu encerramento no teardown.
  globalThis.__MONGOD__ = mongod;
};
```

--------------------------------

### Configurar ESLint com o plugin Jest para reconhecer globals

Fonte: https://github.com/jestjs/jest/blob/main/website/versioned_docs/version-29.7/GettingStarted.md

Exemplo de configuração do ESLint que integra `eslint-plugin-jest` para fornecer regras de lint específicas para Jest. Ao incluir `jest` em `plugins` e configurar `jest/globals` em `env`, o ESLint reconhecerá as variáveis globais do Jest, evitando erros do tipo `no-undef` e permitindo regras específicas para arquivos de teste.

```javascript
import {defineConfig} from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
]);
```
Source: https://github.com/jestjs/jest/blob/main/docs/SetupAndTeardown.md

Illustrates how `beforeEach` can manage asynchronous setup operations by returning a Promise. Jest will wait for the returned Promise to resolve before proceeding with the tests, ensuring the environment is ready.

```javascript
beforeEach(() => {
  return initializeCityDatabase();
});
```

--------------------------------

### Add Jest global type definitions using @types/jest

Source: https://github.com/jestjs/jest/blob/main/docs/GettingStarted.md

An alternative method for Jest global type definitions is to install the `@types/jest` package. This provides types for Jest globals without requiring explicit imports in test files. It is a third-party library, so matching its version closely with your Jest version is recommended.

```bash
npm install --save-dev @types/jest
```

--------------------------------

### Add Jest global type definitions using @jest/globals

Source: https://github.com/jestjs/jest/blob/main/docs/GettingStarted.md

To provide type definitions for Jest's global APIs (like `describe`, `expect`, `test`) in TypeScript test files, install the `@jest/globals` package. You then need to explicitly import these APIs in your test files to get type-checking benefits.

```bash
npm install --save-dev @jest/globals
```

```typescript
import {describe, expect, test} from '@jest/globals';
import {sum} from './sum';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

--------------------------------

### Add TypeScript Preset to Babel Configuration for Jest

Source: https://github.com/jestjs/jest/blob/main/website/versioned_docs/version-29.7/GettingStarted.md

This configuration adds `@babel/preset-typescript` to the list of Babel presets in `babel.config.js`. This setup instructs Babel to transform TypeScript syntax into standard JavaScript, making it compatible with Jest's test runner. Ensure `@babel/preset-env` is also configured for target environments.

```javascript
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    // highlight-next-line
    '@babel/preset-typescript',
  ],
};
```

--------------------------------

### Create a Jest-aware Babel configuration file

Source: https://github.com/jestjs/jest/blob/main/docs/GettingStarted.md

Illustrates how to make a `babel.config.js` file conditionally apply configurations based on the environment. By checking `api.env('test')`, developers can enable or disable Babel presets and plugins specifically for Jest's testing environment.

```javascript
module.exports = api => {
  const isTest = api.env('test');
  // You can use isTest to determine what presets and plugins to use.

  return {
    // ...
  };
};
```

--------------------------------

### Configure basic Babel preset-env for Node.js

Source: https://github.com/jestjs/jest/blob/main/README.md

Sets up a `babel.config.js` file to configure Babel, targeting the current Node.js version. This ensures code is transpiled correctly for the test environment.

```javascript
// babel.config.js
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```

--------------------------------

### Illustrate Jest beforeEach and afterEach Hook Execution Order

Source: https://github.com/jestjs/jest/blob/main/docs/SetupAndTeardown.md

This JavaScript example demonstrates the execution order of `beforeEach` and `afterEach` hooks in Jest, including how they behave with nested `describe` blocks. It shows that `beforeEach` hooks run in declaration order, while `afterEach` hooks for the enclosing scope run before those of the inner scope, allowing for proper resource setup and teardown.

```javascript
beforeEach(() => console.log('connection setup'));
beforeEach(() => console.log('database setup'));

afterEach(() => console.log('database teardown'));
afterEach(() => console.log('connection teardown'));

test('test 1', () => console.log('test 1'));

describe('extra', () => {
  beforeEach(() => console.log('extra database setup'));
  afterEach(() => console.log('extra database teardown'));

  test('test 2', () => console.log('test 2'));
});

// Expected console output:
// connection setup
// database setup
// test 1
// database teardown
// connection teardown

// connection setup
// database setup
// extra database setup
// test 2
// extra database teardown
// database teardown
// connection teardown
```

--------------------------------

### Add Jest test script to package.json

Source: https://github.com/jestjs/jest/blob/main/docs/GettingStarted.md

Adds a `test` script to the `scripts` section of `package.json`. This allows running all Jest tests in the project simply by executing `npm test` or `yarn test` from the command line.

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

--------------------------------

### Implement Jest Global Setup with Async JavaScript

Source: https://github.com/jestjs/jest/blob/main/docs/Configuration.md

Provides a JavaScript example of a `globalSetup` module. This module exports an asynchronous function that runs once before all test suites, allowing access to Jest's `globalConfig` and `projectConfig`. It also demonstrates how to set a global variable (`globalThis.__MONGOD__`) for later use in a teardown script.

```js
module.exports = async function (globalConfig, projectConfig) {
  console.log(globalConfig.testPathPatterns);
  console.log(projectConfig.cache);

  // Set reference to mongod in order to close the server during teardown.
  globalThis.__MONGOD__ = mongod;
};
```

--------------------------------

### Configure Babel for Node.js environment in Jest

Source: https://github.com/jestjs/jest/blob/main/docs/GettingStarted.md

Creates a `babel.config.js` file to configure Babel presets. This specific configuration targets the current Node.js version, ensuring that code is transpiled correctly for the testing environment when using Jest.

```javascript
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```

--------------------------------

### Install Jest Project Dependencies with Yarn

Source: https://github.com/jestjs/jest/blob/main/CONTRIBUTING.md

Run `yarn install` to download and set up all required project dependencies for the Jest development environment. Ensure `corepack enable` has been run first to manage Yarn.

```sh
yarn install
```

--------------------------------

### Write a basic Jest test for a JavaScript function

Source: https://github.com/jestjs/jest/blob/main/docs/GettingStarted.md

Defines a `sum.test.js` file containing a Jest test suite. It imports the `sum` function and uses `expect` with `toBe` to assert that `sum(1, 2)` returns `3`, demonstrating a fundamental test case.

```javascript
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

--------------------------------

### Example Project Directory Structure

Source: https://github.com/jestjs/jest/blob/main/docs/ManualMocks.md

Illustrates the hierarchical organization of files and directories within the example project, highlighting the placement of source code, test files, and mock implementations.

```bash
.
├── config
├── __mocks__
│   └── fs.js
├── models
│   ├── __mocks__
│   │   └── user.js
│   └── user.js
├── node_modules
└── views
```

--------------------------------

### Create Jest-aware conditional Babel configuration

Source: https://github.com/jestjs/jest/blob/main/README.md

Illustrates how to make `babel.config.js` context-aware using `api.env('test')`. This allows conditional loading of presets and plugins, optimizing Babel configuration specifically for the Jest test environment.

```javascript
// babel.config.js
module.exports = api => {
  const isTest = api.env('test');
  // You can use isTest to determine what presets and plugins to use.

  return {
    // ...
  };
};
```

--------------------------------

### Install jest-each Library

Source: https://github.com/jestjs/jest/blob/main/packages/jest-each/README.md

Instructions for installing the `jest-each` library using npm or yarn as a development dependency.

```shell
npm i --save-dev jest-each
```

```shell
yarn add -D jest-each
```