## Express.js

Express é um framework minimalista e flexível para aplicações web em Node.js. Ele fornece um conjunto robusto de recursos para criar APIs e aplicações web, mantendo uma camada fina sobre as funcionalidades nativas do Node.js. O design do Express é centrado em middlewares — funções que têm acesso ao request, response e ao próximo middleware na cadeia — o que permite compor comportamento de forma modular.

## Inicializando a aplicação

Criação e configuração de uma instância Express:

```javascript
const express = require('express');
const app = express();

// Configurações
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('json spaces', 2);

// Habilitar/desabilitar features
app.enable('trust proxy');
app.disable('x-powered-by');

// Iniciar servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor rodando na porta ${app.get('port')}`);
});
```

## Rotas básicas

Definindo rotas para diferentes métodos HTTP e padrões de URL:

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World'));

app.post('/submit', (req, res) => {
  res.send('Dados recebidos');
});
```

## Tratamento de erros

Estratégias para capturar e responder erros de forma consistente:

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Helper para handlers assíncronos
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Erro síncrono
app.get('/sync-error', (req, res) => {
  throw new Error('Erro síncrono ocorreu');
});

// Erro assíncrono
app.get('/async-error', asyncHandler(async (req, res) => {
  await Promise.reject(new Error('Erro assíncrono'));
}));

// Erro customizado
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

app.get('/not-found', (req, res, next) => {
  next(new AppError('Recurso não encontrado', 404));
});

// Handler 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`
  });
});

// Handler global de erros (último middleware)
app.use((err, req, res, next) => {
  console.error('Erro:', err.message);
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal Server Error';

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(3000);
```

## Negociação de conteúdo (content negotiation)

Responder com diferentes formatos conforme o header `Accept` do cliente:

```javascript
const express = require('express');
const app = express();

app.get('/data', (req, res) => {
  const data = { id: 1, name: 'Product', price: 99.99 };

  res.format({
    'text/plain': () => res.send(`Product: ${data.name}, Price: $${data.price}`),
    'text/html':  () => res.send(`<h1>${data.name}</h1><p>Price: $${data.price}</p>`),
    'application/json': () => res.json(data),
    'application/xml': () => {
      res.type('application/xml');
      res.send(`<product><name>${data.name}</name><price>${data.price}</price></product>`);
    },
    'default': () => res.status(406).send('Not Acceptable')
  });
});

// Exemplo de verificação de tipos aceitos
app.get('/check', (req, res) => {
  if (req.accepts('json')) return res.json({ format: 'json' });
  if (req.accepts('html')) return res.send('<p>Formato HTML</p>');
  res.status(406).send('Not Acceptable');
});

app.listen(3000);
```

## Parsing do corpo da requisição

Suporte a vários parsers integrados:

```javascript
const express = require('express');
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/webhook', express.raw({ type: 'application/json' }));
app.use('/logs', express.text({ type: 'text/plain' }));

app.post('/api/users', (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Missing required fields' });
  res.status(201).json({ id: Date.now(), name, email, age: age || null });
});

app.post('/submit', (req, res) => res.json({ message: 'Form received', data: req.body }));

app.post('/webhook', (req, res) => {
  const signature = req.get('X-Signature');
  const payload = req.body;
  res.json({ received: true, bytes: payload.length });
});

app.listen(3000);
```

## Encadeamento de rotas e middlewares

Handlers encadeáveis e composição:

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.route('/users/:id')
  .get((req, res) => res.json({ id: req.params.id, name: 'User' }))
  .put((req, res) => res.json({ id: req.params.id, ...req.body, updated: true }))
  .delete((req, res) => res.status(204).send());

app.route('/posts/:id')
  .all((req, res, next) => { console.log(`Acessando post ${req.params.id}`); next(); })
  .get((req, res) => res.json({ id: req.params.id, title: 'Post Title' }))
  .patch((req, res) => res.json({ id: req.params.id, ...req.body }));

const validate = (req, res, next) => { if (!req.body.title) return res.status(400).json({ error: 'Title required' }); next(); };
const sanitize = (req, res, next) => { req.body.title = req.body.title.trim(); next(); };

app.post('/articles', validate, sanitize, (req, res) => res.status(201).json({ id: Date.now(), title: req.body.title }));

app.listen(3000);
```

## Montagem de sub-aplicações (mounting)

Organize parte da aplicação em sub-apps para modularidade:

```javascript
const express = require('express');
const app = express();

const admin = express();
admin.get('/', (req, res) => res.json({ section: 'admin dashboard' }));
admin.get('/users', (req, res) => res.json({ users: ['admin1', 'admin2'] }));
admin.on('mount', (parent) => console.log('Admin montado em', admin.mountpath));
app.use('/admin', admin);

const apiV1 = express();
apiV1.get('/users', (req, res) => res.json({ version: 1, users: [] }));
app.use('/api/v1', apiV1);

const apiV2 = express();
apiV2.get('/users', (req, res) => res.json({ version: 2, users: [], pagination: {} }));
app.use('/api/v2', apiV2);

app.get('/', (req, res) => res.json({ endpoints: ['/admin', '/api/v1/users', '/api/v2/users'] }));

app.listen(3000);
```

## Arquivos estáticos e downloads

Servir arquivos estáticos ou permitir downloads:

```javascript
app.use(express.static('public'));
app.use(express.static('uploads'));

app.get('/report.pdf', (req, res) => {
  const filePath = path.join(__dirname, 'reports', 'report.pdf');
  res.sendFile(filePath);
});

app.get('/download', (req, res) => {
  const file = path.join(__dirname, 'files', 'document.pdf');
  res.download(file, 'custom-name.pdf', (err) => { if (err) console.error('Erro no download:', err); });
});

app.listen(3000);
```

## Cookies

Leitura e escrita de cookies usando `cookie-parser`:

```javascript
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser('secret-key'));

app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'john_doe');
  res.cookie('session', 'abc123', { maxAge: 900000, httpOnly: true, secure: false, signed: true });
  res.send('Cookies set');
});
```

## Resumo

Express é uma escolha consolidada para construir APIs RESTful e aplicações web em Node.js—leve, extensível e com grande ecossistema. Ele funciona bem com ORMs, bancos NoSQL e tradicionais, e é frequentemente implantado em contêineres ou por trás de proxies reversos em produção.

Fonte: https://expressjs.com/
  res.cookie('theme', 'dark')
     .cookie('language', 'en')
     .json({ message: 'Cookies set' });
});

// Ler cookies
app.get('/get-cookies', (req, res) => {
  res.json({
    cookies: req.cookies,
    signedCookies: req.signedCookies
  });
});

// Limpar cookies
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('username');
  res.json({ message: 'Cookie cleared' });
});

app.listen(3000);
// GET /set-cookie → define cookies com várias opções
// GET /get-cookies → retorna todos os cookies
// GET /clear-cookie → remove um cookie específico
```

## Renderização de templates

Renderizando views dinâmicas com engines de templates

```javascript
const express = require('express');
const app = express();

// Configurar engine de templates
app.set('view engine', 'ejs');
app.set('views', './views');

// Habilitar cache de views em produção
if (app.get('env') === 'production') {
  app.enable('view cache');
}

// Renderizar template com dados
app.get('/user/:id', (req, res) => {
  const user = {
    id: req.params.id,
    name: 'John Doe',
    email: 'john@example.com',
    posts: [
      { title: 'First Post', date: '2024-01-01' },
      { title: 'Second Post', date: '2024-01-15' }
    ]
  };

  res.render('user', { user, title: 'User Profile' });
});

// Locais globais da aplicação
app.locals.siteName = 'My Website';
app.locals.currentYear = new Date().getFullYear();

// Locais específicos por resposta
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  next();
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    data: { stats: { users: 100, posts: 500 } }
  });
});

app.get('/email-preview', (req, res) => {
  app.render('email', { name: 'John' }, (err, html) => {
    if (err) {
      res.status(500).send('Erro ao renderizar');
    } else {
      res.send(html);
    }
  });
});

app.listen(3000);
```

## Error Handling

Comprehensive error handling strategies

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Async error handling wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes with potential errors
app.get('/sync-error', (req, res, next) => {
  throw new Error('Synchronous error occurred');
});

app.get('/async-error', asyncHandler(async (req, res) => {
  const data = await Promise.reject(new Error('Async error'));
  res.json(data);
}));

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

app.get('/not-found', (req, res, next) => {
  next(new AppError('Resource not found', 404));
});

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`
  });
});

// Global error handler (must be last)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal Server Error';

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(3000);
```

## Content Negotiation

Responding with different content types based on client preferences

```javascript
const express = require('express');
const app = express();

app.get('/data', (req, res) => {
  const data = {
    id: 1,
    name: 'Product',
    price: 99.99
  };

  // Respond based on Accept header
  res.format({
    'text/plain': () => {
      res.send(`Product: ${data.name}, Price: $${data.price}`);
    },

    'text/html': () => {
      res.send(`<h1>${data.name}</h1><p>Price: $${data.price}</p>`);
    },

    'application/json': () => {
      res.json(data);
    },

    'application/xml': () => {
      res.type('application/xml');
      res.send(`<product><name>${data.name}</name><price>${data.price}</price></product>`);
    },

    'default': () => {
      res.status(406).send('Not Acceptable');
    }
  });
});

// Check accepted types
app.get('/check', (req, res) => {
  if (req.accepts('json')) {
    res.json({ format: 'json' });
  } else if (req.accepts('html')) {
    res.send('<p>HTML format</p>');
  } else {
    res.status(406).send('Not Acceptable');
  }
});

app.listen(3000);
// curl -H "Accept: application/json" http://localhost:3000/data → JSON response
// curl -H "Accept: text/html" http://localhost:3000/data → HTML response
```

## Request Body Parsing

Parsing different request body formats

```javascript
const express = require('express');
const app = express();

// JSON body parser
app.use(express.json({ limit: '10mb' }));

// URL-encoded body parser
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Raw body parser
app.use('/webhook', express.raw({ type: 'application/json' }));

// Text body parser
app.use('/logs', express.text({ type: 'text/plain' }));

// Handle JSON POST
app.post('/api/users', (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: 'Missing required fields'
    });
  }

  res.status(201).json({
    id: Date.now(),
    name,
    email,
    age: age || null
  });
});

// Handle form submission
app.post('/submit', (req, res) => {
  const formData = req.body;
  res.json({
    message: 'Form received',
    data: formData
  });
});

// Handle raw webhook
app.post('/webhook', (req, res) => {
  const signature = req.get('X-Signature');
  const payload = req.body;
  res.json({ received: true, bytes: payload.length });
});

app.listen(3000);
// POST /api/users with {"name":"John","email":"john@example.com"}
// → {"id":1234567890,"name":"John","email":"john@example.com","age":null}
```

## Route Chaining

Creating chainable route handlers for cleaner code

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Chain multiple methods on same route
app.route('/users/:id')
  .get((req, res) => {
    res.json({ id: req.params.id, name: 'User' });
  })
  .put((req, res) => {
    res.json({ id: req.params.id, ...req.body, updated: true });
  })
  .delete((req, res) => {
    res.status(204).send();
  });

// Chain middleware and handlers
app.route('/posts/:id')
  .all((req, res, next) => {
    console.log(`Accessing post ${req.params.id}`);
    next();
  })
  .get((req, res) => {
    res.json({ id: req.params.id, title: 'Post Title' });
  })
  .patch((req, res) => {
    res.json({ id: req.params.id, ...req.body });
  });

// Multiple handlers on single route
const validate = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({ error: 'Title required' });
  }
  next();
};

const sanitize = (req, res, next) => {
  req.body.title = req.body.title.trim();
  next();
};

app.post('/articles',
  validate,
  sanitize,
  (req, res) => {
    res.status(201).json({
      id: Date.now(),
      title: req.body.title
    });
  }
);

app.listen(3000);
```

## Application Mounting

Mounting sub-applications for modular architecture

```javascript
const express = require('express');
const app = express();

// Create sub-application for admin
const admin = express();

admin.get('/', (req, res) => {
  res.json({ section: 'admin dashboard' });
});

admin.get('/users', (req, res) => {
  res.json({ users: ['admin1', 'admin2'] });
});

admin.on('mount', (parent) => {
  console.log('Admin mounted');
  console.log('Mounted at:', admin.mountpath);
});

// Mount admin app
app.use('/admin', admin);

// Create API v1 sub-application
const apiV1 = express();

apiV1.get('/users', (req, res) => {
  res.json({ version: 1, users: [] });
});

app.use('/api/v1', apiV1);

// Create API v2 sub-application
const apiV2 = express();

apiV2.get('/users', (req, res) => {
  res.json({ version: 2, users: [], pagination: {} });
});

app.use('/api/v2', apiV2);

// Main app routes
app.get('/', (req, res) => {
  res.json({
    endpoints: [
      '/admin',
      '/api/v1/users',
      '/api/v2/users'
    ]
  });
});

app.listen(3000);
// GET /admin → admin dashboard
// GET /api/v1/users → v1 API response
// GET /api/v2/users → v2 API response
```

# Summary

Express.js excels at building RESTful APIs, web applications, and microservices with its minimalist approach and powerful middleware system. Common use cases include single-page application backends, real-time applications with WebSocket integration, API gateways, authentication services, and content management systems. The framework's routing system enables clean URL structures, while its middleware architecture allows for modular request processing including authentication, logging, validation, and error handling. Express integrates seamlessly with template engines for server-side rendering, database libraries for data persistence, and can be extended with thousands of middleware packages from npm.

Integration patterns typically involve organizing applications into routers for different resources, implementing authentication middleware chains, creating custom error handlers for consistent error responses, and using application locals for shared data. Express works well with MongoDB through Mongoose, PostgreSQL through Sequelize or Knex, and Redis for session management. It's commonly deployed with PM2 for process management, behind Nginx as a reverse proxy, or in containerized environments using Docker. The framework's simplicity makes it ideal for microservice architectures where each service handles specific business logic, and its performance characteristics make it suitable for high-traffic production applications when properly configured with clustering and caching strategies.
