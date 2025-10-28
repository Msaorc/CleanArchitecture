### Exemplo: Esquema Yup para Número

Fonte: https://github.com/jquense/yup/blob/master/README.md

Exemplo básico de criação de um esquema Yup do tipo número.

```javascript
let schema = yup.number();

await schema.isValid(10); // => true
```

--------------------------------

### Exemplo: string.matches (correspondência por regex)

Fonte: https://github.com/jquense/yup/blob/master/README.md

Demonstra como usar o método `string.matches` com uma expressão regular para validar valores de string.

```javascript
let schema = string().matches(/(hi|bye)/);

await schema.isValid('hi'); // => true
await schema.isValid('nope'); // => false
```

--------------------------------

### Transforms personalizados

Fonte: https://github.com/jquense/yup/blob/master/README.md

Mostra como adicionar transforms personalizados a esquemas Yup, permitindo pipelines de manipulação de dados. O exemplo inverte uma string.

```javascript
let reversedString = string()
  .transform((currentValue) => currentValue.split('').reverse().join(''))
  .cast('dlrow olleh'); // "hello world"
```

--------------------------------

### Garantindo compatibilidade do esquema com tipos existentes (TypeScript)

Fonte: https://github.com/jquense/yup/blob/master/README.md

Ilustra como garantir que um esquema Yup produza um tipo compatível com uma interface TypeScript existente. O exemplo mostra uma implementação correta e outra propositalmente incorreta que causaria erro em tempo de compilação.

```typescript
import { object, number, string, ObjectSchema } from 'yup';

interface Person {
  name: string;
  age?: number;
  sex: 'male' | 'female' | 'other' | null;
}

// levantará um erro de compilação se o esquema não produzir um Person válido
let schema: ObjectSchema<Person> = object({
  name: string().defined(),
  age: number().optional(),
  sex: string<'male' | 'female' | 'other'>().nullable().defined(),
});

// ❌ erros:
// "Type 'number | undefined' is not assignable to type 'string'."
let badSchema: ObjectSchema<Person> = object({
  name: number(),
});
```

--------------------------------

### Exemplo: Validação de email personalizada

Fonte: https://github.com/jquense/yup/blob/master/README.md

Demonstra como adicionar um método de validação de email customizado ao Yup usando `addMethod`.

```typescript
yup.addMethod(yup.string, 'email', function validateEmail(message) {
  return this.matches(myEmailRegex, {
    message,
    name: 'email',
    excludeEmptyString: true,
  });
});
```

--------------------------------

### Personalizando mensagens de erro

Fonte: https://github.com/jquense/yup/blob/master/README.md

Explica como personalizar mensagens de erro para testes de validação do Yup usando `ctx.createError`. O exemplo valida o formato de um SKU.

```javascript
let order = object({
  no: number().required(),
  sku: string().test({
    name: 'is-sku',
    skipAbsent: true,
    test(value, ctx) {
      if (!value.startsWith('s-')) {
        return ctx.createError({ message: 'SKU sem o prefixo correto' });
      }
      if (!value.endsWith('-42a')) {
        return ctx.createError({ message: 'SKU sem o sufixo correto' });
      }
      if (value.length < 10) {
        return ctx.createError({ message: 'SKU não tem o tamanho correto' });
      }
      return true;
    },
  }),
});

order.validate({ no: 1234, sku: 's-1a45-14a' });
```

--------------------------------

### Exemplo: string.matches com excludeEmptyString

Fonte: https://github.com/jquense/yup/blob/master/README.md

Mostra o uso de `string.matches` com a opção `excludeEmptyString` para permitir strings vazias sem precisar casar a regex.

```javascript
let schema = string().matches(/(hi|bye)/, { excludeEmptyString: true });

await schema.isValid(''); // => true
```

--------------------------------

### Testes de validação customizados

Fonte: https://github.com/jquense/yup/blob/master/README.md

Demonstra a criação de testes de validação personalizados no Yup, incluindo definição de nomes de testes, mensagens de erro e a lógica de validação. O exemplo verifica se um valor é 'James'.

```javascript
let jamesSchema = string().test(
  'is-james',
  (d) => `${d.path} não é James`,
  (value) => value == null || value === 'James',
);

jamesSchema.validateSync('James'); // "James"

jamesSchema.validateSync('Jane'); // ValidationError "this is not James"
```

--------------------------------

### Esquema Tuple (tupla)

Fonte: https://github.com/jquense/yup/blob/master/README.md

Define um esquema do tipo tupla para arrays de tamanho fixo com tipos distintos para cada elemento. Inclui um exemplo de definição e validação de uma tupla.

```js
import { tuple, string, number, InferType } from 'yup';

let schema = tuple([
  string().label('name'),
  number().label('age').positive().integer(),
]);

await schema.validate(['James', 3]); // ['James', 3]

await schema.validate(['James', -24]); // => ValidationError: age must be a positive number

InferType<typeof schema> // [string, number] | undefined

tuplas não possuem comportamento de casting padrão.
```

--------------------------------

### Esquema de Objeto (Object Schema)

Fonte: https://github.com/jquense/yup/blob/master/README.md

Define um esquema de objeto para validar a estrutura e tipos das propriedades de um objeto. Inclui um exemplo com vários tipos de campo.

```js
yup.object({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email(),
  website: string().url(),
});

esquemas de objeto não têm transforms padrão aplicados.
```

--------------------------------

### Defaults de esquema e inferência de tipos

Fonte: https://github.com/jquense/yup/blob/master/README.md

Explica como defaults em esquemas afetam o tipo de saída ao marcar um esquema como `defined()`. Este exemplo mostra a diferença na inferência de tipos quando um valor default é aplicado versus quando não é.

```typescript
import { string } from 'yup';

let value: string = string().default('hi').validate(undefined);

// vs

let value: string | undefined = string().validate(undefined);
```

--------------------------------

### Transformação de string

Fonte: https://github.com/jquense/yup/blob/master/README.md

Adiciona uma transformação a um esquema, alterando como os valores são convertidos (cast). Transformações são executadas antes das validações e não são aplicadas em modo `strict`. Este exemplo converte strings para maiúsculas.

```javascript
let schema = string().transform((value, originalValue) => {
  return this.isType(value) && value !== null ? value.toUpperCase() : value;
});

schema.cast('jimmy'); // => 'JIMMY'
```

--------------------------------

### Mixed customizado com verificação de tipo

Fonte: https://github.com/jquense/yup/blob/master/README.md

Implementa um esquema `mixed` customizado fornecendo uma função de verificação de tipo, que também estreita o tipo no TypeScript. O exemplo usa `ObjectId` como tipo customizado.

```typescript
import { mixed, InferType } from 'yup';

let objectIdSchema = mixed((input): input is ObjectId => input instanceof ObjectId)
  .transform((value: any, input, ctx) => {
    if (ctx.isType(value)) return value;
    return new ObjectId(value);
  });

await objectIdSchema.validate(ObjectId('507f1f77bcf86cd799439011')); // ObjectId("507f1f77bcf86cd799439011")

await objectIdSchema.validate('507f1f77bcf86cd799439011'); // ObjectId("507f1f77bcf86cd799439011")

InferType<typeof objectIdSchema>; // ObjectId
```

--------------------------------

### Testes de validação

Fonte: https://github.com/jquense/yup/blob/master/README.md

Demonstra testes básicos de validação no Yup, como tamanho mínimo e formato de email. Também mostra como lidar com erros de validação.

```javascript
string()
  .min(3, 'deve ter ao menos 3 caracteres')
  .email('deve ser um email válido')
  .validate('no'); // ValidationError
```

--------------------------------

### Describe (descrição) do esquema

Fonte: https://github.com/jquense/yup/blob/master/README.md

O método `describe` gera um objeto serializável contendo detalhes do esquema, como meta, labels e testes. Ele pode aceitar `ResolveOptions` para esquemas com componentes dinâmicos como references, lazy ou condições.

```javascript
let schema = object({
  name: string().required(),
});

let description = schema.describe();
```

```javascript
import { ref, object, string, boolean } from 'yup';

let schema = object({
  isBig: boolean(),
  count: number().when('isBig', {
    is: true,
    then: (schema) => schema.min(5),
    otherwise: (schema) => schema.min(0),
  }),
});

schema.describe({ value: { isBig: true } });
```

--------------------------------

### Configuração e mutação de esquemas Yup

Fonte: https://github.com/jquense/yup/blob/master/README.md

Métodos para configurar o comportamento do esquema, como definir `strict`, marcar propriedades para remoção (strip) ou mutar o esquema in-place para casos avançados.

```APIDOC
Schema.strict(enabled: boolean = false): Schema
  Define a opção `strict` para `true`. Esquemas estritos pulam coercion e transformações, validando o valor "como está".

  Schema.strip(enabled: boolean = true): Schema
  Marca um esquema para ser removido de um objeto de saída. Funciona apenas como esquema aninhado.

  Schema.withMutation(builder: (current: Schema) => void): void
  Permite mutação do esquema in-place, em vez do comportamento padrão que clona antes de cada alteração. Útil para mutações que ocorrem em tempo de cast/validation, como esquemas condicionais usando `when()`.
```

```js
let schema = object({
  useThis: number(),
  notThis: string().strip(),
});

InferType<typeof schema>; /*
{
   useThis?: number | undefined
}
*/

object()
  .shape({ key: string() })
  .withMutation((schema) => {
    return arrayOfObjectTests.forEach((test) => {
      schema.test(test);
    });
  });
```

--------------------------------

### Métodos da classe base Schema

Fonte: https://github.com/jquense/yup/blob/master/README.md

Documentação da classe abstrata base `Schema` no Yup, detalhando métodos como `clone` para cópia profunda e `label` para sobrescrever chaves nas mensagens de erro.

```APIDOC
Schema
  `Schema` é a classe abstrata base que todos os tipos de esquema herdam. Ela fornece diversos métodos e propriedades base
  para todos os outros tipos de esquema.

  > Nota: a menos que você esteja criando um tipo de esquema customizado, Schema nunca deve ser usado diretamente. Para tipos desconhecidos/any use [`mixed()`](#mixed)

  Schema.clone(): Schema
    Cria uma cópia profunda do esquema. Clone é usado internamente para retornar um novo esquema a cada alteração de estado.

  Schema.label(label: string): Schema
    Sobrescreve o nome da chave que é usado nas mensagens de erro.
```

--------------------------------

### Definição básica de esquema Yup e validação

Fonte: https://github.com/jquense/yup/blob/master/README.md

Demonstra como definir um esquema Yup para dados de usuário, incluindo campos obrigatórios, restrições de tipo (string, number, email, URL), valores default e como validar e inferir tipos a partir do esquema.

```ts
import { object, string, number, date, InferType } from 'yup';

let userSchema = object({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email(),
  website: string().url().nullable(),
  createdOn: date().default(() => new Date()),
});

// parse e afirmar validade
let user = await userSchema.validate(await fetchUser());

type User = InferType<typeof userSchema>;
/* {
  name: string;
  age: number;
  email?: string | undefined
  website?: string | null | undefined
  createdOn: Date
}*/
```

--------------------------------

````
Fonte: https://github.com/jquense/yup/blob/master/README.md

Esta seção descreve as principais funções e métodos da API do Yup para criar e manipular esquemas. Cobre funções para criação de esquemas, modificações, validação e utilitários.

```APIDOC
yup:
  reach(schema: Schema, path: string, value?: object, context?: object): Schema
    - Resolve uma propriedade de esquema em um determinado caminho.
    - Parâmetros:
      - schema: O esquema a ser percorrido.
      - path: O caminho até a propriedade do esquema.
      - value: O valor para resolver o esquema contra.
      - context: Contexto opcional para resolução.
    - Retorna: O esquema no caminho especificado.

  addMethod(schemaType: Schema, name: string, method: ()=> Schema): void
    - Adiciona um método de validação customizado a um tipo de esquema.
    - Parâmetros:
      - schemaType: O tipo de esquema ao qual adicionar o método (ex.: yup.string).
      - name: O nome do método a ser adicionado.
      - method: A função que implementa o método.
    - Retorna: void

  ref(path: string, options: { contextPrefix: string }): Ref
    - Cria uma referência a um valor dentro do contexto de validação.
    - Parâmetros:
      - path: O caminho para o valor referenciado.
      - options: Opções de configuração para a referência.
    - Retorna: Um objeto Ref.

  lazy((value: any) => Schema): Lazy
    - Cria um esquema que adia sua definição até o tempo de execução com base no valor de entrada.
    - Parâmetros:
      - value: Uma função que recebe o valor e retorna um esquema.
    - Retorna: Um objeto Lazy.

  ValidationError(errors: string | Array<string>, value: any, path: string)
    - Construtor para ValidationError.
    - Parâmetros:
      - errors: Uma string ou array de mensagens de erro.
      - value: O valor que falhou na validação.
      - path: O caminho para o valor inválido.

Schema:
  clone(): Schema
    - Cria uma cópia profunda do esquema.
    - Retorna: Uma nova instância de Schema.

  label(label: string): Schema
    - Define um rótulo legível para o esquema.
    - Parâmetros:
      - label: O rótulo a ser atribuído.
    - Retorna: A instância de Schema modificada.

  meta(metadata: SchemaMetadata): Schema
    - Anexa metadados arbitrários ao esquema.
    - Parâmetros:
      - metadata: Um objeto contendo metadados.
    - Retorna: A instância de Schema modificada.

  describe(options?: ResolveOptions): SchemaDescription
    - Retorna uma descrição da estrutura e restrições do esquema.
    - Parâmetros:
      - options: Opções para descrever o esquema.
    - Retorna: Um objeto SchemaDescription.

  concat(schema: Schema): Schema
    - Mescla dois esquemas.
    - Parâmetros:
      - schema: O esquema a ser concatenado.
    - Retorna: Uma nova instância de Schema representando o esquema mesclado.

  validate(value: any, options?: object): Promise<InferType<Schema>, ValidationError>
    - Valida um valor de forma assíncrona contra o esquema.
    - Parâmetros:
      - value: O valor a validar.
      - options: Opções de validação.
    - Retorna: Uma Promise que resolve com o valor validado ou rejeita com ValidationError.

  validateSync(value: any, options?: object): InferType<Schema>
    - Valida um valor de forma síncrona contra o esquema.
    - Parâmetros:
      - value: O valor a validar.
      - options: Opções de validação.
    - Retorna: O valor validado.

  validateAt(path: string, value: any, options?: object): Promise<InferType<Schema>, ValidationError>
    - Valida de forma assíncrona uma parte específica de um valor em um caminho dado.
    - Parâmetros:
      - path: O caminho para o valor a validar.
      - value: O objeto contendo o valor a validar.
      - options: Opções de validação.
    - Retorna: Uma Promise que resolve com o valor validado ou rejeita com ValidationError.

  validateSyncAt(path: string, value: any, options?: object): InferType<Schema>
    - Valida de forma síncrona uma parte específica de um valor em um caminho dado.
    - Parâmetros:
      - path: O caminho para o valor a validar.
      - value: O objeto contendo o valor a validar.
      - options: Opções de validação.
    - Retorna: O valor validado.

  isValid(value: any, options?: object): Promise<boolean>
    - Verifica de forma assíncrona se um valor é válido contra o esquema.
    - Parâmetros:
      - value: O valor a ser verificado.
      - options: Opções de verificação.
    - Retorna: Uma Promise que resolve para true se válido, false caso contrário.

  isValidSync(value: any, options?: object): boolean
    - Verifica de forma síncrona se um valor é válido contra o esquema.
    - Parâmetros:
      - value: O valor a verificar.
      - options: Opções de verificação.
    - Retorna: true se válido, false caso contrário.

  cast(value: any, options = {}): InferType<Schema>
    - Converte (cast) um valor para o tipo do esquema, aplicando transformações.
    - Parâmetros:
      - value: O valor a ser convertido.
      - options: Opções de conversão.
    - Retorna: O valor convertido.

  isType(value: any): value is InferType<Schema>
    - Verifica se um valor é do tipo definido pelo esquema sem executar validação.
    - Parâmetros:
      - value: O valor a ser verificado.
    - Retorna: true se o tipo do valor corresponder ao esquema, false caso contrário.

  strict(enabled: boolean = false): Schema
    - Ativa ou desativa o modo `strict` do esquema, prevenindo coerção e transformações.
    - Parâmetros:
      - enabled: Se deve ativar o modo estrito.
    - Retorna: A instância de Schema modificada.

  strip(enabled: boolean = true): Schema
    - Habilita ou desabilita a remoção de propriedades durante cast/validation.
    - Parâmetros:
      - enabled: Se deve ativar a remoção.
    - Retorna: A instância de Schema modificada.

  withMutation(builder: (current: Schema) => void): void
    - Permite executar múltiplas mutações em um esquema em uma única operação.
    - Parâmetros:
      - builder: Função que recebe o esquema atual e realiza mutações.
    - Retorna: void

  default(value: any): Schema
    - Define um valor padrão para o esquema.
    - Parâmetros:
      - value: O valor padrão.
    - Retorna: A instância de Schema modificada.

  getDefault(options?: object): Any
    - Recupera o valor padrão do esquema.
    - Parâmetros:
      - options: Opções para recuperação do default.
    - Retorna: O valor padrão.

  nullable(message?: string | function): Schema
    - Marca o esquema como anulável (aceita null).
    - Parâmetros:
      - message: Mensagem de erro customizada para null.
    - Retorna: A instância de Schema modificada.

  nonNullable(message?: string | function): Schema
    - Marca o esquema como não anulável (não aceita null).
    - Parâmetros:
      - message: Mensagem de erro customizada para null.
    - Retorna: A instância de Schema modificada.

  defined(): Schema
    - Marca o esquema como definido (não permite undefined).
    - Retorna: A instância de Schema modificada.

  optional(): Schema
    - Marca o esquema como opcional (permite undefined).
    - Retorna: A instância de Schema modificada.

  required(message?: string | function): Schema
    - Marca o esquema como obrigatório, garantindo presença de valor.
    - Parâmetros:
      - message: Mensagem de erro customizada para valores ausentes.
    - Retorna: A instância de Schema modificada.

  notRequired(): Schema
    - Marca o esquema como não obrigatório, permitindo undefined.
    - Retorna: A instância de Schema modificada.

  typeError(message: string): Schema
    - Define uma mensagem de erro customizada para falhas de tipo.
    - Parâmetros:
      - message: Mensagem de erro.
    - Retorna: A instância de Schema modificada.

  oneOf(arrayOfValues: Array<any>, message?: string | function): Schema
    - Cria um esquema que permite apenas valores contidos em um array especificado.
    - Parâmetros:
      - arrayOfValues: Array com valores permitidos.
      - message: Mensagem de erro customizada.
    - Retorna: A instância de Schema modificada.
  Alias: equals

  notOneOf(arrayOfValues: Array<any>, message?: string | function):
    - Cria um esquema que invalida valores presentes em um array especificado.
    - Parâmetros:
      - arrayOfValues: Array com valores proibidos.
      - message: Mensagem de erro customizada.
    - Retorna: A instância de Schema modificada.

  when(keys: string | string[], builder: object | (values: any[], schema) => Schema): Schema
    - Cria lógica condicional de validação baseada em outros campos do esquema.
    - Parâmetros:
      - keys: Chave(s) a serem monitoradas para mudanças.
      - builder: Função ou objeto que define o esquema condicional.
    - Retorna: A instância de Schema modificada.
```

--------------------------------

### Object Schema Transforms

Source: https://github.com/jquense/yup/blob/master/README.md

Demonstrates common transforms for object schemas in Yup, including omitting keys, setting exactness, stripping unknown properties, and case conversion.

```javascript
let obj = object({
  firstName: string().lowercase().trim(),
})
  .json()
  .camelCase()
  .cast('{"first_name": "jAnE "}'); // { firstName: 'jane' }
```

--------------------------------

### Object Schema Defaults

Source: https://github.com/jquense/yup/blob/master/README.md

Demonstrates how object schemas in Yup come with default values that build out the object shape and set defaults for fields. It also highlights a gotcha with nested optional objects containing required fields.

```js
let schema = object({
  name: string().default(''),
});

schema.default(); // -> { name: '' }
```

```js
let schema = object({
  id: string().required(),
  names: object({
    first: string().required(),
  }),
});

schema.isValid({ id: 1 }); // false! names.first is required
```

--------------------------------

### Yup Core Schema and Types

Source: https://github.com/jquense/yup/blob/master/README.md

Imports for core Yup schema types (mixed, string, number, etc.), schema classes (Schema, StringSchema, etc.), and type definitions (InferType, ISchema, etc.).

```ts
import {
  mixed,
  string,
  number,
  boolean,
  bool,
  date,
  object,
  array,
  ref,
  lazy,
} from 'yup';

// Classes
import {
  Schema,
  MixedSchema,
  StringSchema,
  BooleanSchema,
  DateSchema,
  ArraySchema,
  ObjectSchema,
} from 'yup';

// Types
import type { InferType, ISchema, AnySchema, AnyObjectSchema } from 'yup';
```