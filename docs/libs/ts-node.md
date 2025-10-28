### Exemplo: uso do ts-node com ESM

Fonte: https://github.com/typestrong/ts-node/blob/main/esm-usage-example/README.md

Navegue até o diretório do exemplo, verifique a versão do Node.js, instale as dependências e execute o `index.js` usando o loader ESM do `ts-node`. Inclui instruções para rodar a partir de um pacote instalado ou de um ambiente de desenvolvimento local.

```shell
cd ./esm-usage-example # Deve estar neste diretório
node -v # Requer node v13

# Instale a branch do GitHub via npm
npm install
node --loader ts-node/esm ./index.js

# Ou, se estiver desenvolvendo localmente
node --loader ../esm.mjs ./index

```

--------------------------------

### Executar o site de documentação localmente (Yarn / Docusaurus)

Fonte: https://github.com/typestrong/ts-node/blob/main/CONTRIBUTING.md

Comandos para navegar até o diretório de documentação, instalar dependências com `yarn` e iniciar o servidor de desenvolvimento Docusaurus. Útil para colaboradores visualizarem alterações de documentação antes de commitar.

```Shell
cd ./website
yarn
yarn start
```

--------------------------------

### Usando o ts-node na linha de comando (Shell)

Fonte: https://github.com/typestrong/ts-node/blob/main/README.md

Exemplos na linha de comando para executar arquivos TypeScript, abrir um REPL, avaliar strings de código, usar pipe e modos específicos como `--transpileOnly` e `--esm`.

```shell
# Execute um script (equivalente a `node` + `tsc`).
ts-node script.ts

# Inicia um REPL TypeScript.
ts-node

# Executa código TypeScript diretamente.
ts-node -e 'console.log("Hello, world!")'

# Executa e imprime uma expressão.
ts-node -p -e '"Hello, world!"'

# Pipe: executa scripts via stdin.
echo 'console.log("Hello, world!")' | ts-node

# Equivalente a ts-node --transpileOnly
ts-node-transpile-only script.ts

# Equivalente a ts-node --cwdMode
ts-node-cwd script.ts

# Equivalente a ts-node --esm
ts-node-esm script.ts
```

--------------------------------

### Instalando o ts-node e dependências (Shell)

Fonte: https://github.com/typestrong/ts-node/blob/main/website/docs/installation.md

Comandos para instalar `ts-node` e dependências via npm. Cobre instalação local (recomendada para versões específicas do projeto) e global; inclui também `tslib` e `@types/node` quando necessários pela configuração do projeto.

```shell
# Localmente no projeto
npm install -D typescript
npm install -D ts-node

# Ou globalmente
npm install -g typescript
npm install -g ts-node

# Dependências adicionais (se necessário)
npm install -D tslib @types/node
```

--------------------------------

### Scripts principais do projeto (Yarn)

Fonte: https://github.com/typestrong/ts-node/blob/main/CONTRIBUTING.md

Comandos `yarn` usados para tarefas comuns de desenvolvimento: instalar dependências, compilar, executar testes e formatar código. São úteis para entender o fluxo de build do projeto.

```Shell
yarn
yarn build
yarn test
yarn fmt
```

--------------------------------

### Instalando ts-node e dependências (README)

Fonte: https://github.com/typestrong/ts-node/blob/main/README.md

Exemplo de comandos para instalar `ts-node` e dependências essenciais (`typescript`, `tslib`, `@types/node`), tanto localmente quanto globalmente via npm.

```shell
# Localmente no projeto
npm install -D typescript
npm install -D ts-node

# Ou globalmente
npm install -g typescript
npm install -g ts-node

# Dependências adicionais (se necessário)
npm install -D tslib @types/node
```

--------------------------------

### Instalando dependências do SWC para ts-node (Shell)

Fonte: https://github.com/typestrong/ts-node/blob/main/README.md

Comando para instalar dependências de desenvolvimento necessárias quando se usa SWC como transpiler com `ts-node` (`@swc/core`, `@swc/helpers`, `regenerator-runtime`). O `@swc/helpers` é necessário se `importHelpers` estiver habilitado; `regenerator-runtime` é usado para compatibilidade com alvos que dependem de `async/await`.

```shell
npm i -D @swc/core @swc/helpers regenerator-runtime
```

--------------------------------

### Criando e iniciando um REPL do ts-node

Fonte: https://github.com/typestrong/ts-node/blob/main/development-docs/repl-api.md

Exemplo de como inicializar um serviço REPL do `ts-node`, registrar um serviço de compilação associado ao REPL e, em seguida, iniciar o REPL integrado do `ts-node` ou integrar sua função de avaliação a um REPL padrão do Node.js.

```TypeScript
import * as tsnode from 'ts-node';
const repl = tsnode.createRepl();
const service = tsnode.register({
  ... options,
  ...repl.evalAwarePartialHost
});
repl.setService(service);

// Inicia o REPL do ts-node
repl.start();

// ou integra ao REPL do Node
const nodeRepl = require('repl').start({
  ...options,
  eval: repl.nodeEval
});
```

--------------------------------

### Publish Release - np - Shell

Source: https://github.com/typestrong/ts-node/blob/main/CONTRIBUTING.md

Publishes a new release using the `np` tool from the `main` branch, skipping local tests and relying on CI.

```Shell
np --branch main --no-tests
```

--------------------------------

### Running ts-node-npx-example with npx

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/recipes/npx-and-yarn-dlx.md

Demonstrates how to execute a TypeScript tool published via `npx` or `yarn dlx` using the `ts-node-npx-example` project. Shows examples for displaying help and passing command-line arguments.

```shell
npx typestrong/ts-node-npx-example --help
npx typestrong/ts-node-npx-example --first Arthur --last Dent
```

--------------------------------

### Starting ts-node REPL

Source: https://github.com/typestrong/ts-node/blob/main/README.md

Shows the command to force ts-node to open an interactive Read-Eval-Print Loop (REPL) session.

```Shell
ts-node -i
```

--------------------------------

### Install SWC Dependencies via npm

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/swc.md

Installs the necessary packages for using SWC with ts-node, including the core SWC transpiler, helpers for features like `importHelpers`, and `regenerator-runtime` for older targets with async/await or generators.

```shell
npm i -D @swc/core @swc/helpers regenerator-runtime
```

--------------------------------

### Example TypeScript Module Declaration

Source: https://github.com/typestrong/ts-node/blob/main/README.md

Example of a TypeScript module declaration file (`.d.ts`) used within a directory configured in `typeRoots`. It shows the basic structure for declaring types for a specific module.

```TypeScript
declare module '<module_name>' {
    // module definitions go here
}
```

--------------------------------

### Bootstrapping ts-node with ESM Loader (Shell)

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/options.md

Starts ts-node using the experimental Node.js ECMAScript Module (ESM) loader, enabling full ESM support.

```shell
ts-node --esm
ts-node-esm
```

--------------------------------

### Checking ts-node Version (Shell)

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/options.md

Prints the version of ts-node. Use `-vv` to include node and typescript compiler versions, and `-vvv` for absolute paths to installations.

```shell
ts-node -v
ts-node -vvv
```

--------------------------------

### Build README - ts-node - Shell

Source: https://github.com/typestrong/ts-node/blob/main/CONTRIBUTING.md

Rebuilds the README.md file, which is necessary before publishing to npmjs.com.

```Shell
yarn build-readme
```

--------------------------------

### Command Line Usage with ts-node (Shell)

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/usage.md

Demonstrates various ways to execute TypeScript code directly from the command line using `ts-node`, including running scripts, starting a REPL, evaluating code strings, piping input, and using mode-specific commands.

```shell
# Execute a script as `node` + `tsc`.
ts-node script.ts

# Starts a TypeScript REPL.
ts-node

# Execute code with TypeScript.
ts-node -e 'console.log("Hello, world!")'

# Execute, and print, code with TypeScript.
ts-node -p -e '"Hello, world!"'

# Pipe scripts to execute with TypeScript.
echo 'console.log("Hello, world!")' | ts-node

# Equivalent to ts-node --transpileOnly
ts-node-transpile-only script.ts

# Equivalent to ts-node --cwdMode
ts-node-cwd script.ts

# Equivalent to ts-node --esm
ts-node-esm script.ts
```

--------------------------------

### Passing CLI Flags to ts-node (Shell)

Source: https://github.com/typestrong/ts-node/blob/main/README.md

Example demonstrating the correct syntax for passing CLI flags to ts-node, showing that flags must precede the entrypoint script.

```shell
ts-node --project tsconfig-dev.json say-hello.ts Ronald
```

--------------------------------

### Using ts-node with Shebang (Basic) (TypeScript)

Source: https://github.com/typestrong/ts-node/blob/main/README.md

Example of a TypeScript script using a shebang (#/usr/bin/env ts-node) to execute directly, relying on tsconfig.json for configuration options.

```typescript
#!/usr/bin/env ts-node

// ts-node options are read from tsconfig.json

console.log("Hello, world!")
```

--------------------------------

### Update Docs Branch - Git - Shell

Source: https://github.com/typestrong/ts-node/blob/main/CONTRIBUTING.md

Forces the `docs` branch on the origin remote to point to the head of the local `main` branch, used to rebuild the website after a release.

```Shell
git push --force origin main:docs
```

--------------------------------

### Extending tsconfig.json with @tsconfig/bases (JSON)

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/configuration.md

Shows how to use the 'extends' property in tsconfig.json to inherit recommended configurations from @tsconfig/bases, either bundled with ts-node or installed separately.

```json
{
  "extends": "ts-node/node16/tsconfig.json",

  // Or install directly with `npm i -D @tsconfig/node16`
  "extends": "@tsconfig/node16/tsconfig.json"
}
```

--------------------------------

### Using ts-node with Shebang and env -S (TypeScript)

Source: https://github.com/typestrong/ts-node/blob/main/README.md

Example of a TypeScript script using a shebang with env -S to pass options directly, compatible with newer versions of env on Mac and Linux.

```typescript
#!/usr/bin/env -S ts-node --files
// This shebang works on Mac and Linux with newer versions of env
// Technically, Mac allows omitting `-S`, but Linux requires it
```

--------------------------------

### Running Subset of Tests (Yarn/AVA)

Source: https://github.com/typestrong/ts-node/blob/main/CONTRIBUTING.md

Commands to execute a specific subset of tests using the AVA test runner. The first command uses AVA's --match flag with wildcards to filter tests by name based on the test or suite description. The second command runs tests contained within a specific compiled test file located in the dist directory.

```Shell
# Use ava's --match flag to match the name of a test or suite
# https://github.com/avajs/ava/blob/main/docs/05-command-line.md
# Don't forget the * wildcards
yarn test --match '*esm loader*'

# Or pass a filename as it exists in the compiled output
# To run the tests in ./src/test/diagnostics.spec.ts
yarn test ./dist/test/diagnostics.spec.js
```

--------------------------------

### Extending @tsconfig/bases in tsconfig.json

Source: https://github.com/typestrong/ts-node/blob/main/README.md

Demonstrates how to use the extends property in tsconfig.json to inherit configurations from @tsconfig/bases, either bundled with ts-node or installed separately.

```JSONC
{
  "extends": "ts-node/node16/tsconfig.json",

  // Or install directly with `npm i -D @tsconfig/node16`
  "extends": "@tsconfig/node16/tsconfig.json",
}
```

--------------------------------

### Configuring paths in tsconfig.json

Source: https://github.com/typestrong/ts-node/blob/main/README.md

Example tsconfig.json demonstrating the use of the `paths` compiler option for module mapping. This allows resolving custom module paths, such as mapping 'custom-module-type' to a local directory 'types/custom-module-type'.

```JSONC
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "custom-module-type": ["types/custom-module-type"]
    }
  }
}
```

--------------------------------

### Defining ReplService Interface in TypeScript

Source: https://github.com/typestrong/ts-node/blob/main/api-extractor/ts-node.api.md

Defines a public interface 'ReplService' for interacting with ts-node's REPL functionality. It includes methods for evaluating code, interacting with Node's `vm.runInContext`, setting the underlying service, starting the REPL, and accessing the evaluation state.

```TypeScript
// @public (undocumented)
export interface ReplService {
    // (undocumented)
    evalAwarePartialHost: EvalAwarePartialHost;
    evalCode(code: string): any;
    nodeEval(code: string, context: any, _filename: string, callback: (err: Error | null, result?: any) => any): void;
    setService(service: Service): void;
    start(): void;
    // @deprecated
    start(code: string): void;
    // (undocumented)
    readonly state: EvalState;
}
```

--------------------------------

### Example of Optional Chaining in TypeScript

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/troubleshooting.md

This TypeScript snippet demonstrates the use of the optional chaining operator (?.), which is valid TypeScript syntax. Depending on the tsconfig.json 'target' setting, this syntax may or may not be transformed during compilation.

```typescript
export {};
var foo: {bar: string} | undefined;
// ---cut---
const bar: string | undefined = foo?.bar;
```

--------------------------------

### Integrating ts-node with Node Flags and Tools (Shell)

Source: https://github.com/typestrong/ts-node/blob/main/README.md

Examples showing how to register ts-node using node -r ts-node/register or node --loader ts-node/esm, often via the NODE_OPTIONS environment variable, to enable ts-node within other Node.js processes or tools.

```shell
NODE_OPTIONS="-r ts-node/register --no-warnings" node ./index.ts
```

```shell
NODE_OPTIONS="--loader ts-node/esm"
```

```shell
node --loader ts-node/esm --inspect ./index.ts
```

--------------------------------

### Downleveling Optional Chaining Syntax

Source: https://github.com/typestrong/ts-node/blob/main/README.md

This example demonstrates how TypeScript's optional chaining syntax (`?.`) is compiled into JavaScript when the target is set to `esnext`. If your Node.js version does not support this syntax, you must set a lower target (e.g., `es2019`) to ensure TypeScript transforms it into compatible code, otherwise Node.js will throw a `SyntaxError`.

```typescript
const bar: string | undefined = foo?.bar;
```

```javascript
const a = foo?.bar;
```

--------------------------------

### Referencing types with triple-slash directives

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/troubleshooting.md

Provides an example of using a triple-slash reference directive (/// <reference path="..." />) to include type definitions from a local file. This offers an alternative way to include types without modifying compilerOptions.

```typescript
/// <reference path="./types/lib_greeter" />
import {Greeter} from "lib_greeter"
const g = new Greeter();
g.sayHello();
```

--------------------------------

### Generate API Report - api-extractor - Shell

Source: https://github.com/typestrong/ts-node/blob/main/CONTRIBUTING.md

Updates the API report using the `api-extractor` tool, useful for detecting API surface changes during release note generation.

```Shell
yarn api-extractor
```

--------------------------------

### Using Triple-Slash Reference Directive

Source: https://github.com/typestrong/ts-node/blob/main/README.md

Example demonstrating the use of a triple-slash reference directive (`/// <reference path="..." />`) to include type definitions from a specific file. This is an alternative to `compilerOptions` for including types.

```TypeScript
/// <reference path="./types/lib_greeter" />
import {Greeter} from "lib_greeter"
const g = new Greeter();
g.sayHello();
```

--------------------------------

### Configuring typeRoots in tsconfig.json

Source: https://github.com/typestrong/ts-node/blob/main/README.md

Example tsconfig.json showing how to configure the `typeRoots` compiler option to include custom type definition directories alongside node_modules/@types. This is used for including global type definitions structured as type packages.

```JSONC
{
  "compilerOptions": {
    "typeRoots" : ["./node_modules/@types", "./typings"]
  }
}
```

--------------------------------

### Configure ts-node with tsconfig-paths in tsconfig.json

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/paths.md

This configuration snippet for tsconfig.json tells ts-node to load the tsconfig-paths/register module. This module modifies Node.js's module resolution to respect the 'paths' and 'baseUrl' settings defined in your tsconfig.json, allowing you to use path aliases in your imports. Requires the tsconfig-paths package to be installed.

```json
{
  "ts-node": {
    // Do not forget to `npm i -D tsconfig-paths`
    "require": ["tsconfig-paths/register"]
  }
}
```

--------------------------------

### Configure tsconfig.json for Native ESM

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/commonjs-vs-native-ecmascript-modules.md

Sets the TypeScript compiler option 'module' to 'ESNext' (or similar) and enables the 'esm' option in the ts-node section to activate ts-node's experimental native ESM support and automatic loader installation via the CLI.

```json
{
  "compilerOptions": {
    "module": "ESNext" // or ES2015, ES2020
  },
  "ts-node": {
    // Tell ts-node CLI to install the --loader automatically, explained below
    "esm": true
  }
}
```

--------------------------------

### Configuring ts-node with tsconfig-paths

Source: https://github.com/typestrong/ts-node/blob/main/README.md

This configuration snippet shows how to integrate tsconfig-paths with ts-node using the 'require' option within the 'ts-node' section of your tsconfig.json file. This allows ts-node to respect the 'paths' mapping defined in your tsconfig for module resolution. Ensure tsconfig-paths is installed as a dev dependency.

```JSON
{
  "ts-node": {
    // Do not forget to `npm i -D tsconfig-paths`
    "require": ["tsconfig-paths/register"]
  }
}
```

--------------------------------

### Displaying Help Text with ts-node (Shell)

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/options.md

Prints the help text for the ts-node command-line utility, listing all available options and their usage.

```shell
ts-node --help
```

--------------------------------

### Configure ts-node with a third-party transpiler plugin

Source: https://github.com/typestrong/ts-node/blob/main/README.md

This tsconfig.json snippet shows how to configure ts-node to use a third-party transpiler plugin for potentially faster compilation. The 'transpileOnly' option is set to true, and the 'transpiler' option specifies the name of the installed transpiler module that ts-node should require and use.

```JSONC
{
  "ts-node": {
    "transpileOnly": true,
    "transpiler": "@cspotcode/fast-ts-compiler"
  }
}
```

--------------------------------

### Defining Service Interface in TypeScript

Source: https://github.com/typestrong/ts-node/blob/main/api-extractor/ts-node.api.md

Defines the core public interface 'Service' representing a ts-node compilation service instance. It provides methods for compiling code, checking if a file is ignored, getting type information, and accessing configuration, options, and the underlying TypeScript API.

```TypeScript
// @public
export interface Service {
    // (undocumented)
    compile(code: string, fileName: string, lineOffset?: number): string;
    // (undocumented)
    config: _ts.ParsedCommandLine;
    // (undocumented)
    enabled(enabled?: boolean): boolean;
    // (undocumented)
    getTypeInfo(code: string, fileName: string, position: number): TypeInfo;
    // (undocumented)
    ignored(fileName: string): boolean;
    // (undocumented)
    options: RegisterOptions;
    // (undocumented)
    ts: TSCommon;
}
```

--------------------------------

### Configuring package.json for CommonJS Module Type (JSONC)

Source: https://github.com/typestrong/ts-node/blob/main/README.md

Example package.json configuration explicitly setting the "type" field to "commonjs". While "commonjs" is the default in Node.js, this shows how to explicitly configure it, which is necessary if "type": "module" was previously set.

```jsonc
{
  // This can be omitted; commonjs is the default
  "type": "commonjs"
}
```

--------------------------------

### Configuring ts-node with a Third-Party Transpiler in tsconfig.json

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/transpilers.md

This snippet demonstrates how to configure ts-node within your tsconfig.json file to use a third-party transpiler plugin. It shows setting the `transpileOnly` option to true and specifying the name of the transpiler module using the `transpiler` option under the `ts-node` configuration block. This setup directs ts-node to use the specified plugin for code transformation.

```JSON
{
  "ts-node": {
    "transpileOnly": true,
    "transpiler": "@cspotcode/fast-ts-compiler"
  }
}
```

--------------------------------

### Building the README

Source: https://github.com/typestrong/ts-node/blob/main/website/readme-sources/prefix.md

This command navigates into the 'website' directory and then executes the 'yarn build-readme' script to regenerate the project's README.md file from source files.

```shell
cd website && yarn build-readme
```

--------------------------------

### package.json configuration for npx/dlx tool

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/recipes/npx-and-yarn-dlx.md

Provides a basic `package.json` configuration for a TypeScript tool intended to be run via `npx` or `yarn dlx`. It specifies the entry point (`bin`) and lists necessary dependencies like `ts-node` and `@swc/core`.

```json
{
  "bin": "./cli.ts",
  "dependencies": {
    "ts-node": "latest",
    "@swc/core": "latest",
    "@swc/helpers": "latest",
    "@tsconfig/node16": "latest"
  }
}
```

--------------------------------

### Build README

Source: https://github.com/typestrong/ts-node/blob/main/README.md

Command to navigate to the website directory and build the README file from source markdown files.

```Shell
cd website && yarn build-readme
```

--------------------------------

### Displaying ts-node Help

Source: https://github.com/typestrong/ts-node/blob/main/README.md

Shows the command to print the help text for the ts-node CLI.

```Shell
ts-node --help
```

--------------------------------

### Running ts-node with CLI Flags (Shell)

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/configuration.md

Demonstrates how to execute a TypeScript file using the ts-node CLI, specifying a custom tsconfig.json file via the --project flag. CLI flags must precede the entrypoint script.

```shell
$ ts-node --project tsconfig-dev.json say-hello.ts Ronald
Hello, Ronald!
```

--------------------------------

### Loading tsconfig.json Files/Include/Exclude (Shell)

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/options.md

Loads the `files`, `include`, and `exclude` fields from tsconfig.json on startup. This may help resolve certain typechecking failures related to missing types.

```shell
ts-node --files
```

--------------------------------

### Running ts-node via node --require (Shell)

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/configuration.md

Shows an alternative method to pass node flags by invoking the node executable directly and using the --require flag to load ts-node/register before executing the script.

```shell
node --trace-deprecation --abort-on-uncaught-exception -r ts-node/register ./index.ts
```

--------------------------------

### Bootstrapping ts-node with ESM Loader

Source: https://github.com/typestrong/ts-node/blob/main/README.md

Demonstrates how to use the --esm option or the ts-node-esm binary to enable full ECMAScript Module (ESM) support via the Node.js ESM loader.

```Shell
ts-node --esm
ts-node-esm
```

--------------------------------

### Displaying ts-node Configuration (Shell)

Source: https://github.com/typestrong/ts-node/blob/main/website/docs/troubleshooting.md

Run this command to view the effective configuration used by ts-node, including compiler options from tsconfig.json and specific ts-node settings. This is useful for understanding how your project is being compiled and executed.

```shell
$ ts-node --showConfig
{
  "compilerOptions": {
    "target": "es6",
    "lib": [
      "es6",
      "dom"
    ],
    "rootDir": "./src",
    "outDir": "./.ts-node",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "declaration": false,
    "sourceMap": true,
    "inlineSources": true,
    "types": [
      "node"
    ],
    "stripInternal": true,
    "incremental": true,
    "skipLibCheck": true,
    "importsNotUsedAsValues": "error",
    "inlineSourceMap": false,
    "noEmit": false
  },
  "ts-node": {
    "cwd": "/d/project",
    "projectSearchDir": "/d/project",
    "require": [],
    "project": "/d/project/tsconfig.json"
  }
}
```