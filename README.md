# Rabisco — Liberdade em cada traço

## 1. Sobre o projeto

A Rabisco é um aplicativo de loja virtual de roupas infantis, desenvolvido com React Native, Expo e TypeScript.

O projeto foi criado como parte da Atividade 02 — Persistência, com o objetivo de aplicar conceitos de armazenamento local de dados em aplicativos móveis.

A aplicação apresenta um catálogo de roupas infantis, permitindo selecionar tamanhos, adicionar produtos ao carrinho, marcar peças como favoritas e cadastrar informações pessoais.

## 2. Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- React Hooks
- AsyncStorage
- Expo Vector Icons

## 3. Funcionalidades

- Visualização de produtos infantis.
- Navegação por categorias.
- Pesquisa de produtos.
- Seleção de tamanhos de 1 a 14 anos.
- Adição e remoção de produtos do carrinho.
- Controle de quantidade dos produtos.
- Cálculo automático do valor total.
- Lista de produtos favoritos.
- Cadastro e edição de perfil.
- Armazenamento local de dados.
- Seleção demonstrativa de formas de pagamento: Pix, crédito, débito e boleto.
- Interface adaptável a diferentes tamanhos de tela.

## 4. Persistência de dados

A persistência é implementada por meio da biblioteca `@react-native-async-storage/async-storage`.

Os dados armazenados incluem:

| Chave | Informação |
|---|---|
| `@rabisco:carrinho` | Produtos, tamanhos e quantidades |
| `@rabisco:favoritos` | Identificadores dos produtos favoritos |
| `@rabisco:perfil` | Informações pessoais e endereço |

O aplicativo utiliza `AsyncStorage.setItem()` para armazenar informações e `AsyncStorage.multiGet()` para recuperar dados quando é iniciado.

Os dados são convertidos para JSON por meio de `JSON.stringify()` e `JSON.parse()`.

## 5. Estrutura do projeto

```text
Rabisco/
├── assets/
│   ├── logo-rabisco.png.png
│   └── banner-rabisco.png.png
├── App.tsx
├── app.json
├── index.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

## 6. Como executar

**Pré-requisitos:** Node.js e npm instalados.

**Passo 1:** Abra o projeto no VS Code.

**Passo 2:** Instale as dependências:

```bash
npm install
```

**Passo 3:** Inicie o Expo:

```bash
npx expo start -c
```

**Passo 4:** Pressione `w` para abrir a aplicação no navegador.

No Windows PowerShell, caso exista uma restrição de execução de scripts, utilize `npm.cmd` e `npx.cmd`.

## 7. Testes de persistência

Para verificar o armazenamento local:

1. Abra o aplicativo.
2. Selecione um produto e seu tamanho.
3. Adicione o produto ao carrinho.
4. Marque outro produto como favorito.
5. Acesse o perfil e salve informações de teste.
6. Atualize ou reinicie o aplicativo.
7. Confira se os dados continuam disponíveis.

O resultado esperado é que carrinho, favoritos e perfil sejam recuperados do armazenamento local.

## 8. Limitações

Este projeto é uma aplicação demonstrativa desenvolvida para fins acadêmicos.

As opções de pagamento não realizam transações financeiras reais. O catálogo utiliza imagens ilustrativas e não possui integração com controle de estoque ou processamento de pedidos.

## 9. Objetivo acadêmico

Demonstrar a utilização de persistência local em React Native, utilizando AsyncStorage para armazenar e recuperar informações entre sessões do aplicativo.

## 10. Identidade visual

**Nome:** Rabisco

**Slogan:** Liberdade em cada traço.

A identidade visual utiliza cores vibrantes, elementos lúdicos e referências à criatividade infantil.