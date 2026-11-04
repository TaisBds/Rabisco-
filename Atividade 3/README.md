
# Rabisco Performance Lab

## Atividade 03 — Desempenho

Projeto acadêmico desenvolvido como Prova de Conceito (POC) para demonstrar técnicas de otimização de desempenho em aplicações React Native.

A aplicação utiliza a identidade visual da Rabisco, uma loja fictícia de roupas infantis, para apresentar experimentos práticos sobre renderização de listas e componentes.

## 1. Objetivo

Investigar e demonstrar o comportamento de diferentes estratégias de renderização em React Native, considerando:

- A utilização de ScrollView e FlatList para exibição de listas.
- O impacto da quantidade de elementos renderizados.
- A utilização de React.memo para evitar renderizações desnecessárias.
- A importância da otimização de interfaces em aplicações móveis.

A POC foi desenvolvida em um projeto independente, sem modificar o aplicativo original da Rabisco.

## 2. Tecnologias utilizadas

- React Native
- React
- Expo
- TypeScript
- JavaScript
- @expo/vector-icons

## 3. Funcionalidades

### 3.1. Otimização de listas

A primeira demonstração permite comparar duas estratégias de exibição de produtos:

**ScrollView**

Renderiza os componentes filhos da lista de uma só vez, sendo mais indicada para conteúdos menores.

**FlatList**

Utiliza mecanismos de virtualização e renderização em lotes, permitindo trabalhar de maneira mais eficiente com listas extensas.

O usuário pode selecionar:

- 100 produtos.
- 500 produtos.
- 1.000 produtos.

A interface apresenta um catálogo demonstrativo de roupas infantis para observar o comportamento das duas estratégias.

### 3.2. Otimização de renderização

A segunda demonstração apresenta 20 cards de produtos e permite comparar dois modos:

**Sem otimização**

Os componentes são executados novamente quando o estado do contador é atualizado.

**Com React.memo**

Os componentes são memorizados pelo React, permitindo evitar novas renderizações quando suas propriedades permanecem iguais.

O usuário pode incrementar um contador e observar:

- A quantidade de produtos.
- O valor atual do contador.
- O número esperado de renderizações.
- A contagem de execuções exibida nos cards.

Os indicadores têm finalidade didática. Não representam medições diretas de tempo de execução ou consumo de memória.

## 4. Estrutura do projeto

```text
Rabisco-Performance/
├── assets/
│   └── logo-rabisco.png.png
├── App.tsx
├── index.ts
├── app.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── .gitignore
├── README.md
└── PESQUISA.md
```

A pasta node_modules é gerada durante a instalação das dependências e não deve ser incluída no arquivo ZIP da entrega.

## 5. Requisitos para execução

Para executar o projeto, é necessário possuir:

- Node.js instalado.
- npm.
- Editor de código, preferencialmente Visual Studio Code.
- Navegador atualizado para execução na Web.
- Expo Go, caso deseje testar em um dispositivo móvel compatível.

## 6. Instalação

Abra o terminal na pasta raiz do projeto e execute:

```bash
npm install
```

Esse comando instala as dependências declaradas no arquivo package.json.

## 7. Execução

Para iniciar o projeto:

```bash
npx expo start
```

No terminal do Expo, pressione:

```text
w
```

para abrir a aplicação no navegador.

No Windows PowerShell, caso exista uma restrição de execução de scripts, utilize:

```powershell
npm.cmd install
npx.cmd expo start -c
```

O parâmetro -c limpa o cache de desenvolvimento do Expo.

## 8. Como realizar os experimentos

### Experimento 1 — ScrollView vs FlatList

1. Acesse a aba Listas.
2. Selecione 100 produtos.
3. Escolha ScrollView e observe a rolagem.
4. Escolha FlatList e observe a rolagem.
5. Repita a comparação com 500 e 1.000 produtos.
6. Analise o comportamento das duas implementações.

### Experimento 2 — React.memo

1. Acesse a aba Renderização.
2. Selecione Sem otimização.
3. Clique no botão Incrementar contador.
4. Observe o número esperado de renderizações.
5. Selecione Com React.memo.
6. Repita os incrementos.
7. Compare o comportamento dos cards nos dois modos.

## 9. Resultados esperados

Na comparação de listas, espera-se que a FlatList apresente vantagens de gerenciamento de elementos em conjuntos grandes, devido à virtualização.

Na comparação de renderização, espera-se que React.memo reduza execuções desnecessárias dos cards cujas propriedades não foram alteradas.

Os resultados dependem do ambiente, da configuração do React e do dispositivo utilizado.

A POC não realiza benchmarks automatizados de FPS, memória ou tempo de renderização.

## 10. Pesquisa

A fundamentação teórica, a descrição dos experimentos, as análises e as referências bibliográficas estão documentadas no arquivo PESQUISA.md.

## 11. Considerações finais

A Rabisco Performance Lab demonstra conceitos importantes de otimização de desempenho em React Native por meio de experimentos interativos.

O projeto evidencia a importância da escolha adequada de componentes para listas e do controle de renderizações desnecessárias.

A utilização de uma POC independente permite explorar essas técnicas sem comprometer as funcionalidades do aplicativo principal.

## 12. Autoria

Taís Barbosa dos Santos

Projeto acadêmico — Atividade 03: Desempenho.
