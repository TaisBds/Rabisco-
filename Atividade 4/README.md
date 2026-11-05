
# Rabisco Testing Lab

## Atividade 04 — Testes

Prova de Conceito (POC) desenvolvida em React Native com Expo e TypeScript para demonstrar a aplicação de testes automatizados em uma loja de roupas infantis.

O projeto utiliza Jest para testes unitários e React Native Testing Library para testes de componentes.

## 1. Objetivo

Demonstrar como testes automatizados contribuem para a qualidade, confiabilidade e manutenção de aplicações móveis.

A POC aborda dois tópicos:

- Testes unitários de regras de negócio.
- Testes de componentes e interações do usuário.

## 2. Tecnologias utilizadas

- React Native
- Expo SDK 58
- TypeScript
- Jest
- jest-expo
- React Native Testing Library
- React Test Renderer
- Expo Vector Icons

## 3. Funcionalidades

A aplicação apresenta um laboratório interativo com:

- Catálogo de quatro produtos infantis.
- Adição e remoção de produtos.
- Atualização das quantidades.
- Cálculo automático do subtotal.
- Aplicação de descontos.
- Cálculo do valor total.
- Limpeza do carrinho.
- Painel explicativo dos testes automatizados.

## 4. Estrutura do projeto

```text
Rabisco_Atividade4/
├── assets/
├── src/
│   ├── components/
│   │   └── ProdutoCard.tsx
│   ├── services/
│   │   └── carrinho.ts
│   └── tests/
│       ├── carrinho.test.ts
│       └── ProdutoCard.test.tsx
├── App.tsx
├── app.json
├── index.ts
├── jest.config.js
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md
└── PESQUISA.md
```

## 5. Pré-requisitos

- Node.js e npm instalados.
- Visual Studio Code ou outro editor.
- Navegador para execução pelo Expo Web.
- Opcionalmente, Expo Go ou emulador compatível.

## 6. Instalação

Abra o terminal na raiz do projeto e execute:

```bash
npm install
```

## 7. Executar a aplicação

```bash
npx expo start
```

Para abrir a versão Web, pressione `w` no terminal do Expo.

No Windows PowerShell, caso exista bloqueio de execução de scripts, utilize:

```powershell
npx.cmd expo start
```

## 8. Executar os testes automatizados

Na raiz do projeto, execute:

```bash
npx jest --runInBand
```

No Windows PowerShell:

```powershell
npx.cmd jest --runInBand
```

Para executar sem utilizar o cache:

```powershell
npx.cmd jest --runInBand --no-cache
```

## 9. Testes implementados

### Testes unitários

Arquivo: `src/tests/carrinho.test.ts`

1. Cálculo correto do subtotal.
2. Aplicação de desconto de 10%.
3. Cálculo do total com desconto.
4. Retorno zero para carrinho vazio.
5. Validação de quantidade negativa.
6. Validação de preço negativo.
7. Validação de desconto superior a 100%.

### Testes de componentes

Arquivo: `src/tests/ProdutoCard.test.tsx`

1. Exibição do nome e preço.
2. Exibição da quantidade.
3. Acionamento do botão adicionar.
4. Acionamento do botão remover.

## 10. Resultados obtidos

Na execução realizada durante o desenvolvimento:

- Suítes de testes aprovadas: 2 de 2.
- Testes aprovados: 11 de 11.
- Testes reprovados: 0.
- Tempo registrado: 7,784 segundos.

Esses resultados correspondem à execução registrada durante o desenvolvimento e podem variar em novas execuções.

## 11. Considerações finais

A POC demonstrou a utilização de testes unitários para validar funções do carrinho e testes de componentes para verificar informações exibidas e interações com botões.

Os testes foram executados com sucesso utilizando Jest e React Native Testing Library.

O projeto possui finalidade acadêmica e foi desenvolvido para a Atividade 04 — Testes.
