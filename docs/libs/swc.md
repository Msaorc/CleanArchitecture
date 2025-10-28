### Compilar e executar o exemplo SWC WASM

Fonte: https://github.com/swc-project/swc/blob/main/bindings/binding_core_wasm/example/readme.txt

Os comandos a seguir mostram como compilar o módulo SWC em WASM, instalar as dependências Node.js do exemplo e, por fim, iniciar o servidor de desenvolvimento (webpack) para visualizar a aplicação localmente.

```shell
cd swc/wasm
./scripts/build_web_release.sh
cd swc/wasm/example
npm install
npm run serve
```

--------------------------------

### Instalar um pacote via npm

Fonte: https://github.com/swc-project/swc/blob/main/crates/swc_html_parser/benches/files/github_com_17_05_2022.html

Exemplo de como instalar um pacote Node.js (por exemplo, `eslint`) com o npm. O comando adiciona o pacote especificado e suas dependências ao projeto; a saída típica mostra os pacotes adicionados e o resultado da auditoria.

```Bash
npm install eslint
```

--------------------------------

### Instalar o rustfmt para formatação de código

Fonte: https://github.com/swc-project/swc/blob/main/CONTRIBUTING.md

Este comando instala o componente `rustfmt` para a toolchain `nightly`. O `rustfmt` é usado para formatar automaticamente o código Rust conforme as diretrizes de estilo do projeto SWC.

```bash
rustup component add --toolchain nightly rustfmt-preview
```

--------------------------------

yarn
### Instalar dependências JavaScript com Yarn

Fonte: https://github.com/swc-project/swc/blob/main/CONTRIBUTING.md

Após buscar os submódulos, este comando instala todas as dependências JavaScript necessárias usando o gerenciador Yarn. Certifique-se de que o Yarn esteja instalado antes de executar.

```bash
yarn
```

--------------------------------

### Exemplo de objeto JSON

Fonte: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/element/script-json-pretty/input.html

Um objeto JSON simples demonstrando um par chave-valor.

```JSON
{ "foo" : "bar" }
```

--------------------------------

### Exemplo básico de objeto JSON

Fonte: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/element/script-json-pretty/output.min.html

Um objeto JSON simples que demonstra um par chave-valor; este formato é comumente usado para configuração ou representação de dados.

```JSON
{ "foo": "bar" }
```

--------------------------------

### Estrutura XML simples

Fonte: https://github.com/swc-project/swc/blob/main/crates/swc_xml_parser/tests/fixture/document_type/internal_subset_empty-1/dom.txt

Trecho que mostra um documento XML básico com declaração DOCTYPE e um elemento raiz `root` contendo o texto `test`. Serve como exemplo elementar de sintaxe XML.

```XML
<!DOCTYPE greeting>
<root>
  "test"

```

--------------------------------

### Exemplo de seletor de classe CSS

Fonte: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/element/style/input.html

Define uma regra CSS para elementos com a classe `test`, definindo a cor do texto como vermelho. Ilustra como estilizar elementos usando seletores de classe.

```css
.test { color: red }
```

--------------------------------

a{color:red}
### Aplicar cor vermelha a elementos 'a' em CSS

Fonte: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/text/collapse-whitespace-only-metdata/output.min.html

Exemplo de regra CSS que mira todos os elementos `<a>` (âncora) e define sua cor como vermelha. É um exemplo básico de aplicação de estilos a tags HTML específicas.

```CSS
a{color:red}
```

--------------------------------

### Exemplo JSON-LD (Schema.org) para receita

Fonte: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/element/script/output.min.html

Define uma receita usando JSON-LD do Schema.org, incluindo autor, data de publicação, descrição, nome e tempo de preparo. Esses dados estruturados ajudam mecanismos de busca a entender o conteúdo.

```JSON
{"@context":"https://schema.org/","@type":"Recipe","author":{"@type":"Person","name":"Mary Stone"},"datePublished":"2018-03-10","description":"This coffee cake is awesome and perfect for parties.","name":"Party Coffee Cake","prepTime":"PT20M"}
```

--------------------------------

### Exemplo de esquema JSON-LD para receita

Fonte: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/element/disabled-json/input.html

Outro exemplo de JSON-LD (JSON para Linked Data) descrevendo uma receita, com campos como nome, autor, data de publicação, descrição e tempo de preparo — usado para dados estruturados em páginas web.

```JSON
Document { "@context": "https://schema.org/", "@type": "Recipe", "name": "Party Coffee Cake", "author": { "@type": "Person", "name": "Mary Stone" }, "datePublished": "2018-03-10", "description": "This coffee cake is awesome and perfect for parties.", "prepTime": "PT20M" }
```

--------------------------------

### Exemplo básico de alert em JavaScript (1)

Fonte: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/comment/basic/output.min.html

Uma chamada simples a `alert()` exibindo o número 1 em um pop-up.

```JavaScript
alert(1)
```

--------------------------------

### Definir um único atributo com valor simples

Fonte: https://github.com/swc-project/swc/blob/main/crates/swc_xml_parser/tests/fixture/attribute/dom.txt

Exemplo básico de atributo com um valor string simples.

```Markup
<foo>
  a="test1"
```

--------------------------------

### Executar testes com Cargo

Fonte: https://github.com/swc-project/swc/blob/main/crates/swc_estree_compat/tests/README.md

Depois de preparar os arquivos de fixture e de saída, este comando executa os testes. O `cargo test` encontra automaticamente e executa os testes com base na estrutura de diretórios das fixtures.

```bash
cargo test
```

--------------------------------

### Várias regras de estilo CSS

Fonte: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/element/style/output.min.html

Exemplifica diferentes seletores e propriedades CSS, incluindo media queries, seletores de classe, seletores de elemento, e propriedades como `color`, `fill`, `stroke` e `stroke-width`. Também inclui um comentário CSS.

```css
@media all{p{color:red}}
.test{color:red}
circle{fill:gold;stroke:maroon;stroke-width:2px}
/* This is not style */
.class { color: red }
a{color:red}
```

--------------------------------

### Trecho mínimo incompleto de SVG/XML

Fonte: https://github.com/swc-project/swc/blob/main/crates/swc_xml_parser/tests/fixture/document_type/internal_subset-3/dom.txt

Exemplo que demonstra o início de um documento SVG ou XML, incluindo a declaração DOCTYPE e um elemento raiz de abertura com um nó de texto. Observe que o elemento raiz não está fechado neste exemplo.

```XML
<!DOCTYPE svg>
<root>
  "test"

```

--------------------------------

### Criar novo diretório de fixture de teste e arquivo de entrada

Fonte: https://github.com/swc-project/swc/blob/main/crates/swc_estree_compat/tests/README.md

Passos para configurar a estrutura básica de um novo teste: criar um diretório de fixture e um arquivo `input.js` contendo o código fonte a ser testado.

```bash
mkdir fixtures/my-test
echo "var a = true;" > fixtures/my-test/input.js
```

--------------------------------

### Definir um atributo simples

Fonte: https://github.com/swc-project/swc/blob/main/crates/swc_xml_parser/tests/fixture/attribute/dom.txt

> Ilustra a sintaxe básica para definir um único atributo com valor string simples.

```Markup
<foo>
  a="b"
```

--------------------------------

### Multi-line Plain Text Block Example

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/text/collapse-whitespace-all/output.min.html

This snippet represents a generic multi-line text block, often used for configuration files, simple data, or unformatted textual content. It preserves line breaks and any leading whitespace.

```Plain Text
foo

baz
```

--------------------------------

### JSON-LD Recipe Structured Data

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/element/disabled-json/input.html

An example of structured data for a recipe, formatted as JSON-LD. This snippet defines a 'Recipe' type with properties like name, author, publication date, description, and preparation time, typically used for web content SEO.

```JSON
Document { "@context": "https://schema.org/", "@type": "Recipe", "name": "Party Coffee Cake", "author": { "@type": "Person", "name": "Mary Stone" }, "datePublished": "2018-03-10", "description": "This coffee cake is awesome and perfect for parties.", "prepTime": "PT20M" }
```

--------------------------------

### Basic JavaScript Alert (Example 2)

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/comment/basic/output.min.html

Another simple JavaScript `alert()` call displaying the number 8 as a pop-up message.

```JavaScript
alert(8)
```

--------------------------------

### Minimal SVG Document Example

Source: https://github.com/swc-project/swc/blob/main/crates/swc_xml_parser/tests/fixture/document_type/internal_subset-1/dom.txt

This snippet shows the essential components of an SVG document: the XML declaration (implied by DOCTYPE), the DOCTYPE declaration itself, and a root element. It's a starting point for creating SVG graphics.

```SVG
<!DOCTYPE svg>
<root>
  "test"

```

--------------------------------

### Generic CSS Class Rule

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/element/style/input.html

Applies a red color to elements with the class 'class'. This is a general example of a class selector.

```css
.class { color: red }
```

--------------------------------

### Octocat Classifier Project README

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_parser/benches/files/github_com_17_05_2022.html

The README.md file content for the 'Octocat Classifier' project, detailing its purpose, build status, and installation instructions, including a `git clone` command within a fenced code block.

```Markdown
# Octocat Classifier :octopus: :cat: :mag:

![]https://img.shields.io/badge/build-passing-brightgreen) ![]https://img.shields.io/badge/coverage-90%25-green) ![]https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen)

As the name suggests, Octocat Classifier is used to determine whether a given image contains an Octocat. It is trained with images from the [Octodex](1), images shared with [#MyOctocat on Twitter](2), and [photographs of laptops with :octocat: stickers on them]().

## Installation

```
git clone https://github.com/jasonetco/octocat-classifier
```
```

--------------------------------

### Define attribute with less-than character in value

Source: https://github.com/swc-project/swc/blob/main/crates/swc_xml_parser/tests/fixture/attribute/dom.txt

Shows an attribute value containing a less-than character, which could be misinterpreted as a tag start.

```Markup
<foo>
  attributeName="He said <OK<"
```

--------------------------------

### Basic CSS Element and Class Styling

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/element/style-group-2/input.html

This snippet showcases various fundamental CSS rules for styling HTML elements (`a`, `b`, `p`) and classes (`.first`, `.second`). It demonstrates applying properties such as `color`, `background-color`, `padding`, and `border` to achieve different visual effects.

```CSS
a { color:red }
```

```CSS
b { color:blue }
```

```CSS
p { color: white; background-color: blue; padding: 5px; border: 1px solid black; }
```

```CSS
p { color: blue; background-color: yellow; }
```

```CSS
.first { color: red; }
```

```CSS
.second { color: red; }
```

```CSS
p { color: blue; }
```

```CSS
p { color: red; }
```

--------------------------------

### Malformed JavaScript URL Scheme Example

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/attribute/javascript-urls/output.min.html

An example of a malformed `javascript:` URL scheme. While syntactically incorrect, it highlights attempts to embed JavaScript directly into URLs, which could lead to parsing errors or unexpected behavior.

```JavaScript
broken;;(
```

--------------------------------

### Basic JavaScript Alert (Example 3)

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/comment/basic/output.min.html

A third simple JavaScript `alert()` call displaying the number 10 as a pop-up message.

```JavaScript
alert(10)
```

--------------------------------

### CSS Styling with Pseudo-element and Color

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_codegen/tests/fixture/svg-tag/output.html

This snippet demonstrates basic CSS rules, including the use of the `::before` pseudo-element to insert content before an element and applying a `color` property to a class. It shows how to define styles for the `.color` class.

```css
.color::before { content: "&"; } .color { color: red; }
```

--------------------------------

### Basic Plaintext Code Example

Source: https://github.com/swc-project/swc/blob/main/crates/jsdoc/tests/fixtures/markdowntest.md

This snippet illustrates a generic code block. It serves as a placeholder for actual programming code and is presented without specific language syntax highlighting.

```plaintext
this is some code
```

--------------------------------

### Malformed JavaScript URI Example

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/attribute/javascript-urls/input.html

Illustrates a syntactically incorrect JavaScript URI. While it attempts to use the 'javascript:' scheme, the code provided is not valid JavaScript and would likely result in a browser error.

```JavaScript
broken;;( )
```

--------------------------------

### Apply Basic Color Styles to H1 and P Elements

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/attribute/style/input.html

This CSS snippet applies a red color to all <h1> elements and a blue color to all <p> elements. It illustrates fundamental CSS syntax for selecting elements and applying style properties.

```CSS
h1 {color:red;}
p {color:blue;}
```

--------------------------------

### Define multiple attributes including namespaced and content

Source: https://github.com/swc-project/swc/blob/main/crates/swc_xml_parser/tests/fixture/attribute/dom.txt

Demonstrates a custom element with multiple attributes, one of which is namespaced, and additional content.

```Markup
<MyElement>
  myAttribute2="attribute value"
  nsA:myAttribute1="attribute value"
  "..."
```

--------------------------------

### Define attributes with different quoting styles

Source: https://github.com/swc-project/swc/blob/main/crates/swc_xml_parser/tests/fixture/attribute/dom.txt

Demonstrates attributes using double-double quotes and single-double quotes for their values.

```Markup
<foo>
  a=""test1""
  b="'test2'"
```

--------------------------------

### Define multiple namespaced attributes with mixed quotes and content

Source: https://github.com/swc-project/swc/blob/main/crates/swc_xml_parser/tests/fixture/attribute/dom.txt

Shows multiple attributes, some with namespaces and varied quoting, along with text content.

```Markup
<foo>
  bar:b="'test2'"
  foo:a=""test1""
  "test"
```

--------------------------------

### Define an attribute with an empty string value

Source: https://github.com/swc-project/swc/blob/main/crates/swc_xml_parser/tests/fixture/attribute/dom.txt

Demonstrates an attribute whose value is an empty string.

```Markup
<foo>
  foo=""
```

--------------------------------

### Comprehensive CSS Styling for Paragraphs

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/element/style-group-1/input.html

This CSS rule provides a comprehensive style for `<p>` (paragraph) elements. It sets white text on a blue background, adds 5 pixels of padding, and includes a 1-pixel solid black border. This snippet showcases multiple styling properties for block-level elements.

```CSS
p { color: white; background-color: blue; padding: 5px; border: 1px solid black; }
```

--------------------------------

### CSS Class Rule for Red Text on '.second' Class

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/element/style-group-1/input.html

This CSS rule targets elements with the class `second` and sets their text color to red. Similar to the `.first` class, it shows another example of class-based styling, emphasizing reusability.

```CSS
.second { color: red; }
```

--------------------------------

### JavaScript Console Log Example

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/text/collapse-whitespace-advanced-conservative/output.min.html

A fundamental JavaScript snippet demonstrating how to print a simple string message to the console for debugging or output purposes.

```javascript
console.log("test")
```

--------------------------------

### Generate Expected Babel AST Output File

Source: https://github.com/swc-project/swc/blob/main/crates/swc_estree_compat/tests/README.md

After creating the input file, this step describes how to generate the `output.json` file, which contains the expected Babel AST. A utility script `babelgen.js` is provided for this purpose, requiring `@babel/parser` as a dependency.

```bash
# If using the babelgen.js utility, run `npm install` first to get @babel/parser dependency.
node babelgen.js fixtures/my-test/input.js > fixtures/my-test/output.json
```

--------------------------------

### Execute JavaScript Alert via URL Scheme

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/attribute/javascript-urls/output.min.html

Demonstrates how to execute a simple JavaScript `alert` function directly from a URL using the `javascript:` scheme. This method is often used for client-side scripting or as a vector for XSS attacks.

```JavaScript
alert("test")
```

--------------------------------

### Execute JavaScript Alert from CDATA (Value 10)

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/comment/preserve-comments/input.html

Another example of a JavaScript alert function call with a literal value of 10, also embedded within a CDATA section, demonstrating variations in CDATA syntax with spacing.

```JavaScript
alert(10)
```

--------------------------------

### Utility: swcgen.js

Source: https://github.com/swc-project/swc/blob/main/crates/swc_estree_compat/tests/README.md

This utility script is used to print the SWC Abstract Syntax Tree (AST) in JSON format, which can be useful for debugging and understanding the internal representation of code within the SWC parser.

```APIDOC
swcgen.js:
  Description: Prints the SWC AST as JSON.
```

--------------------------------

### Basic CSS Rule for Blue Text on Paragraphs

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/element/style-group-1/input.html

This CSS rule sets the text color of all `<p>` (paragraph) elements to blue. It's a fundamental example of element-level text styling, showing a simple override or initial styling.

```CSS
p { color: blue; }
```

--------------------------------

### Basic CSS Rule for Red Text on Paragraphs

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/element/style-group-1/input.html

This CSS rule sets the text color of all `<p>` (paragraph) elements to red. It's another fundamental example of element-level text styling, demonstrating a different color application.

```CSS
p { color: red; }
```

--------------------------------

### Basic CSS Rule for Paragraph Tags

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/element/style/input.html

Sets the text color of all paragraph (<p>) elements to red. This rule demonstrates basic element styling.

```css
p { color: red }
```

--------------------------------

### Define Recipe using Schema.org JSON-LD

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/element/disabled-json/output.min.html

This snippet illustrates how to define a 'Recipe' entity using Schema.org's JSON-LD format. It includes essential details such as the recipe's name, author, publication date, a brief description, and preparation time. This structured data is crucial for search engines to understand and display rich snippets.

```JSON
{
  "@context": "https://schema.org/",
  "@type": "Recipe",
  "name": "Party Coffee Cake",
  "author": {
    "@type": "Person",
    "name": "Mary Stone"
  },
  "datePublished": "2018-03-10",
  "description": "This coffee cake is awesome and perfect for parties.",
  "prepTime": "PT20M"
}
```

--------------------------------

### Log Message to Console in JavaScript

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/text/collapse-whitespace-only-metdata/output.min.html

Demonstrates how to output a string message to the browser's developer console using the `console.log()` function in JavaScript. This is commonly used for debugging purposes.

```JavaScript
console.log("test")
```

--------------------------------

### Multiple JavaScript Console Statements

Source: https://github.com/swc-project/swc/blob/main/crates/swc_html_minifier/tests/fixture/text/collapse-whitespace-advanced-conservative/output.min.html

A JavaScript code example illustrating the execution of multiple console.log statements within a single line, separated by a comma.

```javascript
console.log("test"),console.log("test")
```

--------------------------------

### Define a standard attribute on a custom element

Source: https://github.com/swc-project/swc/blob/main/crates/swc_xml_parser/tests/fixture/attribute/dom.txt

A common pattern for defining an attribute with a simple string value on a custom element.

```Markup
<MyElement>
  myAttribute="attribute value"
```