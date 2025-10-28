### Instalar e linkar o TypeScript globalmente

Fonte: https://github.com/microsoft/typescript/wiki/Using-the-Compiler-API-(TypeScript-1.4)

Trecho com comandos para instalar o TypeScript globalmente via npm e, em seguida, vinculá-lo ao seu projeto. Também menciona `tsd` como alternativa para gerenciar arquivos de definição TypeScript.

```Shell
npm install -g typescript
npm link typescript
```

--------------------------------

### Instalar a versão mais recente do TypeScript para rastreamento do compilador

Fonte: https://github.com/microsoft/typescript/wiki/Performance-Tracing

Instala a versão mais recente do TypeScript, necessária para usar o recurso `--generateTrace` (introduzido no TypeScript 4.1). Esse passo é importante para gerar traços detalhados de performance do compilador.

```Shell
npm install typescript@latest
```

--------------------------------

### Instalar sudo e executar script em um container Docker minimal

Fonte: https://github.com/microsoft/typescript/wiki/Docker-Quickstart

Mostra como lidar com a necessidade de `sudo` em uma imagem Docker minimal: iniciar o container, atualizar o apt e instalar `sudo` interativamente dentro do container em execução, seguido por um exemplo de execução de um script Node.

```Shell
docker run -it --rm -v %cd%:/fuzzer -w /fuzzer -u node node bash
```

```Shell
apt update; apt install sudo
node /work/index.js 1 3.3 3.4 false
```

--------------------------------

### Instalar e vincular o TypeScript para desenvolvimento

Fonte: https://github.com/microsoft/typescript/wiki/Using-the-Compiler-API

Instruções para instalar o TypeScript globalmente via npm e vinculá-lo para uso específico do projeto. Esse passo é importante para preparar o ambiente antes de usar a API do compilador TypeScript. Inclui também a instalação das declarações de tipos do Node.js.

```sh
npm install -g typescript
npm link typescript
```

```sh
npm install -D @types/node
```

--------------------------------

### Analisar traços do compilador TypeScript com @typescript/analyze-trace

Fonte: https://github.com/microsoft/typescript/wiki/Performance-Tracing

Comandos para instalar a ferramenta `@typescript/analyze-trace` e executar uma análise rápida dos arquivos de trace gerados, ajudando a identificar potenciais gargalos de performance do compilador.

```Shell
npm install @typescript/analyze-trace
```

```Shell
npx analyze-trace some_directory
```

--------------------------------

### Executar o servidor Gollum Wiki localmente com Ruby

Fonte: https://github.com/microsoft/typescript/wiki/README

Comandos para instalar e executar o servidor Gollum (requer Ruby). Depois de instalado com `gem install gollum`, o servidor será acessível em `http://localhost:4567`.

```sh
gem install gollum

gollum
```

--------------------------------

### Install latest stable TypeScript via npm

Source: https://github.com/microsoft/typescript/blob/main/README.md

Installs the latest stable version of the TypeScript compiler as a development dependency using npm. This is the recommended way to get started with TypeScript for most projects.

```bash
npm install -D typescript
```

--------------------------------

### Example TypeScript Class for Documentation Generation Input

Source: https://github.com/microsoft/typescript/wiki/Using-the-Compiler-API

This TypeScript code provides an example class `C` with JSDoc comments for the class itself, its constructor, and constructor parameters. This serves as an input file (`test.ts`) for the documentation generator script, demonstrating the type of source code the generator processes.

```TypeScript
/**
 * Documentation for C
 */
class C {
    /**
     * constructor documentation
     * @param a my parameter documentation
     * @param b another parameter documentation
     */
    constructor(a: string, b: C) { }
}
```

--------------------------------

### Example TypeScript Compiler Type Entries from types.json

Source: https://github.com/microsoft/typescript/wiki/Performance-Tracing

This JSON snippet provides examples of type entries found in the TypeScript compiler's `types.json` output. These entries are crucial for understanding how types are represented internally, including their IDs, symbol names, recursion IDs, instantiated types, type arguments, and declaration locations. Analyzing these entries aids in debugging performance issues related to type checking by linking compiler-internal types back to source code declarations.

```json
{"id":20440,"symbolName":"NamedExoticComponent","recursionId":30,"instantiatedType":146,"typeArguments":[20437],"firstDeclaration":{"path":"PROJECT_ROOT/node_modules/@types/react/index.d.ts","start":{"line":359,"character":6},"end":{"line":363,"character":6}},"flags":["524288"]},
{"id":20441,"symbolName":"NamedExoticComponent","recursionId":30,"instantiatedType":146,"typeArguments":[20434],"firstDeclaration":{"path":"PROJECT_ROOT/node_modules/@types/react/index.d.ts","start":{"line":359,"character":6},"end":{"line":363,"character":6}},"flags":["524288"]}
```

--------------------------------

### Install alm.tools globally via npm

Source: https://github.com/microsoft/typescript/wiki/TypeScript-Editor-Support

This command installs the alm.tools TypeScript development environment globally using the Node Package Manager (npm). This allows `alm` to be run from any directory in the command line, providing a complete TypeScript development setup.

```shell
npm i alm -g
```

--------------------------------

### Example `package.json` and Type Declaration Files for a Module

Source: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/nodeModulesImportTypeModeDeclarationEmitErrors1(module=node16).errors.txt

This snippet provides the correct configuration for a module named 'pkg', including its 'package.json' with 'exports' mapping 'import' and 'require' conditions, and corresponding TypeScript declaration files (.d.ts) that define interfaces for each export path. This setup serves as the baseline for the module resolution examples.

```JSON
{
        "name": "pkg",
        "version": "0.0.1",
        "exports": {
            "import": "./import.js",
            "require": "./require.js"
        }
    }
```

```TypeScript
export interface ImportInterface {}
```

```TypeScript
export interface RequireInterface {}
```

--------------------------------

### Switch User Inside Container Manually

Source: https://github.com/microsoft/typescript/wiki/Docker-Quickstart

This command starts a Node.js container with a `bash` shell. Once inside, you can manually switch to a different user, such as `node`, using `su -l node`. This allows for testing applications under non-root privileges, mimicking real-world scenarios. Subsequent commands like `npm install` would then run as the new user.

```Shell
docker run -it --rm node bash
```

--------------------------------

### Install project dependencies securely with npm ci

Source: https://github.com/microsoft/typescript/blob/main/CONTRIBUTING.md

This command performs a clean installation of project dependencies using `npm ci`. Unlike `npm install`, `npm ci` ensures that dependencies are installed exactly as specified in `package-lock.json` or `npm-shrinkwrap.json`, providing more reliable and reproducible builds.

```Shell
npm ci
```

--------------------------------

### Implement a Minimal TypeScript Compiler

Source: https://github.com/microsoft/typescript/wiki/Using-the-Compiler-API-(TypeScript-1.4)

This TypeScript code demonstrates how to create a barebones compiler that can transform TypeScript strings into their corresponding JavaScript. It utilizes the `createProgram` and `createCompilerHost` functions from the TypeScript API to manage compilation, emit files, and report any diagnostics encountered during the process.

```TypeScript
/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/typescript/typescript.d.ts" />

import ts = require("typescript");

export function compile(filenames: string[], options: ts.CompilerOptions): void {
    var host = ts.createCompilerHost(options);
    var program = ts.createProgram(filenames, options, host);
    var checker = ts.createTypeChecker(program, /*produceDiagnostics*/ true);
    var result = checker.emitFiles();

    var allDiagnostics = program.getDiagnostics()
        .concat(checker.getDiagnostics())
        .concat(result.diagnostics);

    allDiagnostics.forEach(diagnostic => {
        var lineChar = diagnostic.file.getLineAndCharacterFromPosition(diagnostic.start);
        console.log(`${diagnostic.file.filename} (${lineChar.line},${lineChar.character}): ${diagnostic.messageText}`);
    });

    console.log(`Process exiting with code '${result.emitResultStatus}'.`);
    process.exit(result.emitResultStatus);
}

compile(process.argv.slice(2), { noEmitOnError: true, noImplicitAny: true,
                                 target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS });
```

--------------------------------

### Initial Setup and Build for tsserverfuzzer in Docker

Source: https://github.com/microsoft/typescript/wiki/Docker-Quickstart

This snippet demonstrates how to clone the tsserverfuzzer repository and set up its development environment inside a Docker container. It covers mounting the host directory, setting the working directory, running commands as the 'node' user, and executing build and run scripts.

```Shell
c:\> cd work
C:\work> git clone ...tsserverfuzzer...
C:\work> cd tsserverfuzzer
C:\work\tsserverfuzzer> docker run -it --rm -v %cd%:/fuzzer -w /fuzzer -u node node bash
```

```Shell
node@...:/fuzzer$ npm install
node@...:/fuzzer$ npm run build
node@...:/fuzzer$ git status
node@...:/fuzzer$ node lib/Fuzzer/main.js
```

--------------------------------

### Example JSON output from TypeScript transform function

Source: https://github.com/microsoft/typescript/wiki/Using-the-Compiler-API-(TypeScript-1.4)

This JSON snippet illustrates the structure of the output generated by the `transform` function. It includes an `outputs` array for compiled JavaScript files (e.g., `file.js`) and an `errors` array detailing any compilation issues, such as type mismatches.

```JSON
{
    "outputs": [
        {
            "name": "file.js",
            "text": "var x = 'string';\n"
        }
    ],
    "errors": [
        "file.ts(1): Type 'string' is not assignable to type 'number'."
    ]
}
```

--------------------------------

### TypeScript Decorator Declaration

Source: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/esDecorators-classDeclaration-exportModifier.2.errors.txt

Declares a global variable `dec` of type `any` to be used as a decorator in subsequent examples. This setup is necessary for the decorator examples to function.

```TypeScript
/** @type {*} */
    var dec;
```

--------------------------------

### TypeScript Contextual Typing from Ambient Class Declarations

Source: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/contextualTyping.errors.txt

Demonstrates how contextual typing applies to ambient class declarations. It shows a 'declare class' definition for 'Point' and subsequent implementations of its static and prototype members, illustrating how the declared types guide the implementation.

```TypeScript
// contextually typing from ambient class declarations
declare class Point
{
      constructor(x: number, y: number);
      x: number;
      y: number;
      add(dx: number, dy: number): Point;
      static origin: Point;

}

Point.origin = new Point(0, 0);

Point.prototype.add = function(dx, dy) {
    return new Point(this.x + dx, this.y + dy);
};

Point.prototype = {
    x: 0,
    y: 0,
    add: function(dx, dy) {
        return new Point(this.x + dx, this.y + dy);
    }
};
```

--------------------------------

### TypeScript Module Export Example with Set and Get

Source: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/exportsAndImportsWithContextualKeywordNames01.errors.txt

This snippet defines a TypeScript module 't1.ts' that exports a 'set' object containing a setter property 'foo' and a 'get' variable. It serves as the source module for subsequent import examples.

```TypeScript
let set = {
    set foo(x: number) {
    }
}
let get = 10;

export { set, get };
```

--------------------------------

### Example tsserver JSON Response for Quick Info Command

Source: https://github.com/microsoft/typescript/wiki/Standalone-Server-(tsserver)

This example demonstrates the augmented JSON format used for `tsserver` responses. It includes a `Content-Length` header followed by the JSON body, showcasing a response for a 'quickinfo' command, indicating that no content was available for the requested quick information.

```text
Content-Length: 116

{"seq":0,"type":"response","command":"quickinfo","request_seq":2,"success":false,"message":"No content available."}
```

--------------------------------

### Generate a Range of Numbers (TypeScript)

Source: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/underscoreTest1.errors.txt

Creates a list of numbers progressing from `start` up to (but not including) `stop`. If `start` is not specified, it defaults to 0. An optional `step` can be provided.

```TypeScript
range(stop: number): number[];
range(start: number, stop: number, step?: number): number[];
```

--------------------------------

### Run Container with Custom Command (Bash)

Source: https://github.com/microsoft/typescript/wiki/Docker-Quickstart

This command overrides the default entrypoint of the `node` image and instead executes `bash`. This provides a shell prompt inside the container, allowing users to install packages, run arbitrary commands, and perform system-level operations before exiting.

```Shell
docker run -it --rm node bash
```

--------------------------------

### Complete Greeter Class and Function Implementation in TypeScript

Source: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/sourceMapSample.sourcemap.txt

This snippet provides the full TypeScript source code for a `Greeter` class, including its constructor and `greet` method. It also defines two functions: `foo` for creating a single `Greeter` instance, and `foo2` which utilizes rest parameters to handle multiple greetings and return an array of `Greeter` objects. The example includes instantiation and usage of these components, along with a fragment of the emitted JavaScript.

```TypeScript
"use strict";
class Greeter {
    constructor(public greeting: string) {
    }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
}
function foo(greeting: string): Foo.Bar.Greeter {
    return new Greeter(greeting);
}
var greeter = new Greeter("Hello, world!");
var str = greeter.greet();
function foo2(greeting: string, ...restGreetings: string[]) {
    var greeters: Greeter[] = [];
    greeters[0] = new Greeter(greeting);
    for (var i = 0; i < restGreetings.length; i++) {
        greeters.push(new Greeter(restGreetings[i]));
    }
    return greeters;
}
var b = foo2("Hello", "World", "!");
for (var j = 0; j < b.length; j++) {
    b[j].greet();
}
```

```JavaScript
greeters.push(new Greeter(restGreetings[i]));
}
        return greeters;
    }

    var b = foo2("Hello", "World", "!");
    for (var j = 0; j < b.length; j++) {
        b[j].greet();
    }
}
```

--------------------------------

### Instantiate Greeter Class in TypeScript

Source: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/sourceMapSample.sourcemap.txt

This snippet demonstrates the instantiation of a 'Greeter' class, passing a string literal 'Hello, world!' to its constructor. It's a fundamental example of object creation in TypeScript/JavaScript.

```TypeScript
var greeter = new Greeter("Hello, world!");
```

--------------------------------

### Example Project Setup Causing TS2209 Error

Source: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/nodeNextPackageSelfNameWithOutDirDeclDir.errors.txt

This example shows a `package.json` file configured with export maps and a corresponding TypeScript file that imports from the package. This specific setup, without a defined `rootDir`, can lead to the TS2209 error due to an ambiguous project root, especially when the export map entry `.` is used.

```json
{
  "name": "@this/package",
  "type": "module",
  "exports": {
    ".": {
      "default": "./dist/index.js",
      "types": "./types/index.d.ts"
    }
  }
}
```

```typescript
import * as me from "@this/package";

me.thing();

export function thing(): void {}
```

--------------------------------

### Expected JSON Output for Generated Class Documentation

Source: https://github.com/microsoft/typescript/wiki/Using-the-Compiler-API

This JSON structure represents the expected output from the documentation generator when processing the example TypeScript class `C`. It shows how class name, documentation, type, and constructor details (including parameters and their documentation) are serialized into a structured format.

```JSON
[
    {
        "name": "C",
        "documentation": "Documentation for C ",
        "type": "typeof C",
        "constructors": [
            {
                "parameters": [
                    {
                        "name": "a",
                        "documentation": "my parameter documentation",
                        "type": "string"
                    },
                    {
                        "name": "b",
                        "documentation": "another parameter documentation",
                        "type": "C"
                    }
                ],
                "returnType": "C",
                "documentation": "constructor documentation"
            }
        ]
    }
]
```

--------------------------------

### TypeScript JSX with React Import Source

Source: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/jsxJsxsCjsTransformCustomImportPragma(jsx=react-jsxdev).errors.txt

This snippet shows a TypeScript file configured to use React as its JSX import source. It includes a type reference and a basic JSX fragment, demonstrating a typical setup for React applications in TypeScript.

```typescript
/// <reference path="/.lib/react16.d.ts" />
/* @jsxImportSource react */
import "./preact";
const a = <>
  <p></p>
  text
  <div className="foo"></div>
</>

export {};
```

--------------------------------

### TypeScript: Invalid Numeric Literal Start and Unknown Identifier (TS1128, TS2304)

Source: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/parser.numericSeparators.decmialNegative.errors.txt

This example shows an invalid numeric literal starting with a decimal point followed by a numeric separator (`._`). TypeScript expects a valid declaration or statement, and then treats `_` as an unknown identifier, resulting in `TS1128` (Declaration or statement expected) and `TS2304` (Cannot find name '_') errors.

```TypeScript
._
```

--------------------------------

### Run Interactive Node.js Container

Source: https://github.com/microsoft/typescript/wiki/Docker-Quickstart

This command starts an interactive Node.js container. The `-it` flags enable interactive mode and allocate a pseudo-TTY, while `--rm` ensures the container is automatically removed upon exit. This is useful for quick, ephemeral tasks.

```Shell
docker run -it --rm node
```

--------------------------------

### Run Specific Version of Node.js Container

Source: https://github.com/microsoft/typescript/wiki/Docker-Quickstart

Similar to the previous example, this command runs an interactive Node.js container, but specifically uses the `node:12` image tag. This allows developers to test against a particular version of Node.js, ensuring consistency across environments.

```Shell
docker run -it --rm node:12
```

--------------------------------

### TypeScript: Fix 'get' accessor cannot have parameters (TS1054)

Source: https://github.com/microsoft/typescript/blob/main/tests/baselines/reference/complicatedPrivacy.errors.txt

This snippet demonstrates the TypeScript error TS1054, which occurs when a 'get' accessor is defined with parameters. 'Get' accessors are designed to retrieve a value and should not accept arguments. The provided code shows an incorrect definition of `get p1(arg)` within class `C2`, leading to this compilation error.

```typescript
export class C2 implements m3.i3 {
    public get p1(arg) {
        return new C1();
    }

    public set p1(arg1: C1) {
    }

    public f55() {
        return "Hello world";
    }
}
```

--------------------------------

### Create a Comprehensive TypeScript Language Service Plugin

Source: https://github.com/microsoft/typescript/wiki/Writing-a-Language-Service-Plugin

This complete TypeScript example demonstrates how to build a robust language service plugin. It integrates user configuration from `tsconfig.json` to filter completion entries, incorporates diagnostic logging, and sets up a proxy for the language service to modify its behavior, providing a full-featured plugin implementation.

```TypeScript
function init(modules: { typescript: typeof import("typescript/lib/tsserverlibrary") }) {
  const ts = modules.typescript;

  function create(info: ts.server.PluginCreateInfo) {
    // Get a list of things to remove from the completion list from the config object.
    // If nothing was specified, we'll just remove 'caller'
    const whatToRemove: string[] = info.config.remove || ["caller"];

    // Diagnostic logging
    info.project.projectService.logger.info(
      "I'm getting set up now! Check the log for this message."
    );

    // Set up decorator object
    const proxy: ts.LanguageService = Object.create(null);
    for (let k of Object.keys(info.languageService) as Array<keyof ts.LanguageService>) {
      const x = info.languageService[k]!;
      // @ts-expect-error - JS runtime trickery which is tricky to type tersely
      proxy[k] = (...args: Array<{}>) => x.apply(info.languageService, args);
    }

    // Remove specified entries from completion list
    proxy.getCompletionsAtPosition = (fileName, position, options) => {
      const prior = info.languageService.getCompletionsAtPosition(fileName, position, options);
      if (!prior) return

      const oldLength = prior.entries.length;
      prior.entries = prior.entries.filter(e => whatToRemove.indexOf(e.name) < 0);

      // Sample logging for diagnostic purposes
      if (oldLength !== prior.entries.length) {
        const entriesRemoved = oldLength - prior.entries.length;
        info.project.projectService.logger.info(
          `Removed ${entriesRemoved} entries from the completion list`
        );
      }

      return prior;
    };

    return proxy;
  }

  return { create };
}

export = init;
```