# Fake Store Dashboard

## Descrição

O Fake Store Dashboard é um painel de administração que permite a gestão de produtos, pedidos, categorias e usuários. Foi desenvolvido com Vue.js e Vuex, utilizando Bootstrap para estilização. Este projeto é ideal para aprendizado e prática de desenvolvimento de front-end com foco em gerenciamento de estados e estilização responsiva.

## Funcionalidades Principais

- **Visão Geral dos Indicadores**:
  - Exibição do total de produtos, número de categorias, quantidade de pedidos e número total de usuários.

- **Gestão de Produtos**:
  - Exibição de todos os produtos em uma tabela com as colunas: Nome, Categoria, Preço, Classificação.
  - Filtros por categoria e ordenação por preço ou classificação.
  - Modal para visualização dos detalhes de um produto, permitindo a edição ou exclusão.
  - Adição de novos produtos à loja.

- **Gerenciamento de Pedidos**:
  - Tabela de pedidos incluindo informações como ID do pedido, data, valor total e status.
  - Visualização dos detalhes do pedido, com a lista de produtos e suas quantidades.
  - Permissão para edição e atualização de pedidos.

- **Gerenciamento de Usuários**:
  - Exibição de uma tabela com usuários registrados, incluindo nome, e-mail e cidade.
  - Função de pesquisa para encontrar usuários específicos.
  - Adição de novos usuários e edição ou remoção de usuários existentes.

- **Autenticação**:
  - Tela de login para acesso ao painel, utilizando o endpoint da API `/auth/login`.
  - Exibição de mensagem de erro se o login for inválido.

## Instruções de Execução

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (versão 6 ou superior)

### Passos para Execução

1. **Clonar o Repositório**:
   ```sh
   git clone https://github.com/seu-usuario/fake-store-dashboard.git
   cd fake-store-dashboard
