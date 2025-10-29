# Arquitetura do Projeto

Este projeto utiliza uma arquitetura baseada nos princípios do Clean Architecture, que visa a separação de responsabilidades, a testabilidade e a independência de frameworks, UI e banco de dados.

## Camadas

A aplicação é dividida nas seguintes camadas, da mais interna para a mais externa:

### 1. Domain

A camada de `domain` é o núcleo da aplicação e contém a lógica de negócio principal. Ela é totalmente independente de outras camadas e não deve ter conhecimento de detalhes de implementação, como banco de dados ou frameworks.

- **`entity`**: Representa os objetos de negócio da aplicação, com seus atributos e regras de negócio invariantes.
- **`repository`**: Define as interfaces para a persistência de dados das entidades. As implementações concretas dessas interfaces estão na camada de `infrastructure`.
- **`service`**: Contém as regras de negócio que não se encaixam em uma única entidade.
- **`factory`**: Responsável pela criação de entidades complexas, garantindo que elas sejam criadas em um estado válido.
- **`validator`**: Define as interfaces para a validação de dados das entidades.
- **`event`**: Contém os eventos de domínio que são disparados quando ocorrem alterações importantes no estado das entidades.
- **`handler`**: Contém os manipuladores de eventos de domínio, que executam ações em resposta a esses eventos.

### 2. Usecase

A camada de `usecase` (ou `application`) contém as regras de negócio específicas da aplicação. Ela orquestra o fluxo de dados entre as camadas de `domain` e `infrastructure`, utilizando as interfaces de repositório para acessar os dados e as entidades de domínio para executar a lógica de negócio.

Os casos de uso são representados por classes que executam uma única tarefa, como `create_customer`, `find_product`, etc.

### 3. Infrastructure

A camada de `infrastructure` é a camada mais externa e contém as implementações de detalhes técnicos, como:

- **Frameworks:** (por exemplo, Express)
- **Bancos de dados:** (por exemplo, Sequelize, repositórios concretos)
- **Serviços externos:** (por exemplo, gateways de pagamento, serviços de e-mail)

Esta camada é responsável por implementar as interfaces definidas na camada de `domain` (como os repositórios) e por interagir com o mundo exterior.

### 4. Main

O arquivo de inicio `main` é o ponto de entrada da aplicação. Ele é responsável por inicializar e configurar todas as camadas e módulos da aplicação, injetando as dependências necessárias.
