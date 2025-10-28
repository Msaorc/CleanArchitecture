### Noções básicas da Query API

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Explica as operações fundamentais da Query API, incluindo como recuperar valores diretos com `get()` e valores transitivos com `with()` ou `of()`.

```APIDOC
Query API:

Cada Scanner e função do ReflectionUtils suporta:

- `get()`: Retorna valores diretos.
- `with()` ou `of()`: Retorna todos os valores transitivos.

Exemplo:
`Scanners.SubTypes.get(T)` retorna subtipos diretos.
`Scanners.SubTypes.of(T)` retorna a hierarquia transitiva de subtipos.
O mesmo se aplica a `Scanners.TypesAnnotated` e `ReflectionUtils.SuperTypes`, etc.
```

--------------------------------

### Obtendo anotações mescladas de controllers REST

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Exemplo avançado que demonstra como recuperar anotações mescladas para endpoints de controllers REST, incluindo anotações do método e da classe declaradora.

```java
// obter todas as anotações da hierarquia RequestMapping (GetMapping, PostMapping, ...)
Set<Class<?>> metaAnnotations = 
  reflections.get(TypesAnnotated.getAllIncluding(RequestMapping.class.getName()).asClass());

QueryFunction<Store, Map<String, Object>> queryAnnotations = 
  // obter todos os métodos de endpoint do controller      
  MethodsAnnotated.with(metaAnnotations).as(Method.class)
    .map(method ->
      // obter tanto as anotações RequestMapping do método quanto da classe que o declara   
      get(Annotations.of(method.getDeclaringClass())
        .add(Annotations.of(method))
        .filter(a -> metaAnnotations.contains(a.annotationType())))
        .stream()
        // mesclar os valores dos membros das anotações em um único mapa
        .collect(new AnnotationMergeCollector(method)));

// aplicar a query e mapear o hashmap mesclado em um proxy de anotação Java
Set<RequestMapping> mergedAnnotations = 
  reflections.get(mergedAnnotation
    .map(map -> ReflectionUtils.toAnnotation(map, metaAnnotation)));
```

--------------------------------

### Configuração do Reflections com pacotes

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Ilustra como configurar a biblioteca Reflections para escanear um pacote específico usando `ConfigurationBuilder` e scanners padrão.

```java
Reflections reflections = new Reflections(
  new ConfigurationBuilder()
    .forPackage("com.my.project")
    .filterInputsBy(new FilterBuilder().includePackage("com.my.project"))));
```

--------------------------------

### Texto padrão da Apache License 2.0

Fonte: https://github.com/ronmamo/reflections/blob/master/LICENSE-2.0.txt

Aviso padrão exigido para projetos licenciados sob a Apache License 2.0. Inclui informações de copyright e licenciamento.

```text
Copyright [yyyy] [name of copyright owner]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

--------------------------------

### Configuração do Reflections com scanners específicos

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Demonstra como configurar o Reflections para escanear um pacote com scanners específicos (TypesAnnotated, MethodsAnnotated, MethodsReturn) e filtros de entrada.

```java
import static org.reflections.scanners.Scanners.*;

Reflections reflections = new Reflections(
  new ConfigurationBuilder()
    .forPackage("com.my.project")
    .filterInputsBy(new FilterBuilder().includePackage("com.my.project").excludePackage("com.my.project.exclude"))
    .setScanners(TypesAnnotated, MethodsAnnotated, MethodsReturn));
```

--------------------------------

### Comparação dos scanners do Reflections com a API anterior

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Apresenta uma tabela de comparação entre os scanners atuais do Reflections e a API 0.9.x anterior, destacando os métodos equivalentes e scanners. Também indica scanners obsoletos e fornece esclarecimentos sobre usos específicos.

```APIDOC
Scanners vs. Previous 0.9.x API:

| Scanners                                             | previous 0.9.x API                                                              | previous Scanner         |
| ---------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------ |
| `get(SubType.of(T))`                                 | `getSubTypesOf(T)`                                                              | `~~SubTypesScanner~~`    |
| `get(SubTypes.of(TypesAnnotated.with(A)))`           | `getTypesAnnotatedWith(A) *(1)*`                                                | `~~TypeAnnotationsScanner~~` |
| `get(MethodsAnnotated.with(A))`                      | `getMethodsAnnotatedWith(A)`                                                    | `~~MethodAnnotationsScanner~~` |
| `get(ConstructorsAnnotated.with(A))`                 | `getConstructorsAnnotatedWith(A) *(2)*`                                         | `~~MethodAnnotationsScanner~~` |
| `get(FieldsAnnotated.with(A))`                       | `getFieldsAnnotatedWith(A)`                                                     | `~~FieldAnnotationsScanner~~` |
| `get(Resources.with(regex))`                         | `getResources(regex)`                                                           | `~~ResourcesScanner~~`       |
| `get(MethodsParameter.with(P))`                      | `getMethodsWithParameter(P) *(3)*`<br>`~~getMethodsWithAnyParamAnnotated(P)~~` | `~~MethodParameterScanner~~`<br>*obsolete* |
| `get(MethodsSignature.of(P, ...))`                  | `getMethodsWithSignature(P, ...) *(3)`<br>`~~getMethodsMatchParams(P, ...)~~` | `~~MethodParameterScanner~~` |
| `get(MethodsReturn.of(T))`                           | `getMethodsReturn(T) *(3)*`                                                     | `~~MethodParameterScanner~~` |
| `get(ConstructorsParameter.with(P))`                 | `getConstructorsWithParameter(P) *(3)`<br>`~~getConstructorsWithAnyParamAnnotated(P)~~` | `~~MethodParameterScanner~~` |
| `get(ConstructorsSignature.of(P, ...))`             | `getConstructorsWithSignature(P, ...) *(3)`<br>`~~getConstructorsMatchParams(P, ...)~~` | `~~MethodParameterScanner~~` |

*Note: `asClass()` and `as()` mappings were omitted*

*(1): The equivalent of `getTypesAnnotatedWith(A)` is `get(SubTypes.of(TypesAnnotated.with(A)))`, including SubTypes*

*(2): MethodsAnnotatedScanner does not include constructor annotation scanning, use instead Scanners.ConstructorsAnnotated*

*(3): MethodParameterScanner is obsolete, use instead as required: Scanners.MethodsParameter, Scanners.MethodsSignature, Scanners.MethodsReturn, Scanners.ConstructorsParameter, Scanners.ConstructorsSignature*
```

--------------------------------

### Compondo Scanners e funções do ReflectionUtils

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Mostra como compor funções dos Scanners e do ReflectionUtils para obter métodos a partir dos metadados do classpath de um tipo.

```java
QueryFunction<Store, Method> methods = 
  SubTypes.of(type).asClass()  // <-- metadados escaneados no classpath
    .flatMap(Methods::of);     // <-- API de reflexão Java
```

--------------------------------

### Uso da Query API com filter e map

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Demonstra o uso da Query API com operações `filter` e `map` para recuperar métodos públicos sem parâmetros, retornando-os como objetos `Method`.

```java
QueryFunction<Store, Method> getters = 
  Methods.of(C1.class)
    .filter(withModifier(Modifier.PUBLIC))
    .filter(withPrefix("get").and(withParametersCount(0)))
    .as(Method.class);
```

--------------------------------

### Consultando metadados indexados com scanners do Reflections

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Demonstra como usar vários scanners do Reflections para consultar metadados indexados, incluindo subtipos, tipos anotados, métodos anotados, campos anotados e recursos. Mostra também como especificar o tipo de retorno usando '.asClass()' ou '.as(Type.class)'.

```java
import static org.reflections.scanners.Scanners.*;

// SubTypes
Set<Class<?>> modules = 
  reflections.get(SubTypes.of(Module.class).asClass());

// TypesAnnotated (*1)
Set<Class<?>> singletons = 
  reflections.get(TypesAnnotated.with(Singleton.class).asClass());

// MethodsAnnotated
Set<Method> resources = 
  reflections.get(MethodsAnnotated.with(GetMapping.class).as(Method.class));

// FieldsAnnotated
Set<Field> ids = 
  reflections.get(FieldsAnnotated.with(Id.class).as(Field.class));

// Resources
Set<String> properties = 
  reflections.get(Resources.with(".*\\.properties"));
```

```java
// MethodsReturn
Set<Method> voidMethods = 
  reflections.get(MethodsReturn.with(void.class).as(Method.class));

// MethodsSignature
Set<Method> someMethods = 
  reflections.get(MethodsSignature.of(long.class, int.class).as(Method.class));

// MethodsParameter
Set<Method> pathParam = 
  reflections.get(MethodsParameter.of(PathParam.class).as(Method.class));

// ConstructorsAnnotated
Set<Constructor> injectables =
  reflections.get(ConstructorsAnnotated.with(Inject.class).as(Constructor.class));

// ConstructorsSignature
Set<Constructor> someConstructors = 
  reflections.get(ConstructorsSignature.of(String.class).as(Constructor.class));

// MethodParameterNamesScanner
List<String> parameterNames =
  reflections.getMemberParameterNames(member);

// MemberUsageScanner
Set<Member> usages = 
  reflections.getMemberUsages(member)
```

--------------------------------

### MemberUsageScanner

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Apresenta o experimental `MemberUsageScanner` para consultar usos de membros entre pacotes, tipos e elementos — útil para análise de dependências.

```APIDOC
MemberUsageScanner:

Scanner experimental para consultar usos de membros (por exemplo, `getMemberUsages()`).
Permite encontrar usos entre pacotes, camadas, módulos, tipos, etc.
```

--------------------------------

### Serialização e coleta no Reflections

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Descreve como salvar metadados escaneados usando `Reflections.save()` e coletá-los na inicialização com `Reflections.collect()`, útil para integração no ciclo de build.

```APIDOC
Build Lifecycle Integration:

- `Reflections.save()`: Salva metadados escaneados (por exemplo, em XML/JSON) como parte do ciclo de build.
- `Reflections.collect()`: Coleta metadados previamente salvos na inicialização, evitando o escaneamento em tempo de execução.

Veja [reflections-maven](https://github.com/ronmamo/reflections-maven/) para um exemplo.
```

--------------------------------

### Usando ReflectionUtils para acessar metadados do classpath

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Ilustra como usar métodos utilitários do `ReflectionUtils` para acessar vários aspectos de classes Java, incluindo supertypes, campos, construtores, métodos, recursos, anotações e tipos de anotações. Menciona suporte às APIs anteriores 0.9.x.

```java
import static org.reflections.ReflectionUtils.*;

Set<Class<?>>    superTypes   = get(SuperTypes.of(T));
Set<Field>       fields       = get(Fields.of(T));
Set<Constructor> constructors = get(Constructors.of(T));
Set<Methods>     methods      = get(Methods.of(T));
Set<URL>         resources    = get(Resources.with(T));

Set<Annotation>  annotations  = get(Annotations.of(T));
Set<Class<? extends Annotation>> annotationTypes = get(AnnotationTypes.of(T));
```

--------------------------------

### Uso básico do Reflections (API 0.10.x)

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Demonstra o uso básico da biblioteca Reflections com sua nova API funcional para encontrar subtipos de uma classe e tipos anotados com uma anotação específica.

```java
Reflections reflections = new Reflections("com.my.project");

Set<Class<?>> subTypes = reflections.get(SubTypes.of(SomeType.class).asClass());

Set<Class<?>> annotated = reflections.get(SubTypes.of(TypesAnnotated.with(SomeAnnotation.class)).asClass());
```

--------------------------------

### Adicionar dependência do Reflections (Maven/Gradle)

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Trecho mostrando como adicionar a biblioteca Reflections como dependência ao seu projeto Java usando Maven ou Gradle.

```xml
<dependency>
    <groupId>org.reflections</groupId>
    <artifactId>reflections</artifactId>
    <version>0.10.2</version>
</dependency>
```

```gradle
implementation 'org.reflections:reflections:0.10.2'
```

--------------------------------

### Uso básico do Reflections (API 0.9.x)

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Mostra o uso da API antiga para encontrar subtipos de uma classe e tipos anotados com uma anotação específica.

```java
Set<Class<? extends SomeType>> subTypes = reflections.getSubTypesOf(SomeType.class);

Set<Class<?>> annotated = reflections.getTypesAnnotatedWith(SomeAnnotation.class);
```

--------------------------------

### JavaCodeSerializer

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Explica o `JavaCodeSerializer` para persistir metadados escaneados em código-fonte Java gerado, permitindo acesso fortemente tipado.

```APIDOC
JavaCodeSerializer:

Persiste metadados escaneados em código-fonte Java gerado.
Útil para acessar tipos e membros de forma fortemente tipada.
Veja exemplo: [MyTestModelStore.java](https://github.com/ronmamo/reflections/blob/master/src/test/java/org/reflections/MyTestModelStore.java)
```

--------------------------------

### Interface fluente QueryFunction

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Detalha a interface funcional fluente fornecida por `QueryFunction` para compor operações como `filter`, `map`, `flatMap` e `as`.

```APIDOC
QueryFunction Interface:

Fornece uma interface funcional fluente para compor operações tais como:
- `filter()`
- `map()`
- `flatMap()`
- `as()`

Isso permite encadear operações para refinar os resultados de consulta.
```

--------------------------------

### AnnotationMergeCollector

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Detalha a utilidade `AnnotationMergeCollector` para mesclar anotações similares, com referência ao seu uso em testes.

```APIDOC
AnnotationMergeCollector:

Utilitário para mesclar anotações similares.
Veja uso em testes: [ReflectionUtilsQueryTest.java#L216](https://github.com/ronmamo/reflections/blob/master/src/test/java/org/reflections/ReflectionUtilsQueryTest.java#L216)
```

--------------------------------

### Função de função para consulta de anotações

Fonte: https://github.com/ronmamo/reflections/blob/master/README.md

Ilustra um padrão 'função de função' para consultar anotações de métodos dentro de uma classe específica.

```java
QueryFunction<Store, Class<? extends Annotation>> queryAnnotations = 
  Annotations.of(Methods.of(C4.class))
    .map(Annotation::annotationType);
```