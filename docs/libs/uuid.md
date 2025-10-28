### Instalar e executar o exemplo uuidjs

Fonte: https://github.com/uuidjs/uuid/blob/main/examples/browser-esmodules/README.md

Trecho com os comandos para instalar as dependências do projeto via npm e iniciar o servidor de desenvolvimento do exemplo `uuidjs`. Pressupõe que Node.js e npm estejam instalados.

```bash
npm install
npm start
```

--------------------------------

### Comandos de instalação e inicialização

Fonte: https://github.com/uuidjs/uuid/blob/main/examples/browser-webpack/README.md

Comandos para instalar dependências do projeto e iniciar o servidor de desenvolvimento usando npm. Normalmente, esse é o primeiro passo para rodar os exemplos.

```bash
npm install
npm start
```

--------------------------------

### Instalar e iniciar o projeto

Fonte: https://github.com/uuidjs/uuid/blob/main/examples/browser-rollup/README.md

Comandos para instalar as dependências e iniciar o servidor de desenvolvimento com npm.

```shell
npm install
npm start
```

--------------------------------

### Instalar e testar o pacote uuid

Fonte: https://github.com/uuidjs/uuid/blob/main/examples/node-esmodules/README.md

Comandos para instalar a biblioteca `uuid` e executar sua suíte de testes. Certifique-se de que Node.js e npm estejam instalados.

```shell
npm install
npm test
```

--------------------------------

### Instalar dependências de desenvolvimento

Fonte: https://github.com/uuidjs/uuid/blob/main/CONTRIBUTING.md

Instala as dependências necessárias ao desenvolvimento do projeto `uuidjs/uuid` usando o npm.

```shell
npm install
```

--------------------------------

### Instalar e testar o exemplo Node.js com Webpack

Fonte: https://github.com/uuidjs/uuid/blob/main/examples/node-webpack/README.md

Mostra como instalar dependências e executar testes para um projeto Node.js configurado com Webpack. Presume-se que Node.js e npm estão instalados.

```shell
npm install
npm test
```

--------------------------------

### Instalar e testar TypeScript

Fonte: https://github.com/uuidjs/uuid/blob/main/examples/typescript/README.md

Exemplo com os comandos para instalar dependências do projeto e executar os testes. O processo de teste envolve rodar o compilador TypeScript (`tsc`) com a versão mais antiga suportada pelo projeto.

```bash
npm install
npm test
```

--------------------------------

### Instalar e testar uuid.js

Fonte: https://github.com/uuidjs/uuid/blob/main/examples/node-jest/README.md

Comandos para instalar dependências necessárias e executar os testes do projeto `uuid.js` usando o npm.

```shell
npm install
npm test
```

--------------------------------

### Iniciar benchmark no navegador

Fonte: https://github.com/uuidjs/uuid/blob/main/examples/benchmark/README.md

Inicia o servidor de desenvolvimento necessário para executar o benchmark em um navegador. Após executar este comando, abra `benchmark.html` no navegador para ver os resultados.

```bash
npm run start
```

--------------------------------

### Instalar dependências do uuidjs

Fonte: https://github.com/uuidjs/uuid/blob/main/examples/benchmark/README.md

Instala as dependências necessárias para o projeto `uuidjs` usando o npm. Execute este comando antes de rodar benchmarks ou scripts de teste.

```bash
npm install
```

--------------------------------

### Instalar o pacote uuid

Fonte: https://github.com/uuidjs/uuid/blob/main/README.md

Instruções para instalar o pacote `uuid` via npm. Esse é o primeiro passo para usar a biblioteca no seu projeto.

```shell
npm install uuid
```

--------------------------------

### Instalar o pacote uuid

Fonte: https://github.com/uuidjs/uuid/blob/main/README_js.md

Comando para instalar a biblioteca `uuid` usando o npm.

```shell
npm install uuid
```

--------------------------------

### uuidjs: exemplo de obtenção da versão do UUID

Fonte: https://github.com/uuidjs/uuid/blob/main/README_js.md

Demonstra como usar a função `uuid.version()` para detectar a versão RFC de uma string UUID em JavaScript.

```javascript
import { version as uuidVersion } from 'uuid';

uuidVersion('45637ec4-c85f-11ea-87d0-0242ac130003'); // RESULT
uuidVersion('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'); // RESULT
```

--------------------------------

### Gerar um UUID v4

Fonte: https://github.com/uuidjs/uuid/blob/main/README.md

Exemplo rápido demonstrando como importar e usar a função `uuidv4` para gerar um UUID aleatório. Este é o uso mais comum para gerar identificadores únicos.

```javascript
import { v4 as uuidv4 } from 'uuid';

uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

--------------------------------

### Verificar tamanhos dos bundles

Fonte: https://github.com/uuidjs/uuid/blob/main/examples/browser-rollup/README.md

Comando para exibir o uso de disco dos arquivos de distribuição gerados, demonstrando a eficácia do treeshaking para diferentes versões de UUID.

```shell
$ du -sh dist/*
 20K  dist/all.js
8.0K  dist/v1.js
4.0K  dist/v4.js
4.0K  dist/v7.js
```

--------------------------------

### Regenerar README

Fonte: https://github.com/uuidjs/uuid/blob/main/CONTRIBUTING.md

Comando para regenerar o arquivo `README.md` a partir da sua fonte (`README_js.md`), garantindo consistência na documentação.

```shell
npm run docs
```

--------------------------------

### Exemplo de uso de uuid.version()

Fonte: https://github.com/uuidjs/uuid/blob/main/README.md

Mostra como importar e usar a função `version` da biblioteca `uuid` em JavaScript para determinar a versão RFC de diferentes strings UUID.

```javascript
import { version as uuidVersion } from 'uuid';

uuidVersion('45637ec4-c85f-11ea-87d0-0242ac130003'); // ⇨ 1
uuidVersion('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'); // ⇨ 4
```

--------------------------------

### Executar testes

Fonte: https://github.com/uuidjs/uuid/blob/main/CONTRIBUTING.md

Executa a suíte de testes do projeto, incluindo testes específicos para Node.js, para garantir a qualidade do código antes de submeter alterações.

```shell
npm test && npm run test:node
```

```shell
npm test
```

--------------------------------

### Saída do Webpack (treeshaking)

Fonte: https://github.com/uuidjs/uuid/blob/main/examples/browser-webpack/README.md

Mostra a saída do processo de build do Webpack, demonstrando o tamanho e os nomes dos chunks gerados após o treeshaking. Isso confirma que apenas o código necessário foi incluído nos bundles finais.

```shell
Asset      Size  Chunks             Chunk Names
all.js  8.54 KiB       0  [emitted]  all
 v1.js   2.6 KiB       1  [emitted]  v1
 v4.js     2 KiB       2  [emitted]  v4
```

--------------------------------

### Gerar UUID v4 (exemplo)

Fonte: https://github.com/uuidjs/uuid/blob/main/README_js.md

Exemplo de geração de um UUID de Versão 4 (aleatório) utilizando a biblioteca `uuid` e importando a função `v4`.

```javascript
import { v4 as uuidv4 } from 'uuid';

uuidv4(); // RESULT
```

--------------------------------

### Executar benchmark em Node.js

Fonte: https://github.com/uuidjs/uuid/blob/main/examples/benchmark/README.md

Executa os testes de benchmark do `uuidjs` em um ambiente Node.js. Normalmente usado após instalar dependências para avaliar performance.

```bash
npm test
```

--------------------------------

### Configuração para testes determinísticos

Fonte: https://github.com/uuidjs/uuid/blob/main/README_js.md

Este trecho JavaScript configura o ambiente para geração determinística de UUIDs durante testes ou execução de documentação. Ele faz shims em `crypto` e `Date` do Node.js para garantir saídas consistentes.

```javascript
import crypto from "node:crypto";

runmd.onRequire = (path) => {
  if (path == 'rng') return fun;
  return path.replace(/^uuid/, './dist/');
};

// Substitui Date e crypto para que os ids gerados sejam consistentes entre revisões da documentação
runmd.Date.now = () => 1551914748172;

let seed = 0xdefaced;
crypto.randomFillSync = function (a) {
  for (let i = 0; i < a.length; i++) a[i] = (seed = (seed * 0x41a7) & 0x7fffffff) & 0xff;
  return a;
};

// Impede o uso da implementação nativa randomUUID para garantir UUIDs determinísticos
crypto.randomUUID = undefined;
```

--------------------------------

### Constante uuid.NIL

Fonte: https://github.com/uuidjs/uuid/blob/main/README.md

A NIL UUID é um UUID especial onde os 128 bits estão todos zerados. É frequentemente usado como placeholder ou valor padrão. Exemplo de importação e uso:

```javascript
import { NIL as NIL_UUID } from 'uuid';

NIL_UUID; // ⇨ '00000000-0000-0000-0000-000000000000'
```

--------------------------------

### Constante uuid.MAX

Fonte: https://github.com/uuidjs/uuid/blob/main/README.md

A MAX UUID é um UUID especial onde os 128 bits estão todos com valor um. Este exemplo mostra como importar e acessar essa constante.

```javascript
import { MAX as MAX_UUID } from 'uuid';

MAX_UUID; // ⇨ 'ffffffff-ffff-ffff-ffff-ffffffffffff'
```

--------------------------------

### uuid.validate e uuid.version: validar e obter versão do UUID

Fonte: https://github.com/uuidjs/uuid/blob/main/README_js.md

Funções para validar se uma string tem formato de UUID e para retornar sua versão. Podem ser usadas em conjunto para validação específica por versão.

```APIDOC
uuid.validate(str)
  - Testa se uma string é um UUID válido.
  - Parâmetros:
    - str: String - A string a ser validada.
  - Retorna: Boolean - `true` se a string for um UUID válido, `false` caso contrário.

uuid.version(str)
  - Retorna o número da versão de uma string UUID.
  - Parâmetros:
    - str: String - A string UUID.
  - Retorna: Number - A versão do UUID (1-7), ou `0` se inválido ou versão desconhecida.

  - Exemplo:
    ```javascript
    import { version as uuidVersion } from 'uuid';
    import { validate as uuidValidate } from 'uuid';

uuidValidate('not a UUID'); // false
uuidValidate('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'); // true
uuidVersion('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'); // 4

function uuidValidateV4(uuid) {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
}

const v4Uuid = '109156be-c4fb-41ea-b1b4-efe1671c5836';
uuidValidateV4(v4Uuid); // true
    ```
```

--------------------------------

### Resolvendo 'getRandomValues() not supported' no React Native/Expo

Fonte: https://github.com/uuidjs/uuid/blob/main/README.md

Instruções para contornar o erro 'getRandomValues() not supported' em ambientes React Native ou Expo instalando e importando o polyfill `react-native-get-random-values` antes de importar a biblioteca `uuid`.

```javascript
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
```

--------------------------------

### uuid.stringify: Convert Byte Array to UUID String

Source: https://github.com/uuidjs/uuid/blob/main/README.md

Converts an array of bytes into a standard UUID string format. It requires an array-like collection of 16 byte values and an optional offset to specify the starting index. The function returns the formatted UUID string or throws a TypeError if conversion fails.

```javascript
import { stringify as uuidStringify } from 'uuid';

const uuidBytes = Uint8Array.of(
  0x6e,
  0xc0,
  0xbd,
  0x7f,
  0x11,
  0xc0,
  0x43,
  0xda,
  0x97,
  0x5e,
  0x2a,
  0x8a,
  0xd9,
  0xeb,
  0xae,
  0x0b
);

uuidStringify(uuidBytes); // ⇨ '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'
```

--------------------------------

### uuidjs: Command Line Generation

Source: https://github.com/uuidjs/uuid/blob/main/README_js.md

Shows how to generate UUIDs from the command line using `npx uuid` and lists available generation commands and their usage.

```shell
$ npx uuid
ddeb27fb-d9a0-4624-be4d-4615062daed4

$ npx uuid --help

Usage:
  uuid
  uuid v1
  uuid v3 <name> <namespace uuid>
  uuid v4
  uuid v5 <name> <namespace uuid>
  uuid v7
  uuid --help

Note: <namespace uuid> may be "URL" or "DNS" to use the corresponding UUIDs
defined by RFC9562
```

--------------------------------

### Command Line Help and Usage

Source: https://github.com/uuidjs/uuid/blob/main/README.md

Provides details on the command-line interface for the uuid package, including available commands for generating different UUID versions and using namespace UUIDs.

```shell
$ npx uuid --help

Usage:
  uuid
  uuid v1
  uuid v3 <name> <namespace uuid>
  uuid v4
  uuid v5 <name> <namespace uuid>
  uuid v7
  uuid --help

Note: <namespace uuid> may be "URL" or "DNS" to use the corresponding UUIDs
defined by RFC9562
```

--------------------------------

### Command Line UUID Generation

Source: https://github.com/uuidjs/uuid/blob/main/README.md

Shows how to generate UUIDs from the command line using the `uuid` package. It defaults to version 4 but supports generating other versions like v1, v3, v5, and v7.

```shell
$ npx uuid
ddeb27fb-d9a0-4624-be4d-4615062daed4
```

--------------------------------

### uuid.v1(), uuid.v3(), uuid.v4(), uuid.v5(), uuid.v6(), uuid.v7()

Source: https://github.com/uuidjs/uuid/blob/main/README.md

This block covers the core UUID generation functions. `v1` uses timestamp and MAC address, `v3` and `v5` use namespace and MD5/SHA-1 hashing respectively, `v4` uses random numbers, `v6` is a time-ordered UUID, and `v7` is an epoch time-based UUID.

```APIDOC
uuid.v1(options, buffer, offset)
  Create a version 1 (timestamp) UUID.
  Parameters:
    options: Optional object for configuration (e.g., node, clockseq).
    buffer: Optional `Uint8Array` to write the UUID to.
    offset: Optional offset in the buffer.
  Returns:
    A UUID string or the buffer if provided.

uuid.v3(name, namespace, buffer, offset)
  Create a version 3 (namespace w/ MD5) UUID.
  Parameters:
    name: The name to hash.
    namespace: The namespace UUID (e.g., `v5.URL`).
    buffer: Optional `Uint8Array` to write the UUID to.
    offset: Optional offset in the buffer.
  Returns:
    A UUID string or the buffer if provided.

uuid.v4(options, buffer, offset)
  Create a version 4 (random) UUID.
  Parameters:
    options: Optional object for configuration (e.g., random).
    buffer: Optional `Uint8Array` to write the UUID to.
    offset: Optional offset in the buffer.
  Returns:
    A UUID string or the buffer if provided.

uuid.v5(name, namespace, buffer, offset)
  Create a version 5 (namespace w/ SHA-1) UUID.
  Parameters:
    name: The name to hash.
    namespace: The namespace UUID (e.g., `v5.URL`).
    buffer: Optional `Uint8Array` to write the UUID to.
    offset: Optional offset in the buffer.
  Returns:
    A UUID string or the buffer if provided.

uuid.v6(options, buffer, offset)
  Create a version 6 (timestamp, reordered) UUID.
  Parameters:
    options: Optional object for configuration.
    buffer: Optional `Uint8Array` to write the UUID to.
    offset: Optional offset in the buffer.
  Returns:
    A UUID string or the buffer if provided.

uuid.v7(options, buffer, offset)
  Create a version 7 (Unix Epoch time-based) UUID.
  Parameters:
    options: Optional object for configuration (e.g., timestamp, node).
    buffer: Optional `Uint8Array` to write the UUID to.
    offset: Optional offset in the buffer.
  Returns:
    A UUID string or the buffer if provided.
```

--------------------------------

### uuid.v3() and uuid.v5() - Namespace UUIDs

Source: https://github.com/uuidjs/uuid/blob/main/README_js.md

Generates Version 3 (MD5) and Version 5 (SHA-1) UUIDs by hashing a name within a given namespace. Requires a namespace UUID and the name string.

```APIDOC
uuid.v3(name, namespace)
  Creates a version 3 (namespace w/ MD5) UUID.
  Parameters:
    - name: The name to hash.
    - namespace: The namespace UUID (e.g., uuid.v5.URL).
  Returns:
    - string: The generated Version 3 UUID string.
  Example:
    import { v3 as uuidv3, v5 as uuidv5, DNS } from 'uuid';
    uuidv3('hello.example.com', DNS); // RESULT

uuid.v5(name, namespace)
  Creates a version 5 (namespace w/ SHA-1) UUID.
  Parameters:
    - name: The name to hash.
    - namespace: The namespace UUID (e.g., uuid.v5.URL).
  Returns:
    - string: The generated Version 5 UUID string.
  Example:
    import { v3 as uuidv3, v5 as uuidv5, DNS } from 'uuid';
    uuidv5('hello.example.com', DNS); // RESULT
```

--------------------------------

### Handling Options for Timestamp UUIDs

Source: https://github.com/uuidjs/uuid/blob/main/README.md

Explains the behavior change in uuid@11 regarding the `options` argument for timestamp-based UUIDs (v1, v6, v7). Using `options` prevents interference with internal state for uniqueness, applying defaults instead.

```APIDOC
options Handling for Timestamp UUIDs:

Prior to uuid@11, it was possible for `options` state to interfere with the internal state used to ensure uniqueness of timestamp-based UUIDs (the `v1()`, `v6()`, and `v7()` methods).

Starting with uuid@11, this issue has been addressed by using the presence of the `options` argument as a flag to select between two possible behaviors:

- Without `options`: Internal state is utilized to improve UUID uniqueness.
- With `options`: Internal state is **NOT** used and, instead, appropriate defaults are applied as needed.
```

--------------------------------

### uuidjs: Handling Options for Timestamp UUIDs

Source: https://github.com/uuidjs/uuid/blob/main/README_js.md

Explains the behavior change in `uuid@11` regarding the `options` argument for timestamp-based UUIDs (v1, v6, v7), detailing how it affects internal state usage for uniqueness.

```APIDOC
options Handling for Timestamp UUIDs

Prior to `uuid@11`, it was possible for `options` state to interfere with the internal state used to ensure uniqueness of timestamp-based UUIDs (the `v1()`, `v6()`, and `v7()` methods). Starting with `uuid@11`, this issue has been addressed by using the presence of the `options` argument as a flag to select between two possible behaviors:

- Without `options`: Internal state is utilized to improve UUID uniqueness.
- With `options`: Internal state is **NOT** used and, instead, appropriate defaults are applied as needed.
```

--------------------------------

### uuid.v1() - Timestamp UUID

Source: https://github.com/uuidjs/uuid/blob/main/README_js.md

Generates a Version 1 UUID based on the current timestamp and MAC address. It supports optional configuration for buffer and offset.

```APIDOC
uuid.v1(options, buffer, offset)
  Creates a version 1 (timestamp) UUID.
  Parameters:
    - options: Optional object for configuration (e.g., node, clockseq).
    - buffer: Optional buffer to write the UUID to.
    - offset: Optional offset within the buffer.
  Returns:
    - string: The generated Version 1 UUID string.
    - Uint8Array[16]: If buffer is provided, returns the buffer.
  Example:
    import { v1 as uuidv1 } from 'uuid';
    uuidv1(); // RESULT
```

--------------------------------

### uuid.v5: Create RFC v5 UUID

Source: https://github.com/uuidjs/uuid/blob/main/README_js.md

Generates an RFC version 5 UUID using a namespace and a name. It supports custom or predefined namespaces like DNS and URL. The function can optionally write the UUID to a buffer.

```APIDOC
uuid.v5(name, namespace[, buffer[, offset]])
  - Creates an RFC version 5 (namespace w/ SHA-1) UUID.
  - Parameters:
    - name: String | Array - The name to generate the UUID from.
    - namespace: String | Array[16] - The namespace UUID. Predefined namespaces `v5.DNS` and `v5.URL` are available.
    - buffer: Uint8Array | Buffer (optional) - If provided, the binary UUID is written into this array starting at `offset`.
    - offset: Number (optional, defaults to 0) - The index to start writing UUID bytes in `buffer`.
  - Returns: UUID String if no `buffer` is specified, otherwise returns the `buffer`.
  - Example:
    ```javascript
    import { v5 as uuidv5 } from 'uuid';
    const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
    uuidv5('Hello, World!', MY_NAMESPACE);
    uuidv5('https://www.w3.org/', uuidv5.URL);
    ```
```

--------------------------------

### uuid.v1ToV6() and uuid.v6ToV1()

Source: https://github.com/uuidjs/uuid/blob/main/README.md

These functions provide conversion utilities between version 1 and version 6 UUIDs. `v1ToV6` converts a v1 UUID to its v6 equivalent, and `v6ToV1` performs the reverse conversion.

```APIDOC
uuid.v1ToV6(uuid)
  Create a version 6 UUID from a version 1 UUID.
  Parameters:
    uuid: A version 1 UUID string.
  Returns:
    A version 6 UUID string.

uuid.v6ToV1(uuid)
  Create a version 1 UUID from a version 6 UUID.
  Parameters:
    uuid: A version 6 UUID string.
  Returns:
    A version 1 UUID string.
```

--------------------------------

### uuid.v7() - Epoch Time-Based UUID

Source: https://github.com/uuidjs/uuid/blob/main/README_js.md

Generates a Version 7 UUID, a time-based UUID format leveraging Unix Epoch time. It supports optional configuration for buffer and offset.

```APIDOC
uuid.v7(options, buffer, offset)
  Creates a version 7 (Unix Epoch time-based) UUID.
  Parameters:
    - options: Optional object for configuration (e.g., timestamp, random).
    - buffer: Optional buffer to write the UUID to.
    - offset: Optional offset within the buffer.
  Returns:
    - string: The generated Version 7 UUID string.
    - Uint8Array[16]: If buffer is provided, returns the buffer.
  Example:
    import { v7 as uuidv7 } from 'uuid';
    uuidv7(); // RESULT
```