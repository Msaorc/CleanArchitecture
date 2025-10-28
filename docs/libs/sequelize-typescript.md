### Configuração do Sequelize-TypeScript com caminho de Models

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Ilustra como inicializar uma instância do Sequelize com `sequelize-typescript`, especificando o diretório onde os models serão descobertos. Essa é uma configuração comum para carregar todos os models a partir de uma pasta específica.

```typescript
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'some_db',
  dialect: 'sqlite',
  username: 'root',
  password: '',
  storage: ':memory:',
  models: [__dirname + '/models'], // ou [Player, Team]
});
```

--------------------------------

### Instalar sequelize-typescript e dependências

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Instala as dependências necessárias, como `@types/node` e `@types/validator`, além de `sequelize`, `reflect-metadata` e `sequelize-typescript` para integração com o Sequelize v6.

```sh
npm install --save-dev @types/node @types/validator
npm install sequelize reflect-metadata sequelize-typescript
```

--------------------------------

### Métodos de associação com tipagem (Type-Safe) em Sequelize-TypeScript

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Mostra como usar os métodos gerados de associação do Sequelize (como `get`, `set`, `add`) de forma tipada dentro do `sequelize-typescript` usando `.$get`, `.$set`, `.$add`, etc.

```TypeScript
@Table
class ModelA extends Model {
  @HasMany(() => ModelB)
  bs: ModelB[];
}

@Table
class ModelB extends Model {
  @BelongsTo(() => ModelA)
  a: ModelA;
}
```

```TypeScript
const modelA = new ModelA();

modelA
  .$set('bs', [
    /* instância */
  ])
  .then(/* ... */);
modelA.$add('b' /* instância */).then(/* ... */);
modelA.$get('bs').then(/* ... */);
modelA.$count('bs').then(/* ... */);
modelA.$has('bs').then(/* ... */);
modelA.$remove('bs' /* instância */).then(/* ... */);
modelA.$create('bs' /* valor */).then(/* ... */);
```

--------------------------------

### Encontrar e atualizar instâncias de Model

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Exemplos de como encontrar uma única instância de model, atualizar suas propriedades e salvar as alterações, além de atualizar múltiplos registros com base em uma condição.

```typescript
Person.findOne().then((person) => {
  person.age = 100;
  return person.save();
});

Person.update(
  {
    name: 'bobby',
  },
  { where: { id: 1 } }
).then(() => {});
```

--------------------------------

### Definir coluna com opções detalhadas usando @Column

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Este exemplo demonstra como definir uma coluna com opções detalhadas usando um literal de objeto passado ao decorator `@Column`. Todas as opções padrão de atributo do Sequelize podem ser usadas aqui, permitindo controle fino sobre propriedades da coluna como tipo, comentário e restrições.

```typescript
@Column({
    type: DataType.FLOAT,
    comment: 'Algum valor',
    ...
  })
  value: number;
```

--------------------------------

### Definir coluna com tipo inferido usando @Column

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Este exemplo mostra o uso básico do decorator `@Column` sem argumentos. O `sequelize-typescript` infere o tipo de dado da coluna a partir do tipo TypeScript da propriedade. Isso requer que o tipo seja inferível.

```typescript
  @Column
  name: string;
```

--------------------------------

### Criar e salvar instâncias de Model

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Demonstra criar e salvar instâncias de model usando tanto o método `build` quanto o construtor com `sequelize-typescript`.

```typescript
const person = Person.build({ name: 'bob', age: 99 });
person.save();

Person.create({ name: 'bob', age: 99 });
```

```typescript
const person = new Person({ name: 'bob', age: 99 });
person.save();
```

--------------------------------

### Recuperar e usar Repository

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Ilustra como obter uma instância de repositório para um model específico usando `sequelize.getRepository(Model)` e então executar operações como criar ou buscar instâncias.

```typescript
const userRepository = sequelize.getRepository(User);

const luke = await userRepository.create({ name: 'Luke Skywalker' });
const luke = await userRepository.findOne({ where: { name: 'luke' } });
```

--------------------------------

### Habilitar o modo Repository no Sequelize

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Mostra como ativar o modo de repositório no Sequelize definindo a flag `repositoryMode` como `true` durante a inicialização da instância do Sequelize.

```typescript
const sequelize = new Sequelize({
  repositoryMode: true,
  // ... outras opções
});
```

--------------------------------

### Configuração do Sequelize-TypeScript com padrões glob (glob patterns)

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Demonstra configurar o Sequelize com `sequelize-typescript` usando padrões glob para encontrar e carregar dinamicamente arquivos de model. Essa abordagem é útil para projetos com muitos arquivos de model organizados em subdiretórios.

```typescript
import {Sequelize} from 'sequelize-typescript';

const sequelize =  new Sequelize({
        ...
        models: [__dirname + '/**/*.model.ts']
});
// ou
sequelize.addModels([__dirname + '/**/*.model.ts']);
```

--------------------------------

### Sequelize-TypeScript: adicionando Models manualmente

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Mostra duas formas de adicionar models a uma instância do Sequelize após a inicialização: passando as classes de model diretamente ou fornecendo um caminho para um diretório contendo os models. Útil para carregamento dinâmico de models.

```typescript
sequelize.addModels([Person]);
sequelize.addModels(['path/to/models']);
```

--------------------------------

### Usar associações com Repository Mode

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Explica como lidar com associações quando se usa o modo repository, incluindo repositórios nas opções `include` de operações `find` ou `create`.

```typescript
const userRepository = sequelize.getRepository(User);
const addressRepository = sequelize.getRepository(Address);

userRepository.find({ include: [addressRepository] });
userRepository.create({ name: 'Bear' }, { include: [addressRepository] });
```

--------------------------------

### Anotações TypeScript para Hooks de Model

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Mostra como implementar hooks de model do Sequelize (por exemplo, `@BeforeUpdate`, `@BeforeCreate`) usando métodos estáticos dentro da classe do model. Vários hooks podem ser aplicados ao mesmo método, e métodos diferentes podem tratar hooks diferentes.

```typescript
@Table
export class Person extends Model {
  @Column
  name: string;

  @BeforeUpdate
  @BeforeCreate
  static makeUpperCase(instance: Person) {
    // isso será chamado quando uma instância for criada ou atualizada
    instance.name = instance.name.toLocaleUpperCase();
  }

  @BeforeCreate
  static addUnicorn(instance: Person) {
    // isso também será chamado quando uma instância for criada
    instance.name += ' 🦄';
  }
}
```

--------------------------------

### Definição básica de Model em TypeScript

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Define um model `User` estendendo a classe `Model` do Sequelize, usado para casar com nomes de arquivos no `sequelize-typescript`.

```typescript
export class User extends Model {}
```

--------------------------------

### Definir índices nomeados e multi-campos com @Index

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Ilustra como definir índices nomeados, índices multi-campo e índices com opções customizadas (como UNIQUE, cláusulas WHERE, etc.) usando o decorator `@Index`.

```TypeScript
@Table
class Person extends Model {
  @Index('my-index') // Define um índice multi-campo em name e birthday
  @Column
  name: string;

  @Index('my-index') // Adiciona birthday como segundo campo do my-index
  @Column
  birthday: Date;

  @Index({
    // opções do índice
    name: 'job-index',
    parser: 'my-parser',
    type: 'UNIQUE',
    unique: true,
    where: { isEmployee: true },
    concurrently: true,
    using: 'BTREE',
    operator: 'text_pattern_ops',
    prefix: 'test-',
    // opções do campo do índice
    length: 10,
    order: 'ASC',
    collate: 'NOCASE',
  })
  @Column
  jobTitle: string;

  @Column
  isEmployee: boolean;
}
```

--------------------------------

### Trecho de código para issues do Sequelize-TypeScript

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/ISSUE_TEMPLATE.md

Esta seção é destinada a usuários que queiram fornecer trechos de código relacionados ao problema com `sequelize-typescript`. Recomenda-se incluir `tsconfig` e opções do Sequelize para melhor contexto.

```TypeScript
insira pequenos trechos de código aqui
```

--------------------------------

### Definição de Model com nomeação personalizada

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Ilustra um arquivo de model `user.model.ts` com membros exportados, demonstrando como a função customizada `modelMatch` identifica o model correto.

```typescript
// user.model.ts
import {Table, Column, Model} from 'sequelize-typescript';

export const UserN = 'Not a model';
export const NUser = 'Not a model';

@Table
export class User extends Model {

  @Column
  nickname: string;
}
```

--------------------------------

### Associação one-to-one

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Explica o uso de `@HasOne(...)` e `@BelongsTo(...)` para definir relacionamentos one-to-one no `sequelize-typescript`.

```typescript
// Para one-to-one use @HasOne(...) (a chave estrangeira da relação existe no outro model)
// e @BelongsTo(...) (a chave estrangeira da relação existe neste model)
```

--------------------------------

### Lidando com múltiplas relações usando chaves estrangeiras explícitas

Fonte: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Mostra como gerenciar múltiplas associações entre os mesmos models definindo explicitamente chaves estrangeiras usando `@ForeignKey` e `@BelongsTo`/`@HasMany`.

```TypeScript
@Table
class Book extends Model {
  @ForeignKey(() => Person)
  @Column
  authorId: number;

  @BelongsTo(() => Person)
  author: Person;

  @ForeignKey(() => Person)
  @Column
  proofreaderId: number;

  @BelongsTo(() => Person)
  proofreader: Person;
}

@Table
class Person extends Model {
  @HasMany(() => Book)
  writtenBooks: Book[];

  @HasMany(() => Book)
  proofedBooks: Book[];
}
```

```TypeScript
// na classe "Books":
@BelongsTo(() => Person, 'authorId')
author: Person;

@BelongsTo(() => Person, 'proofreaderId')
proofreader: Person;

// na classe "Person":
@HasMany(() => Book, 'authorId')
writtenBooks: Book[];

@HasMany(() => Book, 'proofreaderId')
```
```

--------------------------------

### Custom Model Matching in Sequelize-TypeScript

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Configures sequelize-typescript to match model files based on a custom function, allowing flexible naming conventions.

```typescript
import {Sequelize} from 'sequelize-typescript';

const sequelize =  new Sequelize({
  models: [__dirname + '/models/**/*.model.ts']
  modelMatch: (filename, member) => {
    return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  },
});
```

--------------------------------

### Type-Safe Through-Table Access

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Demonstrates how to manually set up types for accessing the through-table instance (e.g., BookAuthor) in a many-to-many association.

```typescript
@BelongsToMany(() => Book, () => BookAuthor)
  books: Array<Book & {BookAuthor: BookAuthor}>;
```

--------------------------------

### Default Export Model Matching

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Shows an alternative method for model matching where the model class is the default export of the file.

```typescript
export default class User extends Model {}
```

--------------------------------

### Including Associated Models in Queries

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Shows how to include associated models (e.g., Player) when querying a parent model (e.g., Team) using the 'include' option.

```typescript
Team.findOne({ include: [Player] }).then((team) => {
  team.players.forEach((player) => console.log(`Player ${player.name}`));
});
```

--------------------------------

### Configure tsconfig.json for Decorators

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Sets the TypeScript compiler options 'target' to 'es6' or higher, and enables 'experimentalDecorators' and 'emitDecoratorMetadata' for using decorators in the project.

```json
{
  "target": "es6", // or a more recent ecmascript version
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true
}
```

--------------------------------

### TypeScript Annotations for Sequelize Scopes

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Illustrates how to define default and custom scopes for Sequelize models using the @DefaultScope and @Scopes annotations. Scopes can include specific attributes, eager load associations, or apply filtering conditions.

```typescript
@DefaultScope(() => ({
  attributes: ['id', 'primaryColor', 'secondaryColor', 'producedAt'],
}))
@Scopes(() => ({
  full: {
    include: [Manufacturer],
  },
  yellow: {
    where: { primaryColor: 'yellow' },
  },
}))
@Table
export class ShoeWithScopes extends Model {
  @Column
  readonly secretKey: string;

  @Column
  primaryColor: string;

  @Column
  secondaryColor: string;

  @Column
  producedAt: Date;

  @ForeignKey(() => Manufacturer)
  @Column
  manufacturerId: number;

  @BelongsTo(() => Manufacturer)
  manufacturer: Manufacturer;
}
```

--------------------------------

### Define a More Strict Sequelize Model with Attributes and Creation Attributes

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Illustrates defining a strict Sequelize model by specifying TypeScript interfaces for attributes and creation attributes, including optional fields like 'id'. This enhances type safety.

```typescript
import { Optional } from 'sequelize';
import { Table, Model } from 'sequelize-typescript';

interface PersonAttributes {
  id: number;
  name: string;
}

interface PersonCreationAttributes extends Optional<PersonAttributes, 'id'> {}

@Table
class Person extends Model<PersonAttributes, PersonCreationAttributes> {}
```

--------------------------------

### Define Timestamps with @CreatedAt, @UpdatedAt, @DeletedAt

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

This snippet demonstrates how to use the @CreatedAt, @UpdatedAt, and @DeletedAt decorators to automatically manage timestamp columns in a Sequelize model. These decorators set the `timestamps` and `paranoid` options and map to specific column names.

```typescript
  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
```

--------------------------------

### Sequelize-TypeScript Model with Accessors

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Defines a Person model using sequelize-typescript decorators, including custom getter and setter methods for the 'name' attribute. This demonstrates how to integrate accessors within your models.

```typescript
import { Table, Model, Column } from 'sequelize-typescript';

@Table
class Person extends Model {
  @Column
  get name(): string {
    return 'My name is ' + this.getDataValue('name');
  }

  set name(value: string) {
    this.setDataValue('name', value);
  }
}
```

--------------------------------

### Configure @Table Decorator with Sequelize Options

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Demonstrates how to pass Sequelize define options, such as 'timestamps', to the @Table decorator for customizing model behavior.

```typescript
@Table({
  timestamps: true,
  ...
})
class Person extends Model {}
```

--------------------------------

### Use @Scopes and @DefaultScope with Lambda Options

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Shows the updated syntax for @Scopes and @DefaultScope decorators, which now accept lambda functions returning scope options, replacing the deprecated direct object literal syntax.

```typescript
@DefaultScope(() => ({
  ...
}))
@Scopes(() => ({
  ...
}))
```

--------------------------------

### Define Default Index with @Index

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Demonstrates how to define a default index on a model column using the @Index decorator without any parameters.

```TypeScript
@Table
class Person extends Model {
  @Index // Define an index with default name
  @Column
  name: string;

  @Index // Define another index
  @Column
  birthday: Date;
}
```

--------------------------------

### Define a Less Strict Sequelize Model

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Shows a minimal Sequelize model definition using only the @Table decorator, suitable for cases where strict column definitions are not immediately required.

```typescript
import { Table, Model } from 'sequelize-typescript';

@Table
class Person extends Model {}
```

--------------------------------

### Define a Basic Sequelize Model with @Table and @Column

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Demonstrates defining a Sequelize model named 'Person' using TypeScript decorators. The @Table decorator marks the class as a Sequelize model, and @Column decorates properties that should be mapped to database columns.

```typescript
import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table
class Person extends Model {
  @Column
  name: string;

  @Column
  birthday: Date;

  @HasMany(() => Hobby)
  hobbies: Hobby[];
}
```

--------------------------------

### Many-to-Many Association Definition

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Defines a many-to-many relationship between Book and Author models, using a BookAuthor through-table.

```typescript
@Table
class Book extends Model {
  @BelongsToMany(() => Author, () => BookAuthor)
  authors: Author[];
}

@Table
class Author extends Model {
  @BelongsToMany(() => Book, () => BookAuthor)
  books: Book[];
}

@Table
class BookAuthor extends Model {
  @ForeignKey(() => Book)
  @Column
  bookId: number;

  @ForeignKey(() => Author)
  @Column
  authorId: number;
}
```

--------------------------------

### One-to-Many Association Definition

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Defines a one-to-many relationship between Player and Team models using @ForeignKey, @BelongsTo, and @HasMany decorators.

```typescript
@Table
class Player extends Model {
  @Column
  name: string;

  @Column
  num: number;

  @ForeignKey(() => Team)
  @Column
  teamId: number;

  @BelongsTo(() => Team)
  team: Team;
}

@Table
class Team extends Model {
  @Column
  name: string;

  @HasMany(() => Player)
  players: Player[];
}
```

--------------------------------

### TypeScript Annotations for Sequelize Validation

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

Demonstrates how to use Sequelize-TypeScript annotations like @Length, @Contains, @IsUrl, @IsDate, @IsBefore, and custom @Is validators to enforce data integrity on model attributes. Custom validators can be defined using inline functions or named functions.

```typescript
const HEX_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

@Table
export class Shoe extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

  @Equals('lala')
  @Column
  readonly key: string;

  @Contains('Special')
  @Column
  special: string;

  @Length({ min: 3, max: 15 })
  @Column
  brand: string;

  @IsUrl
  @Column
  brandUrl: string;

  @Is('HexColor', (value) => {
    if (!HEX_REGEX.test(value)) {
      throw new Error(`"${value}" is not a hex color value.`);
    }
  })
  @Column
  primaryColor: string;

  @Is(function hexColor(value: string): void {
    if (!HEX_REGEX.test(value)) {
      throw new Error(`"${value}" is not a hex color value.`);
    }
  })
  @Column
  secondaryColor: string;

  @Is(HEX_REGEX)
  @Column
  tertiaryColor: string;

  @IsDate
  @IsBefore('2017-02-27')
  @Column
  producedAt: Date;
}
```

--------------------------------

### Define Column with Explicit DataType using @Column

Source: https://github.com/sequelize/sequelize-typescript/blob/master/README.md

This snippet illustrates how to explicitly define a column's data type using the @Column decorator by passing a DataType from 'sequelize-typescript'. This is useful when automatic type inference is not possible or desired.

```typescript
import {DataType} from 'sequelize-typescript';

  @Column(DataType.TEXT)
  name: string;
```