# ORM Sequelize

Sequelize é um ORM (Object-Relational Mapping) para Node.js baseado em Promises que fornece uma camada de abstração poderosa para bancos de dados SQL. Ele oferece suporte a PostgreSQL, MySQL, MariaDB, SQLite, Microsoft SQL Server, Oracle DB, Snowflake, DB2 e IBM i, permitindo que desenvolvedores trabalhem com bancos de dados usando objetos JavaScript em vez de escrever SQL bruto. A biblioteca possui suporte robusto a transações, manipulação abrangente de associações, construção de queries e suporte a migrações.

No núcleo, o Sequelize fornece uma arquitetura orientada a Models, onde cada model representa uma tabela do banco de dados e instâncias representam linhas individuais. O ORM gerencia pool de conexões, geração de queries, conversão de tipos e parsing de resultados automaticamente. Ele oferece tanto abstrações de alto nível por meio de Models quanto controle de baixo nível via `QueryInterface` e queries raw, tornando-o adequado para operações CRUD simples e também para aplicações empresariais complexas com relacionamentos e requisitos transacionais sofisticados.

## Instalação e Configuração Básica

Inicialize o Sequelize com a conexão ao banco de dados

```javascript
const { Sequelize, DataTypes, Model } = require('@sequelize/core');

// Opção 1: URI de conexão
const sequelize = new Sequelize('postgres://user:pass@localhost:5432/dbname');

// Opção 2: Credenciais separadas
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'pass',
  database: 'dbname',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: console.log // ou false para desabilitar
});

// Testar conexão
try {
  await sequelize.authenticate();
  console.log('Conexão estabelecida com sucesso.');
} catch (error) {
  console.error('Não foi possível conectar:', error);
}

// Fechar conexão quando terminar
await sequelize.close();
```

## Definição de Model

Defina models que representam tabelas do banco de dados

```javascript
// Método 1: sequelize.define
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,
      max: 150
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'users',
  timestamps: true, // adiciona createdAt, updatedAt
  paranoid: true,   // adiciona deletedAt para soft deletes
  underscored: true // usa nomes de coluna em snake_case
});

// Método 2: Estendendo a classe Model
class Product extends Model {}

Product.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'Product'
});

// Sincronizar models com o banco (cria tabelas)
await sequelize.sync(); // Cria tabelas se não existirem
await sequelize.sync({ force: true }); // Destroi e recria tabelas
await sequelize.sync({ alter: true }); // Altera tabelas para coincidir com models
```

## Operações de Create

Inserir novos registros no banco de dados

```javascript
// Criar um registro
const user = await User.create({
  username: 'john_doe',
  email: 'john@example.com',
  age: 28
});
console.log(user.id); // ID gerado automaticamente
console.log(user.createdAt); // timestamp gerado automaticamente

// Construir instância sem salvar
const user = User.build({
  username: 'jane_doe',
  email: 'jane@example.com'
});
await user.save(); // Agora salva no banco

// Bulk create (criar múltiplos registros)
const users = await User.bulkCreate([
  { username: 'alice', email: 'alice@example.com', age: 25 },
  { username: 'bob', email: 'bob@example.com', age: 30 },
  { username: 'charlie', email: 'charlie@example.com', age: 35 }
], {
  validate: true, // Executar validações
  returning: true // Retornar registros criados (PostgreSQL)
});
console.log(`Criados ${users.length} usuários`);

// Criar com associações aninhadas
const userWithPosts = await User.create({
  username: 'author',
  email: 'author@example.com',
  Posts: [
    { title: 'First Post', content: 'Content 1' },
    { title: 'Second Post', content: 'Content 2' }
  ]
}, {
  include: [Post]
});
```

## Operações de Read (findAll, findOne, findByPk)

Consultar registros no banco de dados

```javascript
// Buscar todos os registros
const allUsers = await User.findAll();

// Buscar com condições WHERE
const activeUsers = await User.findAll({
  where: {
    isActive: true,
    age: {
      [Op.gte]: 18
    }
  }
});

// Buscar um registro
const user = await User.findOne({
  where: {
    username: 'john_doe'
  }
});

// Buscar por chave primária
const user = await User.findByPk(123);

// Selecionar atributos específicos
const users = await User.findAll({
  attributes: ['id', 'username', 'email']
});

// Excluir atributos
const users = await User.findAll({
  attributes: {
    exclude: ['password', 'deletedAt']
  }
});

// Ordenação, limite e offset (paginação)
const users = await User.findAll({
  where: { isActive: true },
  order: [
    ['createdAt', 'DESC'],
    ['username', 'ASC']
  ],
  limit: 10,
  offset: 20
});

// Find and count (para paginação)
const { count, rows } = await User.findAndCountAll({
  where: { isActive: true },
  limit: 10,
  offset: 0
});
console.log(`Total: ${count}, Tamanho da página: ${rows.length}`);

// Find or create
const [user, created] = await User.findOrCreate({
  where: { username: 'john_doe' },
  defaults: {
    email: 'john@example.com',
    age: 28
  }
});
console.log(created ? 'Criou novo usuário' : 'Encontrou usuário existente');
```

## Operações de Update

Modificar registros existentes no banco de dados

```javascript
// Atualizar instância
const user = await User.findByPk(1);
user.email = 'newemail@example.com';
user.age = 29;
await user.save();

// Atualizar com instance.update()
await user.update({
  email: 'updated@example.com',
  age: 30
});

// Atualização em massa (método estático)
const [affectedCount] = await User.update(
  { isActive: false }, // valores a atualizar
  {
    where: {
      lastLogin: {
        [Op.lt]: new Date('2020-01-01')
      }
    }
  }
);
console.log(`Atualizados ${affectedCount} usuários`);

// Atualizar retornando registros atualizados (PostgreSQL)
const [affectedCount, affectedRows] = await User.update(
  { isActive: true },
  {
    where: { id: [1, 2, 3] },
    returning: true
  }
);

// Incrementar/Decrementar
await user.increment('loginCount'); // +1
await user.increment('loginCount', { by: 5 }); // +5
await user.decrement('credits', { by: 10 }); // -10

// Incremento em massa
await User.increment(
  { loginCount: 1 },
  { where: { isActive: true } }
);

// Upsert (inserir ou atualizar)
const [user, created] = await User.upsert({
  id: 1,
  username: 'john_doe',
  email: 'john@example.com'
});
```

## Operações de Delete

Remover registros do banco de dados

```javascript
// Deletar instância
const user = await User.findByPk(1);
await user.destroy();

// Deletar em massa (método estático)
const deletedCount = await User.destroy({
  where: {
    isActive: false,
    lastLogin: {
      [Op.lt]: new Date('2019-01-01')
    }
  }
});
console.log(`Deletados ${deletedCount} usuários`);

// Soft delete (models com paranoid)
const user = await User.findByPk(1);
await user.destroy(); // Define timestamp em deletedAt

// Consultar incluindo soft-deleted
const allUsers = await User.findAll({
  paranoid: false
});

// Restaurar soft-deleted
await user.restore();

// Forçar delete (hard delete)
await user.destroy({ force: true });

// Truncar tabela
await User.truncate(); // Remove todos os registros
await User.truncate({ cascade: true }); // Também remove registros associados
```

## Operadores de Query (Op)

Use operadores para condições WHERE complexas

```javascript
const { Op } = require('@sequelize/core');

// Operadores de comparação
const users = await User.findAll({
  where: {
    age: {
      [Op.gt]: 18,        // > 18
      [Op.lte]: 65        // <= 65
    },
    status: {
      [Op.ne]: 'banned'   // != 'banned'
    }
  }
});

// IN e BETWEEN
const users = await User.findAll({
  where: {
    id: {
      [Op.in]: [1, 2, 3, 4, 5]
    },
    age: {
      [Op.between]: [18, 65]
    }
  }
});

// Operadores de string
const users = await User.findAll({
  where: {
    email: {
      [Op.like]: '%@gmail.com'      // LIKE '%@gmail.com'
    },
    username: {
      [Op.startsWith]: 'john'        // LIKE 'john%'
    }
  }
});

// Checagens de NULL
const users = await User.findAll({
  where: {
    deletedAt: {
      [Op.is]: null
    }
  }
});

// Operadores lógicos (AND, OR, NOT)
const users = await User.findAll({
  where: {
    [Op.and]: [
      { age: { [Op.gte]: 18 } },
      { isActive: true }
    ]
  }
});

const users = await User.findAll({
  where: {
    [Op.or]: [
      { email: { [Op.like]: '%@gmail.com' } },
      { email: { [Op.like]: '%@yahoo.com' } },
      { username: { [Op.startsWith]: 'admin' } }
    ]
  }
});

// Complex nested conditions
const users = await User.findAll({
  where: {
    [Op.or]: [
      { status: 'active' },
      {
        [Op.and]: [
          { status: 'pending' },
          { createdAt: { [Op.gt]: new Date('2024-01-01') } }
        ]
      }
    ],
    age: { [Op.gte]: 18 }
  }
});

// PostgreSQL array operators
const posts = await Post.findAll({
  where: {
    tags: {
      [Op.contains]: ['javascript', 'nodejs'] // Array contains
    }
  }
});
```

## Aggregation Functions

Perform aggregate queries (count, sum, max, min)

```javascript
// Count records
const totalUsers = await User.count();

const activeUsers = await User.count({
  where: { isActive: true }
});

// Group by with count
const usersByAge = await User.count({
  group: 'age'
});

// Sum
const totalRevenue = await Order.sum('amount', {
  where: {
    status: 'completed',
    createdAt: {
      [Op.gte]: new Date('2024-01-01')
    }
  }
});

// Max and Min
const oldestUser = await User.max('age');
const youngestUser = await User.min('age');

const highestPrice = await Product.max('price', {
  where: { inStock: true }
});

// Generic aggregate
const avgAge = await User.aggregate('age', 'avg', {
  where: { isActive: true }
});

// Using sequelize.fn for complex aggregates
const users = await User.findAll({
  attributes: [
    'status',
    [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
    [sequelize.fn('AVG', sequelize.col('age')), 'avgAge']
  ],
  group: ['status']
});

// Results:
// [
//   { status: 'active', count: 50, avgAge: 32.5 },
//   { status: 'inactive', count: 20, avgAge: 45.2 }
// ]
```

## Associations - hasOne

Define one-to-one relationship (foreign key on target)

```javascript
// Define association
User.hasOne(Profile, {
  foreignKey: 'userId', // Column on Profile table
  as: 'profile',        // Alias for eager loading
  onDelete: 'CASCADE',  // Delete profile when user is deleted
  onUpdate: 'CASCADE'
});

Profile.belongsTo(User, {
  foreignKey: 'userId'
});

// Create with association
const user = await User.create({
  username: 'john_doe',
  email: 'john@example.com',
  profile: {
    bio: 'Software developer',
    avatarUrl: 'https://example.com/avatar.jpg'
  }
}, {
  include: [Profile]
});

// Lazy loading
const user = await User.findByPk(1);
const profile = await user.getProfile();

// Eager loading
const user = await User.findOne({
  where: { id: 1 },
  include: [{
    model: Profile,
    as: 'profile'
  }]
});
console.log(user.profile.bio);

// Set association
const user = await User.findByPk(1);
const profile = await Profile.findByPk(10);
await user.setProfile(profile);

// Create associated record
const profile = await user.createProfile({
  bio: 'New profile',
  avatarUrl: 'https://example.com/new.jpg'
});
```

## Associations - hasMany

Define one-to-many relationship (foreign key on target)

```javascript
// Define association
User.hasMany(Post, {
  foreignKey: 'userId',
  as: 'posts',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'userId',
  as: 'author'
});

// Eager loading
const user = await User.findOne({
  where: { id: 1 },
  include: [{
    model: Post,
    as: 'posts',
    where: { published: true },
    order: [['createdAt', 'DESC']],
    limit: 10
  }]
});

// Lazy loading
const posts = await user.getPosts({
  where: { published: true },
  order: [['createdAt', 'DESC']]
});

// Count associated records
const postCount = await user.countPosts({
  where: { published: true }
});

// Check if associated
const hasPost = await user.hasPost(somePost);
const hasPosts = await user.hasPosts([post1, post2]);

// Add association
await user.addPost(newPost);
await user.addPosts([post1, post2]);

// Set associations (replaces all)
await user.setPosts([post1, post2, post3]);

// Remove association
await user.removePost(post);
await user.removePosts([post1, post2]);

// Create associated record
const post = await user.createPost({
  title: 'New Post',
  content: 'Post content',
  published: true
});
```

## Associations - belongsTo

Define many-to-one relationship (foreign key on source)

```javascript
// Define association
Post.belongsTo(User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'author'
});

Comment.belongsTo(Post, {
  foreignKey: 'postId',
  as: 'post'
});

Comment.belongsTo(User, {
  foreignKey: 'authorId',
  as: 'author'
});

// Eager loading
const post = await Post.findOne({
  where: { id: 1 },
  include: [{
    model: User,
    as: 'author',
    attributes: ['id', 'username', 'email']
  }]
});
console.log(`Author: ${post.author.username}`);

// Nested includes
const comment = await Comment.findOne({
  where: { id: 1 },
  include: [
    {
      model: User,
      as: 'author'
    },
    {
      model: Post,
      as: 'post',
      include: [{
        model: User,
        as: 'author'
      }]
    }
  ]
});

// Lazy loading
const post = await Post.findByPk(1);
const author = await post.getAuthor();

// Set association
const user = await User.findByPk(10);
await post.setAuthor(user);

// Create associated parent
const author = await post.createAuthor({
  username: 'new_author',
  email: 'author@example.com'
});
```

## Associations - belongsToMany

Define many-to-many relationship through junction table

```javascript
// Define association
User.belongsToMany(Project, {
  through: 'UserProjects',     // Junction table name
  foreignKey: 'userId',        // FK pointing to User
  otherKey: 'projectId',       // FK pointing to Project
  as: 'projects'
});

Project.belongsToMany(User, {
  through: 'UserProjects',
  foreignKey: 'projectId',
  otherKey: 'userId',
  as: 'members'
});

// Or use a model for junction table
const UserProject = sequelize.define('UserProject', {
  role: {
    type: DataTypes.STRING,
    defaultValue: 'member'
  },
  joinedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

User.belongsToMany(Project, { through: UserProject, as: 'projects' });
Project.belongsToMany(User, { through: UserProject, as: 'members' });

// Eager loading
const user = await User.findOne({
  where: { id: 1 },
  include: [{
    model: Project,
    as: 'projects',
    through: {
      attributes: ['role', 'joinedAt'] // Include junction attributes
    }
  }]
});

user.projects.forEach(project => {
  console.log(`${project.name}: ${project.UserProject.role}`);
});

// Lazy loading
const projects = await user.getProjects();

// Add with junction table data
await user.addProject(project, {
  through: {
    role: 'admin',
    joinedAt: new Date()
  }
});

await user.addProjects([project1, project2], {
  through: {
    role: 'member'
  }
});

// Set associations
await user.setProjects([project1, project2]);

// Remove associations
await user.removeProject(project);
await user.removeProjects([project1, project2]);

// Check associations
const hasProject = await user.hasProject(someProject);
const hasProjects = await user.hasProjects([project1, project2]);

// Count associations
const projectCount = await user.countProjects();

// Create associated with junction data
const project = await user.createProject({
  name: 'New Project',
  description: 'Project description'
}, {
  through: {
    role: 'owner'
  }
});
```

## Transactions - Managed

Automatic commit on success, rollback on error

```javascript
// Basic managed transaction
try {
  const result = await sequelize.transaction(async (t) => {
    const user = await User.create({
      username: 'john_doe',
      email: 'john@example.com'
    }, { transaction: t });

    const profile = await Profile.create({
      userId: user.id,
      bio: 'User bio'
    }, { transaction: t });

    const posts = await Post.bulkCreate([
      { userId: user.id, title: 'Post 1' },
      { userId: user.id, title: 'Post 2' }
    ], { transaction: t });

    // If any operation fails, entire transaction rolls back
    return { user, profile, posts };
  });

  console.log('Transaction completed successfully');
} catch (error) {
  console.error('Transaction failed:', error);
}

// With isolation level
await sequelize.transaction(
  { isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE },
  async (t) => {
    // Transaction operations
    const user = await User.findOne({
      where: { id: 1 },
      lock: Transaction.LOCK.UPDATE,
      transaction: t
    });

    user.balance -= 100;
    await user.save({ transaction: t });
  }
);

// Read-only transaction
await sequelize.transaction(
  { readOnly: true },
  async (t) => {
    const users = await User.findAll({ transaction: t });
    return users;
  }
);
```

## Transactions - Unmanaged

Manual control over commit and rollback

```javascript
// Basic unmanaged transaction
const t = await sequelize.startUnmanagedTransaction();

try {
  const user = await User.create({
    username: 'john_doe',
    email: 'john@example.com'
  }, { transaction: t });

  const profile = await Profile.create({
    userId: user.id,
    bio: 'User bio'
  }, { transaction: t });

  // Manually commit
  await t.commit();
  console.log('Transaction committed');
} catch (error) {
  // Manually rollback
  await t.rollback();
  console.error('Transaction rolled back:', error);
  throw error;
}

// With isolation level
const t = await sequelize.startUnmanagedTransaction({
  isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
});

// With locking
const t = await sequelize.startUnmanagedTransaction();
try {
  const user = await User.findOne({
    where: { id: 1 },
    lock: Transaction.LOCK.UPDATE,  // FOR UPDATE
    transaction: t
  });

  user.credits -= 100;
  await user.save({ transaction: t });

  await t.commit();
} catch (error) {
  await t.rollback();
  throw error;
}

// Transaction hooks
const t = await sequelize.startUnmanagedTransaction();

t.afterCommit(() => {
  console.log('Transaction committed');
  // Send notification, clear cache, etc.
});

try {
  // operations
  await t.commit();
} catch (error) {
  await t.rollback();
}
```

## Raw Queries

Execute raw SQL directly

```javascript
// Basic raw query
const [results, metadata] = await sequelize.query(
  'SELECT * FROM users WHERE age >= ?',
  {
    replacements: [18],
    type: QueryTypes.SELECT
  }
);

// Named replacements
const users = await sequelize.query(
  'SELECT * FROM users WHERE age >= :minAge AND status = :status',
  {
    replacements: { minAge: 18, status: 'active' },
    type: QueryTypes.SELECT
  }
);

// Bind parameters (safer than replacements)
const users = await sequelize.query(
  'SELECT * FROM users WHERE age >= $1 AND status = $2',
  {
    bind: [18, 'active'],
    type: QueryTypes.SELECT
  }
);

// Return model instances
const users = await sequelize.query(
  'SELECT * FROM users WHERE age >= :age',
  {
    replacements: { age: 18 },
    model: User,
    mapToModel: true
  }
);
console.log(users[0] instanceof User); // true

// INSERT query
const [results, metadata] = await sequelize.query(
  'INSERT INTO users (username, email) VALUES (?, ?)',
  {
    replacements: ['john_doe', 'john@example.com'],
    type: QueryTypes.INSERT
  }
);

// UPDATE query
const [results, metadata] = await sequelize.query(
  'UPDATE users SET status = ? WHERE age < ?',
  {
    replacements: ['inactive', 18],
    type: QueryTypes.UPDATE
  }
);
console.log(`Updated ${metadata.affectedRows} rows`);

// With transaction
const t = await sequelize.startUnmanagedTransaction();
try {
  await sequelize.query(
    'UPDATE accounts SET balance = balance - ? WHERE id = ?',
    {
      replacements: [100, 1],
      type: QueryTypes.UPDATE,
      transaction: t
    }
  );

  await sequelize.query(
    'UPDATE accounts SET balance = balance + ? WHERE id = ?',
    {
      replacements: [100, 2],
      type: QueryTypes.UPDATE,
      transaction: t
    }
  );

  await t.commit();
} catch (error) {
  await t.rollback();
  throw error;
}

// Disable logging for specific query
await sequelize.query('SELECT * FROM users', {
  type: QueryTypes.SELECT,
  logging: false
});
```

## Query Interface - Schema Management

Low-level database schema operations for migrations

```javascript
const queryInterface = sequelize.getQueryInterface();

// Create table
await queryInterface.createTable('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

// Drop table
await queryInterface.dropTable('users');

// Add column
await queryInterface.addColumn('users', 'age', {
  type: DataTypes.INTEGER,
  allowNull: true
});

// Remove column
await queryInterface.removeColumn('users', 'age');

// Change column
await queryInterface.changeColumn('users', 'username', {
  type: DataTypes.STRING(100),
  allowNull: false
});

// Rename column
await queryInterface.renameColumn('users', 'username', 'user_name');

// Rename table
await queryInterface.renameTable('users', 'app_users');

// Add index
await queryInterface.addIndex('users', ['email'], {
  unique: true,
  name: 'users_email_unique'
});

await queryInterface.addIndex('users', ['username', 'status'], {
  name: 'users_username_status_idx'
});

// Remove index
await queryInterface.removeIndex('users', 'users_email_unique');

// Add constraint
await queryInterface.addConstraint('posts', {
  fields: ['userId'],
  type: 'foreign key',
  name: 'posts_user_fk',
  references: {
    table: 'users',
    field: 'id'
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// Remove constraint
await queryInterface.removeConstraint('posts', 'posts_user_fk');

// Describe table
const tableDescription = await queryInterface.describeTable('users');
console.log(tableDescription);
/*
{
  id: { type: 'INTEGER', allowNull: false, primaryKey: true },
  username: { type: 'VARCHAR(50)', allowNull: false },
  email: { type: 'VARCHAR(255)', allowNull: false }
}
*/

// Show all tables
const tables = await queryInterface.showAllTables();
console.log(tables); // ['users', 'posts', 'profiles']
```

## Data Types

Available column types across dialects

```javascript
const { DataTypes } = require('@sequelize/core');

const User = sequelize.define('User', {
  // Strings
  username: DataTypes.STRING,              // VARCHAR(255)
  shortCode: DataTypes.STRING(10),         // VARCHAR(10)
  fixedCode: DataTypes.CHAR(5),            // CHAR(5)
  bio: DataTypes.TEXT,                     // TEXT
  description: DataTypes.TEXT('medium'),   // MEDIUMTEXT (MySQL)

  // Numbers
  age: DataTypes.INTEGER,                  // INTEGER
  bigNumber: DataTypes.BIGINT,             // BIGINT
  tinyNumber: DataTypes.TINYINT,           // TINYINT
  price: DataTypes.DECIMAL(10, 2),         // DECIMAL(10,2)
  rating: DataTypes.FLOAT,                 // FLOAT
  score: DataTypes.DOUBLE,                 // DOUBLE

  // Boolean
  isActive: DataTypes.BOOLEAN,             // BOOLEAN (TINYINT(1) in MySQL)

  // Dates
  birthDate: DataTypes.DATEONLY,           // DATE (no time)
  lastLogin: DataTypes.DATE,               // DATETIME/TIMESTAMP
  preciseTime: DataTypes.DATE(6),          // DATETIME(6) with microseconds

  // UUID
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  // JSON
  metadata: DataTypes.JSON,                // JSON
  settings: DataTypes.JSONB,               // JSONB (PostgreSQL)

  // Binary
  avatar: DataTypes.BLOB,                  // BLOB
  largeFile: DataTypes.BLOB('long'),       // LONGBLOB (MySQL)

  // Enum
  role: DataTypes.ENUM('user', 'admin', 'moderator'),
  status: DataTypes.ENUM({
    values: ['active', 'inactive', 'pending']
  }),

  // PostgreSQL specific
  tags: DataTypes.ARRAY(DataTypes.STRING), // TEXT[]
  numbers: DataTypes.ARRAY(DataTypes.INTEGER), // INTEGER[]
  dateRange: DataTypes.RANGE(DataTypes.DATE), // DATERANGE
  location: DataTypes.GEOMETRY,            // GEOMETRY
  coords: DataTypes.GEOMETRY('POINT'),     // POINT
  area: DataTypes.GEOGRAPHY,               // GEOGRAPHY
  ipAddress: DataTypes.INET,               // INET
  cidr: DataTypes.CIDR,                    // CIDR
  macAddress: DataTypes.MACADDR,           // MACADDR

  // Virtual (not stored in DB)
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      throw new Error('Do not try to set the `fullName` value!');
    }
  }
});
```

## Validation

Built-in and custom validations

```javascript
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,              // Must be valid email
      notEmpty: true              // Cannot be empty string
    }
  },

  username: {
    type: DataTypes.STRING,
    validate: {
      is: /^[a-z0-9_]+$/i,        // Regex match
      len: [3, 20],               // Length between 3-20
      notIn: [['admin', 'root']]  // Not in list
    }
  },

  age: {
    type: DataTypes.INTEGER,
    validate: {
      min: 0,                     // >= 0
      max: 150,                   // <= 150
      isInt: true                 // Must be integer
    }
  },

  website: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true                 // Must be valid URL
    }
  },

  ipAddress: {
    type: DataTypes.STRING,
    validate: {
      isIP: true,                 // IPv4 or IPv6
      isIPv4: true                // IPv4 only
    }
  },

  creditCard: {
    type: DataTypes.STRING,
    validate: {
      isCreditCard: true          // Valid credit card
    }
  },

  // Custom validator
  password: {
    type: DataTypes.STRING,
    validate: {
      isStrongPassword(value) {
        if (value.length < 8) {
          throw new Error('Password must be at least 8 characters');
        }
        if (!/[A-Z]/.test(value)) {
          throw new Error('Password must contain uppercase letter');
        }
        if (!/[0-9]/.test(value)) {
          throw new Error('Password must contain number');
        }
      }
    }
  },

  // Conditional validation
  state: {
    type: DataTypes.STRING,
    validate: {
      isRequiredIfUSA(value) {
        if (this.country === 'USA' && !value) {
          throw new Error('State is required for USA');
        }
      }
    }
  }
}, {
  // Model-level validations
  validate: {
    // Check multiple fields together
    bothStartAndEndDates() {
      if ((this.startDate === null) !== (this.endDate === null)) {
        throw new Error('Either both dates or neither must be set');
      }
    },

    endDateAfterStartDate() {
      if (this.startDate && this.endDate && this.endDate < this.startDate) {
        throw new Error('End date must be after start date');
      }
    }
  }
});

// Validate instance
try {
  const user = User.build({
    email: 'invalid-email',
    age: 200
  });
  await user.validate();
} catch (error) {
  console.error(error); // ValidationError with all errors
  error.errors.forEach(err => {
    console.log(`${err.path}: ${err.message}`);
  });
}
```

## Hooks (Lifecycle Events)

Execute code at specific points in model lifecycle

```javascript
const User = sequelize.define('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING
}, {
  hooks: {
    // Before validation
    beforeValidate: (user, options) => {
      user.username = user.username.toLowerCase();
    },

    // After validation
    afterValidate: (user, options) => {
      console.log('Validation passed');
    },

    // Before create
    beforeCreate: async (user, options) => {
      const bcrypt = require('bcrypt');
      user.password = await bcrypt.hash(user.password, 10);
    },

    // After create
    afterCreate: (user, options) => {
      console.log(`User ${user.username} created`);
      // Send welcome email, etc.
    },

    // Before update
    beforeUpdate: (user, options) => {
      if (user.changed('password')) {
        const bcrypt = require('bcrypt');
        user.password = bcrypt.hashSync(user.password, 10);
      }
    },

    // After update
    afterUpdate: (user, options) => {
      console.log(`User ${user.username} updated`);
    },

    // Before destroy
    beforeDestroy: (user, options) => {
      console.log(`Deleting user ${user.username}`);
    },

    // After destroy
    afterDestroy: (user, options) => {
      console.log('User deleted');
      // Clean up related data, files, etc.
    },

    // Before bulk operations
    beforeBulkCreate: (instances, options) => {
      console.log(`Creating ${instances.length} users`);
    },

    beforeBulkUpdate: (options) => {
      console.log('Bulk update starting');
    },

    beforeBulkDestroy: (options) => {
      console.log('Bulk destroy starting');
    }
  }
});

// Add hooks after definition
User.addHook('beforeSave', (user, options) => {
  // beforeSave runs before create or update
  user.updatedAt = new Date();
});

// Add hook with name for removal
User.addHook('afterCreate', 'sendEmail', async (user, options) => {
  await sendWelcomeEmail(user.email);
});

// Remove hook
User.removeHook('afterCreate', 'sendEmail');

// One-time hook for specific operation
await User.create({
  username: 'john_doe',
  password: 'password123'
}, {
  hooks: {
    beforeCreate: (user, options) => {
      console.log('This hook only runs for this create');
    }
  }
});

// Global hooks (all models)
sequelize.addHook('beforeCreate', (instance, options) => {
  console.log(`Creating ${instance.constructor.name}`);
});
```

## Scopes

Define reusable query configurations

```javascript
const User = sequelize.define('User', {
  username: DataTypes.STRING,
  isActive: DataTypes.BOOLEAN,
  role: DataTypes.ENUM('user', 'admin', 'moderator'),
  deletedAt: DataTypes.DATE
}, {
  // Default scope (applied to all queries)
  defaultScope: {
    where: {
      isActive: true
    },
    attributes: {
      exclude: ['password', 'deletedAt']
    }
  },

  // Named scopes
  scopes: {
    // Simple scope
    active: {
      where: { isActive: true }
    },

    // Scope with parameters
    role(roleName) {
      return {
        where: { role: roleName }
      };
    },

    // Complex scope
    admins: {
      where: {
        role: 'admin',
        isActive: true
      },
      include: [
        {
          model: Profile,
          required: true
        }
      ]
    },

    // Scope with function
    recentlyActive: {
      where: {
        lastLogin: {
          [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      },
      order: [['lastLogin', 'DESC']]
    },

    // Include deleted (override paranoid)
    includeDeleted: {
      paranoid: false
    }
  },

  paranoid: true
});

// Use scope
const activeUsers = await User.scope('active').findAll();

// Use multiple scopes
const activeAdmins = await User.scope('active', 'admins').findAll();

// Use scope with parameters
const adminUsers = await User.scope({ method: ['role', 'admin'] }).findAll();

// Chain scopes
const users = await User
  .scope('active')
  .scope({ method: ['role', 'moderator'] })
  .findAll();

// Remove default scope
const allUsers = await User.unscoped().findAll();

// Remove default scope but apply named scope
const inactiveUsers = await User
  .unscoped()
  .scope('includeDeleted')
  .findAll({
    where: { isActive: false }
  });

// Add scope dynamically
User.addScope('vip', {
  where: { vipLevel: { [Op.gte]: 5 } }
});

// Use in associations
User.hasMany(Post, {
  as: 'publishedPosts',
  scope: {
    published: true
  }
});

const user = await User.findOne({
  include: ['publishedPosts']
});
```

## Advanced Query Options

Complex querying capabilities

```javascript
// Subqueries
const users = await User.findAll({
  where: {
    id: {
      [Op.in]: sequelize.literal(
        '(SELECT userId FROM posts WHERE published = true)'
      )
    }
  }
});

// Calculated attributes
const users = await User.findAll({
  attributes: [
    'id',
    'username',
    [sequelize.fn('COUNT', sequelize.col('posts.id')), 'postCount']
  ],
  include: [
    {
      model: Post,
      as: 'posts',
      attributes: []
    }
  ],
  group: ['User.id']
});

// HAVING clause
const users = await User.findAll({
  attributes: [
    'role',
    [sequelize.fn('COUNT', sequelize.col('id')), 'count']
  ],
  group: ['role'],
  having: sequelize.where(
    sequelize.fn('COUNT', sequelize.col('id')),
    {
      [Op.gt]: 10
    }
  )
});

// Table hints (MSSQL)
const users = await User.findAll({
  tableHint: TableHints.NOLOCK
});

// Index hints (MySQL)
const users = await User.findAll({
  indexHints: [
    { type: IndexHints.USE, values: ['username_idx'] }
  ]
});

// Lock modes
const user = await User.findOne({
  where: { id: 1 },
  lock: Transaction.LOCK.UPDATE,  // FOR UPDATE
  skipLocked: true,                // SKIP LOCKED
  transaction: t
});

// Paranoid queries
const users = await User.findAll({
  paranoid: false  // Include soft-deleted records
});

const deletedUsers = await User.findAll({
  where: {
    deletedAt: {
      [Op.ne]: null
    }
  },
  paranoid: false
});

// Search path (PostgreSQL schemas)
const users = await User.findAll({
  searchPath: 'public,tenant1'
});

// Logging for specific query
const users = await User.findAll({
  logging: (sql, timing) => {
    console.log(`Query took ${timing}ms: ${sql}`);
  }
});

// Benchmarking
const users = await User.findAll({
  benchmark: true,
  logging: console.log
}); // Logs execution time

// Raw query results
const results = await User.findAll({
  raw: true  // Returns plain objects instead of instances
});

// Nested results
const users = await User.findAll({
  include: [Post],
  nest: true,  // Nests associated data
  raw: true
});
```

## Summary

Sequelize provides a comprehensive ORM solution for Node.js applications requiring database abstraction across multiple SQL dialects. The primary use cases include CRUD operations through intuitive Model APIs, complex relationship management via four association types (hasOne, hasMany, belongsTo, belongsToMany), transaction handling with both managed and unmanaged modes, and schema migrations through QueryInterface. The library excels in scenarios requiring database portability, type-safe queries, eager/lazy loading of relationships, and sophisticated query building with operators.

Integration patterns typically involve defining models that mirror database tables, establishing associations between models to reflect foreign key relationships, using transactions for data consistency in multi-step operations, and leveraging hooks for cross-cutting concerns like validation and audit logging. Sequelize seamlessly integrates with Express.js applications through middleware patterns, supports connection pooling for performance optimization, and provides migration tools for version-controlled schema management. The ORM's flexibility allows developers to drop down to raw SQL when needed while maintaining the benefits of type safety and connection management, making it suitable for both simple applications and complex enterprise systems with intricate data models and business logic.
