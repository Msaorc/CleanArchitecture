
# ESLint

ESLint é uma ferramenta baseada em AST para detecção de padrões problemáticos em código JavaScript/ECMAScript. Ela usa o parser Espree para converter o código em uma árvore sintática abstrata (AST) e percorre essa árvore avaliando o código com regras plugáveis. O ESLint suporta tanto o formato legado (eslintrc) quanto o formato moderno (flat), permitindo que equipes apliquem padrões de qualidade em projetos.

A ferramenta opera em vários modos: como CLI para uso em terminal, como API Node.js para integração programática e via integrações de linguagem para cenários de linting customizados. Fornece recursos de autofix para correções automáticas, cache para otimizar performance e processamento concorrente via worker threads. A arquitetura de plugins permite estender funcionalidades com regras, parsers, processadores e formatadores personalizados.

## ESLint Class

Lint files and directories with full configuration support and caching.

```javascript
const { ESLint } = require("eslint");

(async function() {
  // Create instance with configuration options
  const eslint = new ESLint({
    cwd: process.cwd(),
    overrideConfig: {
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: "module"
      },
      rules: {
        semi: "error",
        "no-console": "warn"
      }
    },
    fix: false,
    cache: true,
    cacheLocation: ".eslintcache"
  });

  // Lint multiple files using glob patterns
  const results = await eslint.lintFiles(["src/**/*.js", "lib/**/*.js"]);

  // Load formatter and output results
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);
  console.log(resultText);

  // Check for errors
  const errorCount = results.reduce((sum, result) => sum + result.errorCount, 0);
  if (errorCount > 0) {
    process.exitCode = 1;
  }
})();
```

## Correções automáticas do ESLint com outputFixes

Corrige automaticamente problemas reportados pelo linter e grava as alterações no disco.

```javascript
const { ESLint } = require("eslint");
const fs = require("fs/promises");

(async function() {
  // Habilita o modo de autofix
  const eslint = new ESLint({
    fix: true,
    overrideConfigFile: true,
    overrideConfig: {
      rules: {
        "prefer-const": "error",
        "no-var": "error",
        semi: ["error", "always"]
      }
    }
  });

  // Executa o lint (as correções são calculadas, mas ainda não escritas)
  const results = await eslint.lintFiles(["src/**/*.js"]);

  // Grava as correções em disco
  await ESLint.outputFixes(results);

  // Reporta problemas restantes
  const formatter = await eslint.loadFormatter("compact");
  const remainingIssues = results.filter(r => r.errorCount > 0 || r.warningCount > 0);
  if (remainingIssues.length > 0) {
    console.log(formatter.format(remainingIssues));
  }

  console.log(`Fixed ${results.filter(r => r.output).length} files`);
})();
```

## Lint de strings com ESLint (lintText)

Executa o lint em trechos de código (strings) sem acessar o sistema de arquivos.

```javascript
const { ESLint } = require("eslint");

(async function() {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: {
      languageOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
      },
      rules: {
        "no-unused-vars": "error",
        "no-constant-condition": "warn"
      }
    }
  });

  const code = `
    const unusedVar = 42;
    if (true) {
      console.log("This condition is always true");
    }
  `;

  // Linta o texto; o filePath é opcional e serve como contexto
  const results = await eslint.lintText(code, {
    filePath: "virtual-file.js"
  });

  // Processa os resultados
  const [result] = results;
  console.log(`Errors: ${result.errorCount}, Warnings: ${result.warningCount}`);
  result.messages.forEach(msg => {
    console.log(`[${msg.severity === 2 ? 'error' : 'warn'}] ${msg.message} (${msg.ruleId}) at line ${msg.line}`);
  });
})();
```

## Configuration file (eslint.config.js)

Define flat configuration with rules, plugins, and file patterns.

```javascript
// eslint.config.js
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  // Recommended base config
  js.configs.recommended,

  // Global ignores
  {
    ignores: ["dist/**", "build/**", "node_modules/**"]
  },

  // JavaScript files configuration
  {
    name: "app-javascript",
    files: ["src/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly"
      }
    },
    rules: {
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "eqeqeq": ["error", "always"]
    }
  },

  // Test files with relaxed rules
  {
    name: "test-files",
    files: ["test/**/*.js", "**/*.test.js"],
    rules: {
      "no-console": "off"
    }
  }
]);
```

## Linter class

Core linting engine for direct AST verification without file I/O.

```javascript
const { Linter } = require("eslint");

const linter = new Linter();

// Define configuration
const config = {
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "module"
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"]
  }
};

const code = "const x = 'hello'";

// Verify code and get messages
const messages = linter.verify(code, config, {
  filename: "example.js"
});

messages.forEach(msg => {
  console.log(`${msg.line}:${msg.column} - ${msg.message} (${msg.ruleId})`);
  // Output: 1:11 - Strings must use doublequote. (quotes)
  // Output: 1:18 - Missing semicolon. (semi)
});

// Verify and apply fixes automatically
const fixResult = linter.verifyAndFix(code, config);
console.log(fixResult.fixed); // true if fixes were applied
console.log(fixResult.output); // 'const x = "hello";'
console.log(fixResult.messages); // Remaining messages that couldn't be fixed
```

## Custom rule implementation

Create custom rules with metadata, schema validation, and fix capabilities.

```javascript
// custom-rules/no-console-log.js
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow console.log statements",
      recommended: false
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          allowInDevelopment: {
            type: "boolean"
          }
        },
        additionalProperties: false
      }
    ],
    messages: {
      unexpected: "Unexpected console.log statement"
    }
  },

  create(context) {
    const options = context.options[0] || {};
    const sourceCode = context.sourceCode;

    return {
      "CallExpression[callee.object.name='console'][callee.property.name='log']"(node) {
        if (options.allowInDevelopment && process.env.NODE_ENV === "development") {
          return;
        }

        context.report({
          node,
          messageId: "unexpected",
          fix(fixer) {
            // Remove the entire statement
            const statement = sourceCode.getNodeByRangeIndex(node.range[0]);
            return fixer.remove(statement);
          }
        });
      }
    };
  }
};

// Usage in config
import customRules from "./custom-rules/no-console-log.js";

export default [
  {
    plugins: { custom: { rules: { "no-console-log": customRules } } },
    rules: {
      "custom/no-console-log": ["error", { allowInDevelopment: true }]
    }
  }
];
```

## RuleTester

Test custom rules with valid and invalid test cases.

```javascript
const { RuleTester } = require("eslint");
const rule = require("./custom-rules/no-console-log");

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module"
  }
});

ruleTester.run("no-console-log", rule, {
  valid: [
    // Code that should pass
    "console.error('error message');",
    "console.warn('warning');",
    {
      code: "console.log('debug');",
      options: [{ allowInDevelopment: true }],
      env: { NODE_ENV: "development" }
    }
  ],

  invalid: [
    // Code that should fail
    {
      code: "console.log('test');",
      errors: [
        {
          messageId: "unexpected",
          type: "CallExpression"
        }
      ]
    },
    {
      code: "console.log('foo'); console.log('bar');",
      errors: 2,
      output: ";" // Expected code after autofix
    }
  ]
});

console.log("All tests passed!");
```

## CLI usage

Run ESLint from command line with various options.

```bash
# Lint specific files
npx eslint src/app.js src/utils.js

# Lint directory with pattern matching
npx eslint "src/**/*.js"

# Auto-fix problems
npx eslint --fix src/

# Use specific config file
npx eslint --config custom.config.js src/

# Output to file
npx eslint -f json -o report.json src/

# Enable caching for faster subsequent runs
npx eslint --cache --cache-location .eslintcache src/

# Lint stdin
echo "const x = 1" | npx eslint --stdin --stdin-filename test.js

# Show rule details in output
npx eslint --format stylish src/

# Inspect configuration for specific file
npx eslint --inspect-config src/app.js
```

## Custom formatter

Create formatters to customize lint output format.

```javascript
// formatters/markdown-formatter.js
module.exports = function(results, context) {
  const { rulesMeta } = context;
  let output = "# ESLint Report\n\n";

  const errorCount = results.reduce((sum, r) => sum + r.errorCount, 0);
  const warningCount = results.reduce((sum, r) => sum + r.warningCount, 0);

  output += `**Total:** ${errorCount} errors, ${warningCount} warnings\n\n`;

  results.forEach(result => {
    if (result.messages.length > 0) {
      output += `## ${result.filePath}\n\n`;

      result.messages.forEach(msg => {
        const severity = msg.severity === 2 ? "❌ Error" : "⚠️ Warning";
        output += `- **${severity}** (Line ${msg.line}:${msg.column}): ${msg.message}`;

        if (msg.ruleId) {
          const meta = rulesMeta[msg.ruleId];
          output += ` `${msg.ruleId}``;
          if (meta?.docs?.url) {
            output += ` [docs](${meta.docs.url})`;
          }
        }
        output += "\n";
      });

      output += "\n";
    }
  });

  return output;
};

// Use custom formatter
const { ESLint } = require("eslint");
const fs = require("fs/promises");

(async function() {
  const eslint = new ESLint();
  const results = await eslint.lintFiles(["src/**/*.js"]);

  // Load custom formatter by path
  const formatter = await eslint.loadFormatter("./formatters/markdown-formatter.js");
  const output = formatter.format(results);

  await fs.writeFile("report.md", output);
})();
```

## SourceCode API

Access and manipulate source code AST and tokens.

```javascript
const { Linter, SourceCode } = require("eslint");

const linter = new Linter();
const code = `
function example(x) {
  return x + 1;
}
`;

// Parse and get SourceCode object
const sourceCode = linter.getSourceCode();

// Get AST
const ast = sourceCode.ast;
console.log(ast.body[0].type); // "FunctionDeclaration"

// Get all tokens
const tokens = sourceCode.getAllTokens();
tokens.forEach(token => {
  console.log(`${token.type}: ${token.value}`);
});

// Get comments
const comments = sourceCode.getAllComments();

// Get text content
const fullText = sourceCode.getText();
const nodeText = sourceCode.getText(ast.body[0]);

// Get lines
const lines = sourceCode.lines;
console.log(lines[1]); // "function example(x) {"

// Navigate tokens
const firstToken = sourceCode.getFirstToken(ast.body[0]);
const lastToken = sourceCode.getLastToken(ast.body[0]);
const tokensInNode = sourceCode.getTokens(ast.body[0]);

// Check token relationships
const nextToken = sourceCode.getTokenAfter(firstToken);
const prevToken = sourceCode.getTokenBefore(lastToken);
```

## LoadESLint helper

Dynamically load appropriate ESLint class based on configuration.

```javascript
const { loadESLint } = require("eslint");

(async function() {
  // Auto-detect configuration format (flat or eslintrc)
  const ESLintClass = await loadESLint();

  const eslint = new ESLintClass({
    cwd: process.cwd()
  });

  const results = await eslint.lintFiles(["src/**/*.js"]);
  console.log(`Found ${results.length} files`);

  // Force flat config
  const FlatESLint = await loadESLint({ useFlatConfig: true });
  const flatEslint = new FlatESLint();

  // Force legacy eslintrc
  const LegacyESLint = await loadESLint({ useFlatConfig: false });
  const legacyEslint = new LegacyESLint();
})();
```

## Concurrent linting with workers

Utilize multi-threading for faster linting of large codebases.

```javascript
const { ESLint } = require("eslint");
const os = require("os");

(async function() {
  // Use worker threads for concurrent linting
  const eslint = new ESLint({
    cwd: process.cwd(),
    // Auto-detect optimal worker count
    concurrency: "auto",

    // Or specify number of workers manually
    // concurrency: Math.max(1, os.cpus().length / 2),

    cache: true,
    cacheStrategy: "content"
  });

  const startTime = Date.now();
  const results = await eslint.lintFiles(["src/**/*.js", "lib/**/*.js"]);
  const duration = Date.now() - startTime;

  const totalFiles = results.length;
  const totalIssues = results.reduce((sum, r) =>
    sum + r.errorCount + r.warningCount,
    0
  );

  console.log(`Linted ${totalFiles} files in ${duration}ms`);
  console.log(`Found ${totalIssues} issues`);

  // Disable concurrency
  const singleThreadEslint = new ESLint({ concurrency: "off" });
})();
```

## Integration and extensibility

ESLint serves as a foundational tool for maintaining code quality across JavaScript projects of all sizes. Its primary use cases include continuous integration pipelines where automated linting catches issues before code review, editor integrations that provide real-time feedback during development, and pre-commit hooks that enforce standards before code enters version control. The tool scales from small scripts to monorepos containing thousands of files, using intelligent caching and worker thread concurrency to maintain fast performance.

The plugin ecosystem extends ESLint's capabilities beyond basic JavaScript linting. Custom parsers enable linting of TypeScript, JSX, Vue, and other JavaScript variants. Processors allow linting of embedded code in Markdown or HTML files. The RuleTester provides a robust framework for test-driven rule development, while the formatter system allows output customization for different reporting needs. Whether used as a CLI tool, integrated into build systems, or embedded in applications via the Node.js API, ESLint provides the flexibility and power needed for comprehensive code analysis and automatic fixing.

```