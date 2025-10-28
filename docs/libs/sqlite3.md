### Instalar nw-gyp para builds de módulos Node-webkit

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Este comando instala globalmente o `nw-gyp`, uma ferramenta necessária para compilar módulos Node.js, incluindo `sqlite3`, especificamente para uso com node-webkit. É pré-requisito para build do `sqlite3` para node-webkit.

```Shell
npm install nw-gyp -g
```

--------------------------------

### Instalar o pacote sqlite3 via npm ou Yarn

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Comandos recomendados para instalar o pacote `sqlite3` usando npm ou Yarn. Esses comandos obtêm a versão publicada mais recente, incluindo binários pré-compilados quando disponíveis para a sua plataforma.

```Shell
npm install sqlite3
# ou
yarn add sqlite3
```

--------------------------------

### Instalar sqlite3 a partir da branch master do GitHub

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Comando para instalar o pacote `sqlite3` diretamente da branch `master` do repositório no GitHub. Útil para obter mudanças mais recentes ainda não publicadas ou para desenvolvimento.

```Shell
npm install https://github.com/tryghost/node-sqlite3/tarball/master
```

--------------------------------

### Build do sqlite3 para Electron no macOS com Homebrew

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Comando completo para instalar via npm compilando o `sqlite3` a partir do código-fonte especificamente para Electron no macOS. Ele integra o prefixo do Homebrew para localizar a instalação do SQLite e inclui flags necessárias para o Electron.

```bash
npm install sqlite3 --build-from-source --sqlite_libname=sqlcipher --sqlite=`brew --prefix` --runtime=electron --target=18.2.1 --dist-url=https://electronjs.org/headers
```

--------------------------------

### Instalar pacote sqlite3 via npm

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Comando padrão para instalar o pacote sqlite3 do registro npm — a forma mais comum de adicioná-lo a um projeto Node.js.

```bash
npm i sqlite3
```

--------------------------------

### Binaries pré-compilados do node-sqlite3 e suporte a plataformas

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Detalha a disponibilidade e suporte para binários pré-compilados no `sqlite3` v5+, que usam Node-API para maior compatibilidade. Lista as plataformas/arquiteturas suportadas, o que simplifica a instalação evitando a necessidade de um compilador C++ local.

```APIDOC
Binaries pré-compilados:
- Usa Node-API (v3 e v6) para binários pré-compilados, suportado em Node v10+
- Downloads via prebuild-install dos Releases no GitHub (v5.0.2+) ou S3
- Targets suportados:
    - darwin-arm64
    - darwin-x64
    - linux-arm64
    - linux-x64
    - linuxmusl-arm64
    - linuxmusl-x64
    - win32-ia32
    - win32-x64
- Observação: diferenciação armv6/armv7 não suportada por prebuild; requer build a partir do source.
- Fallback para build com node-gyp se o ambiente não for suportado (requer compilador/linker C++).
```

--------------------------------

### Compilar sqlite3 com SQLCipher no Linux

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Instruções para compilar o pacote `sqlite3` a partir do código-fonte em sistemas Linux (incluindo Raspberry Pi) com suporte a SQLCipher. Envolve definir variáveis de ambiente para flags do linker/compilador e executar `npm install` com opções específicas. Um comando Node é fornecido para verificar a instalação.

```bash
export LDFLAGS="-L/usr/local/lib"
export CPPFLAGS="-I/usr/local/include -I/usr/local/include/sqlcipher"
export CXXFLAGS="$CPPFLAGS"
npm install sqlite3 --build-from-source --sqlite_libname=sqlcipher --sqlite=/usr/local --verbose
```

```javascript
node -e 'require("sqlite3")'
```

--------------------------------

### Compilar sqlite3 para Node-webkit (a partir do checkout local)

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Comando usado ao compilar `sqlite3` para node-webkit a partir de um checkout local do repositório. Usa as mesmas flags de runtime, arquitetura e target que o método `npm install`.

```Shell
npm install --build-from-source --runtime=node-webkit --target_arch=ia32 --target=$(NODE_WEBKIT_VERSION)
```

--------------------------------

### Compilar sqlite3 usando SQLite do Homebrew no macOS

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Comando para compilar o módulo `sqlite3` contra uma biblioteca SQLite instalada via Homebrew no macOS. Aponta o processo de build para o caminho do Homebrew onde o SQLite está instalado.

```Shell
npm install --build-from-source --sqlite=/usr/local/opt/sqlite/
```

--------------------------------

### Compilar sqlite3 contra uma biblioteca SQLite externa

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Use este comando para compilar o módulo `sqlite3` contra uma instalação externa do SQLite. O argumento `--sqlite` especifica o caminho de instalação da biblioteca externa, exigindo que os headers de desenvolvimento estejam disponíveis.

```Shell
npm install --build-from-source --sqlite=/usr/local
```

--------------------------------

### Compilar sqlite3 com SQLCipher no macOS (Homebrew)

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Esses comandos configuram variáveis de ambiente e compilam o `sqlite3` contra uma instalação do SQLCipher gerenciada pelo Homebrew no macOS, garantindo que o processo de build localize corretamente as bibliotecas e headers do SQLCipher.

```Shell
export LDFLAGS="-L`brew --prefix`/opt/sqlcipher/lib"
export CPPFLAGS="-I`brew --prefix`/opt/sqlcipher/include/sqlcipher"
npm install sqlite3 --build-from-source --sqlite_libname=sqlcipher --sqlite=`brew --prefix`

node -e 'require("sqlite3")'
```

--------------------------------

### Compilar sqlite3 com suporte a encriptação SQLCipher

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Comando para compilar o módulo `sqlite3` integrando a extensão de encriptação SQLCipher. Requer que o SQLCipher esteja instalado no sistema e vincula o módulo `sqlite3` contra a biblioteca `sqlcipher`.

```Shell
npm install sqlite3 --build-from-source --sqlite_libname=sqlcipher --sqlite=/usr/

node -e 'require("sqlite3")'
```

--------------------------------

### Compilar sqlite3 para Node-webkit (npm install)

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Comando para compilar o módulo `sqlite3` para um runtime específico do node-webkit, arquitetura target e versão. Garante compatibilidade com o ambiente node-webkit.

```Shell
NODE_WEBKIT_VERSION="0.8.6" # veja a versão mais recente em https://github.com/rogerwang/node-webkit#downloads
npm install sqlite3 --build-from-source --runtime=node-webkit --target_arch=ia32 --target=$(NODE_WEBKIT_VERSION)
```

--------------------------------

### Configurar sqlite3 para builds customizados do Electron

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Detalha flags adicionais necessárias para `npm install sqlite3 --build-from-source` para garantir compatibilidade com o Electron. Essas flags são importantes para preservar a extensão SQLCipher ao usar `electron-rebuild` e especificam o runtime do Electron, a versão target e a URL de distribuição.

```bash
--runtime=electron --target=18.2.1 --dist-url=https://electronjs.org/headers
```

--------------------------------

### Executar os testes do pacote sqlite3

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Comando simples para executar a suíte de testes automatizados do pacote sqlite3, garantindo sua funcionalidade e integridade.

```bash
npm test
```

--------------------------------

### Operações básicas com banco usando node sqlite3

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Demonstra o uso fundamental do módulo `sqlite3` no Node.js. Mostra como abrir um banco em memória, criar uma tabela, inserir múltiplas linhas usando um prepared statement, iterar pelos resultados e fechar a conexão.

```JavaScript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE lorem (info TEXT)");

    const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
        console.log(row.id + ": " + row.info);
    });
});

db.close();
```

--------------------------------

### Visão geral das principais funcionalidades do node-sqlite3

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Esta seção descreve as funcionalidades principais oferecidas pela biblioteca `node-sqlite3`, incluindo sua interface para queries, suporte a tipos de dados, depuração e capacidades de extensão. Destaca o design robusto da biblioteca e a versão do SQLite empacotada.

```APIDOC
Funcionalidades:
- Interface simples para queries e binding de parâmetros
- Suporte completo a Buffer/Blob
- Amplo suporte a depuração (https://github.com/tryghost/node-sqlite3/wiki/Debugging)
- API de serialização de queries (https://github.com/tryghost/node-sqlite3/wiki/Control-Flow)
- Suporte a extensões (https://github.com/TryGhost/node-sqlite3/wiki/API#databaseloadextensionpath-callback), incluindo suporte embutido para a extensão json1 (https://www.sqlite.org/json1.html)
- Suite de testes extensa
- Escrita em C++ moderno e testada quanto a vazamentos de memória
- Embala SQLite v3.44.2, ou você pode compilar usando um SQLite local
```

--------------------------------

### Forçar build do módulo sqlite3 a partir do source

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Este comando instrui o npm a compilar o módulo `sqlite3` a partir do código-fonte, evitando a busca por binários pré-compilados e garantindo um build local.

```Shell
npm install --build-from-source
```

--------------------------------

### Compilar sqlite3 com cabeçalho de arquivo de banco customizado

Fonte: https://www.npmjs.com/package/sqlite3/package/sqlite3

Comando que permite especificar uma string 'magic' customizada de 15 caracteres para o cabeçalho do arquivo de banco SQLite durante a compilação. Note que usar um magic customizado impedirá que ferramentas SQLite padrão reconheçam os arquivos de banco.

```Shell
npm install --build-from-source --sqlite_magic="MyCustomMagic15"
```