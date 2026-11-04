
# Pesquisa — Atividade 03: Desempenho

## Rabisco Performance Lab

**Autora:** Taís Barbosa dos Santos  
**Projeto:** Rabisco Performance Lab  
**Tecnologias:** React Native, React, Expo e TypeScript  
**Tema:** Otimização de listas e renderização de componentes

---

## 1. Introdução

O desempenho é um aspecto fundamental no desenvolvimento de aplicações móveis, pois influencia diretamente a experiência do usuário, a fluidez da navegação e a utilização dos recursos do dispositivo.

Em aplicações desenvolvidas com React Native, a maneira como listas e componentes são renderizados pode afetar o desempenho, especialmente quando há muitos elementos na interface ou atualizações frequentes de estado.

Esta pesquisa aborda duas estratégias de otimização: a utilização de FlatList em comparação com ScrollView e a utilização de React.memo para reduzir renderizações desnecessárias.

Para demonstrar esses conceitos, foi desenvolvida uma Prova de Conceito (POC) denominada Rabisco Performance Lab, utilizando um catálogo fictício de roupas infantis.

## 2. Problema de pesquisa

Como a escolha dos componentes de listagem e a utilização de técnicas de memorização podem contribuir para melhorar o desempenho de aplicações desenvolvidas com React Native?

## 3. Objetivos

### 3.1. Objetivo geral

Investigar e demonstrar técnicas de otimização de desempenho em React Native por meio de uma aplicação experimental.

### 3.2. Objetivos específicos

- Compreender o funcionamento de ScrollView e FlatList.
- Comparar a utilização dessas estratégias em listas de diferentes tamanhos.
- Investigar o funcionamento de React.memo.
- Demonstrar o efeito das atualizações de estado sobre a renderização de componentes.
- Identificar situações nas quais a otimização pode ser vantajosa.

## 4. Fundamentação teórica

### 4.1. Desempenho em React Native

React Native é uma tecnologia que permite desenvolver aplicações para dispositivos móveis utilizando React e JavaScript ou TypeScript.

O desempenho de uma aplicação depende de fatores como quantidade de componentes, frequência de atualizações, complexidade da interface e gerenciamento de recursos.

Quando muitos elementos são processados simultaneamente, podem ocorrer atrasos na resposta aos comandos e perda de fluidez.

Por isso, é importante selecionar estruturas adequadas e evitar operações desnecessárias.

### 4.2. ScrollView

ScrollView é um componente utilizado para apresentar conteúdos com rolagem.

Sua principal característica é renderizar os elementos filhos da estrutura, mesmo quando parte deles está fora da área visível.

Essa abordagem é adequada para conteúdos relativamente pequenos, mas pode ser menos eficiente quando utilizada com grandes quantidades de elementos.

Em uma lista extensa, o processamento inicial e a quantidade de componentes montados podem aumentar o consumo de recursos.

### 4.3. FlatList

FlatList é um componente do React Native desenvolvido para apresentar listas de dados de maneira eficiente.

Diferentemente de uma ScrollView que contém todos os elementos, FlatList utiliza virtualização e renderização em lotes.

Isso permite limitar a quantidade de itens mantidos na interface e trabalhar com conjuntos maiores de dados.

Entre suas propriedades estão:

- data: conjunto de informações utilizado na lista.
- renderItem: função responsável pela apresentação de cada item.
- keyExtractor: identificação única dos elementos.
- initialNumToRender: quantidade inicial de itens renderizados.
- maxToRenderPerBatch: quantidade máxima de itens processados por lote.
- windowSize: configuração da janela de renderização.

Essas propriedades podem ser ajustadas conforme as características da aplicação.

### 4.4. Comparação entre ScrollView e FlatList

| Característica | ScrollView | FlatList |
|---|---|---|
| Indicação principal | Conteúdos menores | Listas extensas |
| Renderização | Elementos filhos de uma vez | Virtualização e lotes |
| Gerenciamento de itens | Sem virtualização de lista | Janela de itens |
| Uso em catálogos grandes | Pode ser menos eficiente | Geralmente mais adequado |
| Configurações específicas de lista | Limitadas | Diversas |

FlatList não garante desempenho superior em todas as situações. Para conteúdos pequenos e estáticos, ScrollView pode ser uma solução simples e suficiente.

### 4.5. Renderização de componentes

No React, componentes são unidades reutilizáveis responsáveis por definir partes da interface.

Quando um estado é atualizado, o React pode executar novamente a função do componente que utiliza esse estado.

Durante esse processo, componentes filhos também podem ser executados, mesmo quando suas informações não foram modificadas.

Em interfaces com muitos elementos, essas execuções podem representar trabalho desnecessário.

### 4.6. React.memo

React.memo é um recurso do React utilizado para memorizar componentes.

Ele permite que o React evite novas renderizações quando as propriedades recebidas pelo componente permanecem iguais.

Por exemplo, se um contador localizado no componente pai for atualizado, mas os dados de um card de produto permanecerem inalterados, React.memo pode impedir a execução desnecessária desse card.

Entretanto, React.memo não impede todas as renderizações. Alterações nas propriedades, no estado interno ou em contextos utilizados pelo componente podem provocar novas atualizações.

Também é importante considerar que a memorização possui custos próprios e deve ser aplicada quando houver benefício.

### 4.7. useMemo e useCallback

O React também disponibiliza recursos complementares de otimização.

**useMemo** permite reutilizar o resultado de um cálculo enquanto suas dependências permanecem iguais.

Na POC, ele é utilizado para gerar e manter conjuntos de produtos sem recriá-los desnecessariamente.

**useCallback** permite manter uma referência estável para uma função enquanto suas dependências não mudam.

Na demonstração com FlatList, ele é utilizado para estabilizar a função responsável pela apresentação dos itens.

Esses recursos não devem ser utilizados indiscriminadamente. Sua aplicação depende das necessidades e características de cada componente.

## 5. Desenvolvimento da POC

### 5.1. Apresentação

A Rabisco Performance Lab é uma aplicação experimental desenvolvida com React Native, Expo e TypeScript.

O projeto utiliza a identidade visual da Rabisco, uma loja fictícia de roupas infantis, para demonstrar técnicas de otimização.

A POC foi desenvolvida separadamente do aplicativo principal, conforme a proposta da atividade.

### 5.2. Experimento 1 — ScrollView vs FlatList

O primeiro experimento permite escolher entre três quantidades de produtos:

- 100 produtos.
- 500 produtos.
- 1.000 produtos.

O usuário também pode selecionar a estratégia utilizada para apresentar o catálogo: ScrollView ou FlatList.

Os produtos demonstrativos possuem nome, preço, identificação e representação visual por ícones.

O objetivo é observar o comportamento da interface durante a apresentação e a rolagem de listas com diferentes quantidades de elementos.

#### Hipótese

Espera-se que FlatList apresente vantagens em listas extensas, pois utiliza virtualização e evita manter todos os elementos montados simultaneamente.

#### Limitações

A aplicação não registra automaticamente o tempo de carregamento, a taxa de quadros por segundo ou o consumo de memória.

Portanto, a demonstração permite uma comparação funcional e visual, mas não fornece dados suficientes para determinar ganhos quantitativos de desempenho.

### 5.3. Experimento 2 — React.memo

O segundo experimento apresenta 20 cards de produtos e um contador interativo.

Existem dois modos de funcionamento:

**Sem otimização:** os cards são apresentados por componentes comuns, que podem ser executados novamente quando o componente pai atualiza seu estado.

**Com React.memo:** os cards são apresentados por componentes memorizados, permitindo reutilizar a renderização anterior quando suas propriedades permanecem iguais.

O usuário pode incrementar o contador e comparar os indicadores exibidos na interface.

#### Hipótese

Espera-se que o modo com React.memo evite execuções adicionais dos cards cujas propriedades permanecem inalteradas.

## 6. Análise dos resultados

### 6.1. Comparação de listas

Durante a verificação funcional da POC no navegador, foi possível confirmar a abertura da aba Listas e a seleção de diferentes quantidades de produtos, incluindo 100 e 500 elementos.

A implementação permite também selecionar 1.000 produtos e alternar entre ScrollView e FlatList.

Do ponto de vista teórico, FlatList é mais adequada para listas extensas devido à virtualização.

Entretanto, não foram coletadas métricas quantitativas que permitam afirmar uma redução específica no tempo de renderização ou no consumo de memória.

### 6.2. Comparação de renderização

A aba Renderização foi testada com o modo React.memo ativado.

O contador foi incrementado e o indicador de renderizações esperadas permaneceu em 20, comportamento compatível com a hipótese do experimento.

Para uma execução idealizada, considerando 20 cards e uma renderização inicial por card, temos:

| Incrementos | Sem otimização | Com React.memo |
|---|---:|---:|
| 0 | 20 | 20 |
| 1 | 40 | 20 |
| 3 | 80 | 20 |
| 6 | 140 | 20 |

Esses valores representam o modelo esperado do experimento e não uma medição independente de desempenho.

A quantidade efetiva de execuções pode variar conforme o ambiente e o comportamento do React durante o desenvolvimento.

### 6.3. Discussão

Os experimentos demonstram que diferentes estratégias podem reduzir trabalho desnecessário na construção de interfaces.

FlatList é especialmente relevante em catálogos e listagens extensas.

React.memo pode ser útil quando componentes recebem propriedades estáveis, mas seus componentes pais passam por atualizações frequentes.

Apesar dessas vantagens, a aplicação indiscriminada de técnicas de otimização não garante melhor desempenho.

A avaliação de resultados reais exige ferramentas de profiling e testes realizados em condições controladas, preferencialmente em dispositivos físicos e versões de produção.

## 7. Considerações finais

A pesquisa permitiu compreender duas abordagens importantes para otimização de desempenho em React Native: virtualização de listas e memorização de componentes.

A POC Rabisco Performance Lab demonstrou, de forma interativa, como ScrollView e FlatList apresentam estratégias diferentes de gerenciamento de elementos e como React.memo pode evitar renderizações desnecessárias.

Os resultados observados são compatíveis com os conceitos estudados, embora não constituam um benchmark quantitativo.

Conclui-se que a escolha adequada dos componentes e o controle de renderizações são práticas relevantes para o desenvolvimento de aplicações mais eficientes.

## 8. Referências

META PLATFORMS. **FlatList**. React Native Documentation. Disponível em: https://reactnative.dev/docs/flatlist. Acesso em: 4 nov. 2026.

META PLATFORMS. **ScrollView**. React Native Documentation. Disponível em: https://reactnative.dev/docs/scrollview. Acesso em: 4 nov. 2026.

META PLATFORMS. **Optimizing FlatList Configuration**. React Native Documentation. Disponível em: https://reactnative.dev/docs/optimizing-flatlist-configuration. Acesso em: 4 nov. 2026.

META PLATFORMS. **memo**. React Documentation. Disponível em: https://react.dev/reference/react/memo. Acesso em: 4 nov. 2026.

META PLATFORMS. **useMemo**. React Documentation. Disponível em: https://react.dev/reference/react/useMemo. Acesso em: 4 nov. 2026.

META PLATFORMS. **useCallback**. React Documentation. Disponível em: https://react.dev/reference/react/useCallback. Acesso em: 4 nov. 2026.
