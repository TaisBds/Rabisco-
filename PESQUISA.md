# Pesquisa — Persistência de Dados em React Native

## 1. Introdução

A persistência de dados é um recurso fundamental no desenvolvimento de aplicativos móveis, pois permite armazenar informações e recuperá-las posteriormente, mesmo após o encerramento da aplicação.

No React Native, existem diferentes soluções para armazenamento local, como AsyncStorage e SQLite, além de alternativas baseadas em bancos de dados remotos.

Esta pesquisa apresenta o conceito de persistência, as principais alternativas disponíveis e a aplicação prática do AsyncStorage no projeto Rabisco.

## 2. O que é persistência de dados?

Persistência de dados é a capacidade de manter informações armazenadas além do tempo de execução de um programa.

Em aplicativos móveis, esse recurso permite preservar preferências, dados cadastrais, listas de favoritos, carrinhos de compras e outras informações importantes.

Sem persistência, dados mantidos apenas na memória podem ser perdidos quando o aplicativo é encerrado.

## 3. Formas de persistência em React Native

### 3.1 AsyncStorage

O AsyncStorage é uma biblioteca de armazenamento local, persistente e assíncrono, baseada em pares de chave e valor.

É indicado para informações relativamente simples, como configurações, preferências, favoritos e dados de aplicativos demonstrativos.

Entre seus principais métodos estão:

- `setItem()`: armazena um valor.
- `getItem()`: recupera um valor.
- `multiGet()`: recupera múltiplos valores.
- `removeItem()`: remove um valor.
- `clear()`: remove os dados armazenados pela biblioteca.

O AsyncStorage não é criptografado e não deve ser utilizado para armazenar senhas ou informações sensíveis sem proteção adequada.

### 3.2 SQLite

O SQLite é um banco de dados relacional que permite armazenar informações estruturadas localmente.

Ele oferece consultas SQL, tabelas e relacionamentos, sendo adequado para aplicações com maior complexidade de dados.

### 3.3 Bancos de dados remotos

Bancos de dados remotos permitem compartilhar informações entre dispositivos e usuários.

Normalmente são acessados por meio de APIs ou serviços de backend, exigindo conexão de rede para determinadas operações.

## 4. Comparação das tecnologias

| Tecnologia | Característica | Aplicação |
|---|---|---|
| AsyncStorage | Armazenamento local por chave e valor | Preferências, favoritos e carrinhos simples |
| SQLite | Banco relacional local | Dados estruturados e consultas complexas |
| Banco remoto | Armazenamento em servidor | Sincronização e compartilhamento de dados |

## 5. Persistência no projeto Rabisco

A Rabisco é um aplicativo de loja virtual infantil desenvolvido em React Native, Expo e TypeScript.

A biblioteca AsyncStorage foi utilizada para armazenar três conjuntos principais de informações.

### 5.1 Carrinho de compras

O carrinho armazena os identificadores dos produtos, os tamanhos selecionados e as respectivas quantidades.

Chave utilizada:

`@rabisco:carrinho`

### 5.2 Produtos favoritos

A lista de favoritos armazena os identificadores dos produtos selecionados pelo usuário.

Chave utilizada:

`@rabisco:favoritos`

### 5.3 Perfil

O perfil armazena dados informados pelo usuário, como nome, telefone, e-mail e endereço.

Chave utilizada:

`@rabisco:perfil`

Por se tratar de armazenamento local não criptografado, essa implementação é demonstrativa e não deve ser considerada uma solução de segurança para dados pessoais em produção.

## 6. Implementação do AsyncStorage

### 6.1 Instalação

A biblioteca pode ser instalada no projeto Expo por meio do comando:

```bash
npx expo install @react-native-async-storage/async-storage
```

### 6.2 Importação

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
```

### 6.3 Salvando dados

```tsx
await AsyncStorage.setItem(
  "@rabisco:favoritos",
  JSON.stringify(favoritos)
);
```

O método `JSON.stringify()` converte o array em uma string que pode ser armazenada.

### 6.4 Recuperando dados

```tsx
const dados = await AsyncStorage.getItem(
  "@rabisco:favoritos"
);

if (dados) {
  const favoritosSalvos = JSON.parse(dados);
  setFavoritos(favoritosSalvos);
}
```

O método `JSON.parse()` reconstrói o array a partir do valor armazenado.

### 6.5 Utilização do useEffect

No projeto Rabisco, o `useEffect` é utilizado para carregar os dados quando o aplicativo inicia e salvar alterações realizadas pelo usuário.

Esse mecanismo permite manter o estado da interface sincronizado com o armazenamento local.

## 7. Testes de persistência

Os testes devem verificar se os dados continuam disponíveis após a atualização ou reinicialização do aplicativo.

Procedimento:

1. Adicionar uma roupa ao carrinho, selecionando um tamanho.
2. Marcar um produto como favorito.
3. Preencher e salvar os dados do perfil.
4. Atualizar ou reiniciar o aplicativo.
5. Verificar se as informações foram recuperadas corretamente.

O comportamento esperado é que os produtos, os tamanhos, as quantidades, os favoritos e as informações do perfil permaneçam armazenados.

## 8. Vantagens e limitações

O AsyncStorage apresenta vantagens como facilidade de implementação, integração com React Native e funcionamento sem necessidade de servidor.

Entretanto, possui limitações relacionadas à ausência de criptografia, ao armazenamento baseado em chave e valor e à falta de recursos relacionais de consulta.

Por esse motivo, a escolha da tecnologia de persistência deve considerar a complexidade, o volume e a sensibilidade dos dados.

## 9. Conclusão

A implementação de persistência local na Rabisco demonstra como o AsyncStorage pode melhorar a experiência do usuário ao preservar informações entre sessões.

O armazenamento do carrinho, dos favoritos e do perfil permite aplicar, na prática, conceitos de estado, serialização JSON e operações assíncronas.

Assim, o projeto exemplifica a importância da persistência de dados no desenvolvimento de aplicativos com React Native.

## 10. Referências

REACT NATIVE ASYNC STORAGE. **Documentation**. Disponível em: https://react-native-async-storage.github.io/async-storage/. Acesso em: 4 nov. 2026.

EXPO. **AsyncStorage**. Disponível em: https://docs.expo.dev/versions/latest/sdk/async-storage/. Acesso em: 4 nov. 2026.

REACT. **useEffect**. Disponível em: https://react.dev/reference/react/useEffect. Acesso em: 4 nov. 2026.

SQLITE. **About SQLite**. Disponível em: https://www.sqlite.org/about.html. Acesso em: 4 nov. 2026.