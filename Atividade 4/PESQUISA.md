
# ATIVIDADE 04 — TESTES

## Pesquisa e Prova de Conceito (POC)

**Projeto:** Rabisco Testing Lab  
**Tecnologias:** React Native, Expo, TypeScript e Jest  
**Temas:** Testes unitários e testes de componentes

---

## 1. Introdução

Os testes de software são procedimentos utilizados para verificar se uma aplicação apresenta o comportamento esperado e para identificar possíveis defeitos durante seu desenvolvimento.

Em aplicações móveis, os testes automatizados são importantes porque permitem validar regras de negócio e interações com a interface, reduzindo a necessidade de repetir manualmente as mesmas verificações a cada alteração do código.

Esta pesquisa aborda dois tipos de testes: testes unitários e testes de componentes. Como demonstração prática, foi desenvolvida uma Prova de Conceito (POC) denominada Rabisco Testing Lab, utilizando React Native, Expo e TypeScript.

## 2. Problema abordado

Aplicações de comércio eletrônico precisam realizar cálculos financeiros e responder corretamente às interações dos usuários.

Erros no cálculo de preços, descontos e quantidades podem comprometer a confiabilidade da aplicação. Da mesma forma, componentes que não exibem informações corretamente ou não respondem aos botões podem prejudicar a experiência do usuário.

O problema investigado nesta atividade é:

**Como utilizar testes automatizados para verificar regras de negócio e interações de componentes em uma aplicação React Native?**

## 3. Objetivos

### 3.1 Objetivo geral

Demonstrar a aplicação de testes automatizados para verificar funcionalidades de uma aplicação React Native.

### 3.2 Objetivos específicos

- Pesquisar os fundamentos dos testes unitários e de componentes.
- Implementar funções para cálculo de valores de um carrinho.
- Validar cálculos e condições inválidas com Jest.
- Desenvolver um componente de produto reutilizável.
- Testar a renderização e as interações desse componente.
- Executar os testes e analisar os resultados.

## 4. Fundamentação teórica

### 4.1 Testes de software

Testes de software consistem na execução ou avaliação de um sistema ou de suas partes para verificar comportamentos e identificar defeitos.

A automação permite executar verificações de forma repetível, especialmente após alterações no código.

Entretanto, a aprovação de testes não garante a ausência de todos os defeitos. Os resultados demonstram apenas que os cenários implementados foram atendidos nas condições avaliadas.

### 4.2 Testes unitários

Testes unitários verificam pequenas unidades de código de maneira isolada, como funções responsáveis por cálculos ou validações.

Uma vantagem dessa abordagem é permitir a identificação de erros nas regras de negócio sem depender da interface gráfica.

Na POC Rabisco Testing Lab, os testes unitários foram aplicados às funções:

- `calcularSubtotal`
- `calcularDesconto`
- `calcularTotal`

Essas funções são utilizadas para calcular valores de um carrinho de compras.

### 4.3 Testes de componentes

Os testes de componentes verificam o comportamento de elementos da interface.

No React Native, esses testes podem avaliar se um componente apresenta textos corretamente e se determinados eventos acionam as funções esperadas.

Na POC, foi utilizado o componente `ProdutoCard`, responsável por apresentar o nome, o preço, a quantidade e os controles de adição e remoção de produtos.

### 4.4 Jest

Jest é uma ferramenta de testes para JavaScript e TypeScript.

Entre seus recursos estão:

- Organização de testes em suítes.
- Verificação de resultados com `expect`.
- Criação de funções simuladas com `jest.fn()`.
- Execução automatizada de casos de teste.
- Relatórios de testes aprovados e reprovados.

O projeto utiliza o preset `jest-expo`, destinado à configuração de testes em aplicações Expo.

### 4.5 React Native Testing Library

A React Native Testing Library é uma biblioteca voltada ao teste de componentes React Native.

Ela permite consultar elementos renderizados e simular interações, como o acionamento de botões.

Na POC, foram utilizados recursos como:

- `render`: renderização do componente no ambiente de testes.
- `screen.getByText`: consulta de textos exibidos.
- `screen.getByTestId`: consulta de elementos identificados.
- `fireEvent.press`: simulação do acionamento de um botão.

A utilização dessas ferramentas permite verificar comportamentos da interface sem depender da execução manual de cada interação.

## 5. Metodologia

A atividade foi desenvolvida por meio de pesquisa bibliográfica e implementação prática de uma POC.

O desenvolvimento foi dividido nas seguintes etapas:

1. Criação de um novo projeto React Native com Expo e TypeScript.
2. Implementação das funções de cálculo do carrinho.
3. Criação dos testes unitários com Jest.
4. Desenvolvimento do componente `ProdutoCard`.
5. Implementação dos testes de componentes.
6. Configuração das dependências de teste.
7. Execução automatizada dos testes.
8. Desenvolvimento de uma interface demonstrativa.
9. Análise dos resultados.

Os testes foram executados localmente, por meio do terminal do Visual Studio Code.

## 6. Desenvolvimento da POC

### 6.1 Estrutura

Os principais arquivos são:

| Arquivo | Responsabilidade |
|---|---|
| `src/services/carrinho.ts` | Regras de negócio e cálculos |
| `src/tests/carrinho.test.ts` | Testes unitários |
| `src/components/ProdutoCard.tsx` | Componente visual do produto |
| `src/tests/ProdutoCard.test.tsx` | Testes de componentes |
| `App.tsx` | Interface demonstrativa |
| `jest.config.js` | Configuração do Jest |

### 6.2 Funcionalidades demonstradas

A aplicação permite visualizar quatro produtos infantis, adicionar e remover unidades, aplicar descontos e acompanhar os valores calculados.

A interface também apresenta os cenários cobertos pelos testes automatizados.

Os testes são executados no terminal; a interface não executa o Jest diretamente.

## 7. Testes unitários implementados

Foram implementados sete testes unitários.

| Nº | Cenário | Resultado |
|---|---|---|
| 1 | Calcular subtotal | Aprovado |
| 2 | Calcular desconto de 10% | Aprovado |
| 3 | Calcular total com desconto | Aprovado |
| 4 | Retornar zero para carrinho vazio | Aprovado |
| 5 | Impedir quantidade negativa | Aprovado |
| 6 | Impedir preço negativo | Aprovado |
| 7 | Impedir desconto superior a 100% | Aprovado |

Esses testes verificam cálculos e validações importantes para o funcionamento do carrinho.

## 8. Testes de componentes implementados

Foram implementados quatro testes para o componente `ProdutoCard`.

| Nº | Cenário | Resultado |
|---|---|---|
| 1 | Exibir nome e preço | Aprovado |
| 2 | Exibir quantidade informada | Aprovado |
| 3 | Executar função ao adicionar | Aprovado |
| 4 | Executar função ao remover | Aprovado |

As interações foram simuladas utilizando `fireEvent.press`, enquanto as funções de retorno foram verificadas com `jest.fn()` e `toHaveBeenCalledTimes()`.

## 9. Resultados obtidos

Após a configuração das dependências e execução dos testes, foi obtido o seguinte resultado:

```text
PASS src/tests/ProdutoCard.test.tsx
PASS src/tests/carrinho.test.ts

Test Suites: 2 passed, 2 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        7.784 s
```

A execução demonstrou a aprovação dos onze testes implementados.

### 9.1 Análise dos resultados

Os sete testes unitários confirmaram que as funções atenderam aos cenários de cálculo e validação estabelecidos.

Os quatro testes de componentes confirmaram que o `ProdutoCard` apresentou as informações esperadas e executou as funções associadas aos botões.

Durante o desenvolvimento, foram identificadas dificuldades de compatibilidade entre dependências utilizadas nos testes de componentes.

A configuração final validada utilizou:

- React 19.3.0.
- React Test Renderer 19.3.0.
- React Native Testing Library 13.3.3.
- Jest com preset `jest-expo`.

Após o ajuste das dependências, os testes foram executados com sucesso.

### 9.2 Limitações

A POC não contempla testes de integração com serviços externos, testes ponta a ponta ou testes de desempenho.

Também não foram realizados testes em múltiplos dispositivos físicos.

Os resultados apresentados correspondem aos cenários automatizados implementados e não representam garantia de ausência de defeitos em toda a aplicação.

## 10. Conclusão

A Atividade 04 demonstrou a aplicação prática de testes unitários e testes de componentes em React Native.

Os testes unitários permitiram verificar regras de negócio relacionadas ao cálculo de valores e à validação de entradas inválidas.

Os testes de componentes permitiram avaliar a apresentação de informações e a execução de ações da interface.

A aprovação dos onze testes demonstrou que os comportamentos avaliados atenderam às expectativas definidas.

Conclui-se que a utilização de testes automatizados contribui para a identificação de defeitos, a verificação de funcionalidades e a manutenção da qualidade de aplicações móveis.

## 11. Referências

EXPO. **Unit testing with Jest**. Documentação oficial. Disponível em: https://docs.expo.dev/develop/unit-testing/. Acesso em: 5 nov. 2026.

JEST. **Getting Started**. Documentação oficial. Disponível em: https://jestjs.io/docs/getting-started. Acesso em: 5 nov. 2026.

REACT NATIVE TESTING LIBRARY. **Documentation**. Disponível em: https://callstack.github.io/react-native-testing-library/. Acesso em: 5 nov. 2026.

REACT NATIVE. **Testing Overview**. Documentação oficial. Disponível em: https://reactnative.dev/docs/testing-overview. Acesso em: 5 nov. 2026.
