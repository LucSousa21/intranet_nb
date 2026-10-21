# Intranet NB — Consulta de Endereços

Sistema de intranet desenvolvido para facilitar a consulta de endereços de unidades da Hapvida, permitindo que os colaboradores localizem unidades de acordo com a filial selecionada.

O projeto foi desenvolvido em colaboração, com o back-end responsável pela disponibilização e organização dos dados, e o front-end responsável pela interface e apresentação das informações.

## Objetivo do Projeto

Facilitar o acesso aos endereços de unidades, laboratórios, hospitais, maternidades e sede administrativa, centralizando as informações em uma interface simples e organizada.

A aplicação foi desenvolvida para atender a uma necessidade operacional do setor, tornando a consulta de endereços mais prática para os colaboradores.

## Tecnologias Utilizadas

### Back-end
- **Python** — linguagem utilizada no desenvolvimento do back-end.
- **FastAPI** — criação e organização das rotas da API.
- **SQLAlchemy** — interação com o banco de dados.
- **Supabase** — plataforma utilizada para armazenamento dos dados.

### Front-end
- **HTML5** — estruturação da interface.
- **CSS3** — estilização e apresentação visual.
- **JavaScript** — interatividade e consumo dos dados disponibilizados pela API.

##Arquitetura da Aplicação

A aplicação utiliza uma arquitetura dividida entre back-end e front-end, com responsabilidades separadas.

- **Back-end:** responsável pela arquitetura da API, definição das rotas, modelagem do banco de dados e disponibilização dos dados.
- **Banco de dados:** armazenamento das informações utilizadas pela aplicação, com integração por meio do Supabase e do SQLAlchemy.
- **Front-end:** responsável pela interface, seleção das filiais, consumo das rotas da API e exibição dos endereços.

##  Funcionalidades

- Consulta de endereços conforme a filial selecionada.
- Disponibilização de dados por meio de rotas específicas da API.
- Integração entre front-end, back-end e banco de dados.
- Organização e apresentação dos endereços das unidades por categorias.

## Rotas da API

A API possui rotas destinadas à consulta das informações das seguintes localidades:

| Rota | Localidade |
|---|---|
| `/api-fortaleza` | Fortaleza |
| `/api-salvador` | Salvador |
| `/api-camacari` | Camaçari |
| `/api-lauro-de-freitas` | Lauro de Freitas |
| `/api-recife` | Recife |
| `/api-manaus` | Manaus |
| `/api-belem` | Belém |
| `/api-goiania` | Goiânia |

A documentação interativa das rotas pode ser acessada pelo Swagger UI do FastAPI, normalmente disponível em `/docs` quando a aplicação está em execução.

##Desenvolvimento do Projeto

O projeto foi desenvolvido em colaboração, com divisão de responsabilidades entre os integrantes.

### Back-end — Minha contribuição

- Desenvolvimento da API utilizando Python e FastAPI.
- Criação e organização das rotas.
- Definição da arquitetura do back-end.
- Modelagem e estruturação do banco de dados.
- Integração com o Supabase.
- Utilização do SQLAlchemy para interação com os dados.

### Front-end — Contribuição do colaborador

- Desenvolvimento da interface com HTML e CSS.
- Implementação da interatividade com JavaScript.
- Consumo das rotas da API.
- Exibição dos endereços e das informações retornadas pelo back-end.

## Aprendizados

O desenvolvimento deste projeto proporcionou experiência prática com:

- Construção de APIs utilizando FastAPI.
- Organização de rotas e responsabilidades no back-end.
- Modelagem de banco de dados relacional.
- Integração entre aplicação e banco de dados.
- Separação entre front-end e back-end.
- Desenvolvimento colaborativo de uma aplicação voltada a uma necessidade real.

## Status do Projeto

Projeto desenvolvido para apoiar as atividades internas do setor, com foco na consulta e organização dos endereços das unidades.

---

** Projeto colaborativo — Intranet NB**

Desenvolvido com Python, FastAPI, SQLAlchemy, Supabase, HTML, CSS e JavaScript.
