### Instalar e usar xml-js globalmente

Fonte: https://github.com/nashwaan/xml-js/blob/master/README.md

Instruções para instalar o pacote `xml-js` globalmente e exemplos de conversão entre JSON e XML pela linha de comando, incluindo como salvar a saída em um arquivo.

```bash
npm install -g xml-js                       # instala a biblioteca globalmente
xml-js test.json --spaces 4                 # imprime o resultado XML no terminal
xml-js test.json --spaces 4 --out test.xml  # salva o resultado XML em test.xml
xml-js test.xml --spaces 4                  # imprime o resultado JSON no terminal
xml-js test.xml --spaces 4 --out test.json  # salva o resultado JSON em test.json
```

--------------------------------

### Instalar a biblioteca xml-js

Fonte: https://github.com/nashwaan/xml-js/blob/master/README.md

Instruções para instalar `xml-js` via npm, seja como dependência local do projeto ou globalmente para uso via CLI.

```bash
npm install --save xml-js
```

```bash
npm install --global xml-js
```

--------------------------------

### Usar xml-js como script npm local

Fonte: https://github.com/nashwaan/xml-js/blob/master/README.md

Exemplo de como instalar `xml-js` localmente e configurar um script no `package.json` para executar comandos de conversão dentro do fluxo do projeto.

```bash
npm install --save xml-js
```


### Instalar xml-js

Fonte: https://github.com/nashwaan/xml-js

Instala `xml-js` via npm. Esse pacote fornece utilitários simples para converter XML em objetos JavaScript e vice-versa.

```bash
npm install xml-js
```

---------------------------------

### Converter XML para objeto JavaScript

Fonte: https://github.com/nashwaan/xml-js

Exemplo que mostra como converter uma string XML em um objeto JavaScript usando `xml2js`. A opção `compact: true` gera uma estrutura mais concisa onde as tags viram propriedades diretas.

```javascript
var convert = require('xml-js');

var xml = '<?xml version="1.0" encoding="utf-8"?><note><to>Tove</to></note>';

var result = convert.xml2js(xml, {compact: true});

console.log(result);
```

---------------------------------

### Converter objeto JavaScript para XML

Fonte: https://github.com/nashwaan/xml-js

Demonstra como converter um objeto JavaScript em uma string XML usando `js2xml`. A opção `compact: true` instrui a biblioteca a produzir uma representação compacta.

```javascript
var convert = require('xml-js');

var obj = { note: { to: { _text: 'Tove' } } };

var xml = convert.js2xml(obj, {compact: true, spaces: 4});

console.log(xml);
```

---------------------------------

### Parse de atributos e nós de texto

Fonte: https://github.com/nashwaan/xml-js

Mostra como atributos são representados e analisados. Quando usado `compact: true`, atributos aparecem sob `_attributes` e nós de texto sob `_text`.

```javascript
var xml = '<root attr="val">text</root>';

var result = convert.xml2js(xml, {compact: true});

console.log(JSON.stringify(result, null, 2));
```
XML: <a x="1.234" y="It's"/>
JS/JSON compact: {"a":{"_attributes":{"x":"1.234","y":"It's"}}}
JS/JSON non-compact: {"elements":[{"type":"element","name":"a","attributes":{"x":"1.234","y":"It's"}}]}

XML: <?xml?>
JS/JSON compact: {"_declaration":{}}
JS/JSON non-compact: {"declaration":{}}

XML: <?go there?>
JS/JSON compact: {"_instruction":{"go":"there"}}
JS/JSON non-compact: {"elements":[{"type":"instruction","name":"go","instruction":"there"}]}

XML: <?xml version="1.0" encoding="utf-8"?>
JS/JSON compact: {"_declaration":{"_attributes":{"version":"1.0","encoding":"utf-8"}}}
JS/JSON non-compact: {"declaration":{"attributes":{"version":"1.0","encoding":"utf-8"}}}

XML: <!--Hello, World!-->
JS/JSON compact: {"_comment":"Hello, World!"}
JS/JSON non-compact: {"elements":[{"type":"comment","comment":"Hello, World!"}]}

XML: <![CDATA[<foo></bar>]]>
JS/JSON compact: {"_cdata":"<foo></bar>"}
JS/JSON non-compact: {"elements":[{"type":"cdata","cdata":"<foo></bar>"}]}
```

--------------------------------

### Converter XML para JSON/Objeto JS com xml-js

Fonte: https://github.com/nashwaan/xml-js/blob/master/README.md

Este exemplo em JavaScript demonstra como converter texto XML para um objeto JavaScript ou JSON usando `xml-js` (`xml2js()` ou `xml2json()`). Mostra como ler um arquivo XML, aplicar opções de conversão como `ignoreComment` e `alwaysChildren`, e exibir o objeto/JSON resultante.

```js
var convert = require('xml-js');
var xml = require('fs').readFileSync('test.xml', 'utf8');
var options = {ignoreComment: true, alwaysChildren: true};
var result = convert.xml2js(xml, options); // ou convert.xml2json(xml, options)
console.log(result);
```

--------------------------------

### Converter JSON para XML com processamento de texto customizado em JavaScript

Fonte: https://github.com/nashwaan/xml-js/blob/master/README.md

Mostra como converter uma string JSON para XML usando `xml-js`. O exemplo usa a opção `textFn` para modificar condicionalmente o conteúdo de texto dos elementos durante a conversão (aqui exemplificado para o elemento 'age').

```js
var convert = require('xml-js');
var json = '{"name":{"_text":"Ali"},"age":{"_text":"30"}}';
var options = {compact: true, textFn: function(val, elementName) {return elementName === 'age'? val + '';}};
var result = convert.json2xml(json, options);
console.log(result); // <foo:Name>Ali</foo:Name> <bar:Age>30</bar:Age>
```

--------------------------------

### Testando a biblioteca xml-js

Fonte: https://github.com/nashwaan/xml-js/blob/master/README.md

Instruções para configurar e executar os testes da biblioteca `xml-js` a partir de um clone local do repositório, incluindo opções para testes em modo live.

```bash
cd xml-js
npm install
npm test
```

```bash
npm start
```

--------------------------------

### Argumentos da Interface de Linha de Comando (CLI) do xml-js

Fonte: https://github.com/nashwaan/xml-js/blob/master/README.md

Lista completa de argumentos de linha de comando para a ferramenta `xml-js`, detalhando seu propósito e efeito no processo de conversão entre XML e JSON.

```APIDOC
Usage: xml-js src [options]

Arguments:
  src: string
    Description: Arquivo de entrada que precisa ser convertido. O tipo de conversão xml->json ou json->xml será inferido pela extensão do arquivo.

Options:
  --help, -h: boolean
    Description: Exibe este conteúdo de ajuda.
  --version, -v: boolean
    Description: Exibe a versão deste módulo.
  --out: string
    Description: Arquivo de saída onde o resultado será escrito.
  --spaces: number
    Description: Especifica o número de espaços para identação na saída.
  --full-tag: boolean
    Description: Elementos XML serão sempre na forma <a></a>.
  --no-decl: boolean
    Description: Diretiva de declaração <?xml?> será ignorada.
  --no-inst: boolean
    Description: Instrução de processamento <?...?> será ignorada.
  --no-attr: boolean
    Description: Atributos dos elementos serão ignorados.
  --no-text: boolean
    Description: Textos dos elementos serão ignorados.
  --no-cdata: boolean
    Description: CData dos elementos será ignorado.
  --no-doctype: boolean
    Description: DOCTYPE dos elementos será ignorado.
  --no-comment: boolean
    Description: Comentários nos elementos serão ignorados.
  --trim: boolean
    Description: Quaisquer espaços em branco ao redor de textos serão removidos.
  --compact: boolean
    Description: JSON estará no formato compacto.
  --native-type: boolean
    Description: Números e booleanos serão convertidos (coagidos) para tipos nativos em vez de texto.
  --always-array: boolean
    Description: Cada elemento será sempre um array (aplicável se --compact estiver ativo).
  --always-children: boolean
    Description: Cada elemento sempre conterá sub-elementos (aplicável se --compact não estiver ativo).
  --text-key: string
    Description: Alterar a chave padrão para 'text'.
  --cdata-key: string
    Description: Alterar a chave padrão para 'cdata'.
  --doctype-key: string
    Description: Alterar a chave padrão para 'doctype'.
  --comment-key: string
    Description: Alterar a chave padrão para 'comment'.
  --attributes-key: string
    Description: Alterar a chave padrão para 'attributes'.
  --declaration-key: string
    Description: Alterar a chave padrão para 'declaration'.
  --instruction-key: string
    Description: Alterar a chave padrão para 'processing instruction'.
  --type-key: string
    Description: Alterar a chave padrão para 'type' (aplicável se --compact não estiver ativo).
  --name-key: string
    Description: Alterar a chave padrão para 'name' (aplicável se --compact não estiver ativo).
  --elements-key: string
    Description: Alterar a chave padrão para 'elements' (aplicável se --compact não estiver ativo).
```

--------------------------------

### Inicializar destaque de sintaxe ao carregar a página

Fonte: https://github.com/nashwaan/xml-js/blob/master/test/coverage-jest/index.html

Trecho JavaScript que garante que a função `prettyPrint()` — usada para destaque de sintaxe — seja executada após o carregamento da página. Inclui verificação para assegurar que `prettyPrint` esteja definida antes de chamá-la, evitando erros em tempo de execução.

```javascript
window.onload = function () { if (typeof prettyPrint === 'function') { prettyPrint(); } };
```

--------------------------------

### Inicialização do PrettyPrint em JavaScript ao carregar a página

Fonte: https://github.com/nashwaan/xml-js/blob/master/test/coverage-jest/lcov-report/index.html

Trecho JavaScript que executa uma função quando a janela termina de carregar. Verifica a existência global de `prettyPrint` e, se presente, invoca a função — usado para aplicar destaque de sintaxe em blocos de código após o DOM estar pronto.

```javascript
window.onload = function () { if (typeof prettyPrint === 'function') { prettyPrint(); } };
```

--------------------------------

### Opções de configuração para conversão JSON/JS -> XML

Fonte: https://github.com/nashwaan/xml-js/blob/master/README.md

Detalha as opções disponíveis para `js2xml()` e `json2xml()` em `xml-js`. Essas opções permitem controle fino sobre a saída XML, incluindo indentação, tratamento de elementos vazios e ignorar partes específicas (comentários, atributos, declarações) durante a conversão.

```APIDOC
Options for js2xml() and json2xml():
- spaces: number | string (Default: 0)
  Description: Número de espaços para identação da saída XML, ou caracteres como ' ' ou '\t'.
- compact: boolean (Default: false)
  Description: Indica se o objeto de entrada está no formato compacto. Use true para JSON normal.
- fullTagEmptyElement: boolean (Default: false)
  Description: Produz <a></a> para elementos vazios em vez de <a/>.
- indentCdata: boolean (Default: false)
  Description: Escreve CData em nova linha e com identação.
- indentAttributes: boolean (Default: false)
  Description: Imprime atributos em múltiplas linhas e os indenta quando spaces não é 0.
- ignoreDeclaration: boolean (Default: false)
  Description: Ignora escrita da declaração XML (ex.: <?xml?>).
- ignoreInstruction: boolean (Default: false)
  Description: Ignora escrita de instruções de processamento (ex.: <?go there?>).
- ignoreAttributes: boolean (Default: false)
  Description: Ignora escrita de atributos dos elementos (ex.: x="1" em <a x="1"></a>).
- ignoreComment: boolean (Default: false)
  Description: Ignora escrita de comentários (ex.: <!-- -->).
- ignoreCdata: boolean (Default: false)
  Description: Ignora escrita de CData (ex.: <![CDATA[ ]]>).
- ignoreDoctype: boolean (Default: false)
  Description: Ignora escrita de Doctype (ex.: <!DOCTYPE >).
- ignoreText: boolean (Default: false)
  Description: Ignora escrita de textos dos elementos (ex.: 'hi' em <a>hi</a>).
```

--------------------------------

### Opções de nomes de chaves do xml-js

Fonte: https://github.com/nashwaan/xml-js/blob/master/README.md

Define opções configuráveis para alterar os nomes de chaves padrão quando se converte entre XML e objetos JavaScript/JSON. Cada opção especifica o nome da propriedade usado para um construto XML na saída. Dois valores padrão indicam primeiro para saída não-compacta e segundo para compacta. Em modo compacto, usar chaves menores (ex.: `{textKey: '_', attributesKey: '$'}`) reduz o tamanho da saída.

```APIDOC
Options:
  declarationKey: string
    Default: "declaration" (non-compact), "_declaration" (compact)
    Description: Nome da chave de propriedade usada para a declaração.
    Example: {"$declaration":{}} para <?xml?>
  instructionKey: string
    Default: "instruction" (non-compact), "_instruction" (compact)
    Description: Nome da chave de propriedade usada para instruções de processamento.
    Example: {"$instruction":{"go":"there"}} para <?go there?>
  attributesKey: string
    Default: "attributes" (non-compact), "_attributes" (compact)
    Description: Nome da chave de propriedade usada para atributos.
    Example: {"a":{"$attributes":{"x":"hello"}}} para <a x="hello"/>
  textKey: string
    Default: "text" (non-compact), "_text" (compact)
    Description: Nome da chave de propriedade usada para texto.
    Example: {"a":{"$text":"Hi"}} para <a>hi</a>
  cdataKey: string
    Default: "cdata" (non-compact), "_cdata" (compact)
    Description: Nome da chave de propriedade usada para cdata.
    Example: {"$cdata":"1 is < 2"} para <![CDATA[1 is < 2]]>
  doctypeKey: string
    Default: "doctype" (non-compact), "_doctype" (compact)
    Description: Nome da chave de propriedade usada para doctype.
    Example: {"$doctype":" foo"} para <!DOCTYPE foo>
  commentKey: string
    Default: "comment" (non-compact), "_comment" (compact)
    Description: Nome da chave de propriedade usada para comentários.
    Example: {"$comment":"note"} para <!--note-->
  parentKey: string
    Default: "parent" (non-compact), "_parent" (compact)
    Description: Nome da chave de propriedade usada para parent.
    Example: {"a":{"b":{$parent:_points_to_a}}} para <a></b></a>
  typeKey: string
    Default: "type"
    Description: Nome da chave de propriedade usada para type.
    Example: {"elements":[{"type":"element","name":"a"}]} para <a></a>
  nameKey: string
    Default: "name"
    Description: Nome da chave de propriedade usada para name.
    Example: {"elements":[{"type":"element","$name":"a"}]} para <a></a>
  elementsKey: string
    Default: "elements"
    Description: Nome da chave de propriedade usada para elements.
    Example: {"$elements":[{"type":"element","name":"a"}]} para <a></a>
```

--------------------------------

### Convert JSON/JS Object to XML with xml-js

Source: https://github.com/nashwaan/xml-js/blob/master/README.md

This JavaScript snippet demonstrates converting JSON text to XML using `xml-js`'s `json2xml()` function. It includes reading a JSON file, defining conversion options like `compact` and `spaces` for formatting, and printing the resulting XML output to the console.

```js
var convert = require('xml-js');
var json = require('fs').readFileSync('test.json', 'utf8');
var options = {compact: true, ignoreComment: true, spaces: 4};
var result = convert.json2xml(json, options);
console.log(result);
```

--------------------------------

### xml-js Core API Functions Overview

Source: https://github.com/nashwaan/xml-js/blob/master/README.md

Provides an overview of the four primary conversion functions available in the xml-js library: `js2xml`, `json2xml`, `xml2js`, and `xml2json`, detailing their purpose for converting between JavaScript objects, JSON text, and XML text.

```APIDOC
convert.js2xml(js, options) // to convert javascript object to xml text
convert.json2xml(json, options) // to convert json text to xml text
convert.xml2js(xml, options) // to convert xml text to javascript object
convert.xml2json(xml, options) // to convert xml text to json text
```

--------------------------------

### API Reference for JSON to XML Custom Callback Functions

Source: https://github.com/nashwaan/xml-js/blob/master/README.md

Documents the custom callback functions available for processing JavaScript objects or JSON during conversion to XML using `xml-js`. These functions provide hooks to modify DOCTYPE, instructions, CDATA, comments, text, element names, and attribute names before XML generation.

```APIDOC
doctypeFn:
  Signature: (value, currentElementName, currentElementObj)
  Description: To perform additional processing for DOCTYPE. Example: {doctypeFn: function(val) {return val.toUpperCase();}.
instructionFn:
  Signature: (instructionValue, instructionName, currentElementName, currentElementObj)
  Description: To perform additional processing for content of Processing Instruction value. Example: {instructionFn: function(val) {return val.toUpperCase();}}. Note: instructionValue will be an object if instructionHasAttributes is enabled.
cdataFn:
  Signature: (value, currentElementName, currentElementObj)
  Description: To perform additional processing for CData. Example: {cdataFn: function(val) {return val.toUpperCase();}}.
commentFn:
  Signature: (value, currentElementName, currentElementObj)
  Description: To perform additional processing for comments. Example: {commentFn: function(val) {return val.toUpperCase();}}.
textFn:
  Signature: (value, currentElementName, currentElementObj)
  Description: To perform additional processing for texts inside elements. Example: {textFn: function(val) {return val.toUpperCase();}}.
instructionNameFn:
  Signature: (instructionName, instructionValue, currentElementName, currentElementObj)
  Description: To perform additional processing for Processing Instruction name. Example: {instructionNameFn: function(val) {return val.toUpperCase();}}. Note: instructionValue will be an object if instructionHasAttributes is enabled.
elementNameFn:
  Signature: (value, currentElementName, currentElementObj)
  Description: To perform additional processing for element name. Example: {elementNameFn: function(val) {return val.toUpperCase();}}.
attributeNameFn:
  Signature: (attributeName, attributeValue, currentElementName, currentElementObj)
  Description: To perform additional processing for attribute name. Example: {attributeNameFn: function(val) {return val.toUpperCase();}}.
```

--------------------------------

### xml-js Configuration Functions

Source: https://github.com/nashwaan/xml-js/blob/master/README.md

These functions allow for custom processing of XML attributes and elements during conversion. They provide hooks to modify values or control element generation based on specific criteria.

```APIDOC
attributeValueFn(attributeValue: any, attributeName: string, currentElementName: string, currentElementObj: object): any
  Description: To perform additional processing for attributeValue.
  Example: {attributeValueFn: function(val) {return val.toUpperCase();}}

attributesFn(value: any, currentElementName: string, currentElementObj: object): any
  Description: To perform additional processing for attributes object.
  Example: {attributesFn: function(val) {return val.toUpperCase();}}

fullTagEmptyElementFn(currentElementName: string, currentElementObj: object): boolean
  Description: Whether to generate full tag or just self closing tag for elements that has no sub elements.
  Example: {fullTagEmptyElementFn: function(val) {return val === 'foo'}}
```