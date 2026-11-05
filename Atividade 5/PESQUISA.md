
# ATIVIDADE 05 — SEGURANÇA

## Pesquisa e Prova de Conceito (POC)

**Projeto:** Rabisco Security Lab  
**Tecnologias:** React Native, Expo e TypeScript  
**Tópicos:** Autenticação e controle de acesso; armazenamento seguro de dados  
**Tipo de atividade:** Individual

---

## 1. Introdução

A segurança da informação é um aspecto fundamental no desenvolvimento de aplicações móveis, principalmente quando os sistemas permitem autenticação de usuários e manipulação de informações privadas.

Aplicativos de comércio eletrônico, por exemplo, podem armazenar informações de perfil, endereços, dados de pedidos e identificadores de sessão. Caso essas informações não sejam protegidas adequadamente, podem ocorrer acessos indevidos e exposição de dados.

Nesse contexto, a autenticação, o controle de acesso e o armazenamento seguro são mecanismos importantes para reduzir riscos.

Esta pesquisa apresenta os fundamentos desses mecanismos e sua demonstração prática por meio de uma Prova de Conceito (POC) denominada Rabisco Security Lab, desenvolvida com React Native, Expo e TypeScript.

## 2. Problema abordado

Aplicações móveis frequentemente precisam identificar usuários, restringir funcionalidades e armazenar informações relacionadas às sessões de acesso.

Quando esses mecanismos são implementados inadequadamente, podem surgir vulnerabilidades, como exposição de informações sensíveis, armazenamento inseguro de credenciais e acesso não autorizado a recursos.

O problema investigado nesta atividade é:

**Como demonstrar os conceitos de autenticação, controle de acesso e armazenamento seguro de informações em uma aplicação React Native?**

## 3. Objetivos

### 3.1 Objetivo geral

Desenvolver uma Prova de Conceito em React Native para demonstrar mecanismos básicos de autenticação, controle de acesso e armazenamento seguro de sessões.

### 3.2 Objetivos específicos

- Pesquisar os conceitos fundamentais de segurança em aplicações móveis.
- Compreender as diferenças entre autenticação e autorização.
- Implementar uma interface demonstrativa de login.
- Validar o preenchimento dos campos de autenticação.
- Restringir a exibição de conteúdos conforme o estado da sessão.
- Demonstrar o armazenamento de um identificador de sessão utilizando Expo SecureStore.
- Comparar o comportamento do armazenamento no ambiente Web e em dispositivos móveis.
- Identificar limitações e boas práticas de segurança para aplicações reais.

## 4. Fundamentação teórica

### 4.1 Segurança em aplicações móveis

A segurança em aplicações móveis envolve práticas e mecanismos destinados a proteger informações, funcionalidades e comunicações contra acessos e modificações não autorizados.

Entre os princípios fundamentais da segurança da informação estão:

- **Confidencialidade:** impedir a divulgação não autorizada de informações.
- **Integridade:** preservar a correção e a consistência dos dados.
- **Disponibilidade:** manter os recursos acessíveis quando necessários.

O desenvolvimento seguro deve considerar tanto a interface do aplicativo quanto os serviços de backend, os mecanismos de autenticação, a comunicação de rede e o armazenamento local.

### 4.2 Autenticação

A autenticação é o processo utilizado para verificar a identidade de um usuário ou sistema.

Um exemplo comum é o login por e-mail e senha.

Entretanto, a simples comparação de credenciais dentro do código de um aplicativo não representa uma autenticação segura para produção, pois o código executado no dispositivo não deve ser considerado um ambiente confiável.

Em aplicações reais, a verificação das credenciais normalmente deve ocorrer em um servidor confiável, utilizando comunicação protegida e mecanismos adequados de gerenciamento de sessões.

Na POC desenvolvida, a autenticação é simulada localmente com credenciais fictícias, exclusivamente para demonstrar o funcionamento da interface.

### 4.3 Autorização e controle de acesso

Autenticação e autorização são conceitos relacionados, mas possuem finalidades diferentes.

A autenticação verifica quem está tentando acessar o sistema.

A autorização determina quais recursos e operações esse usuário pode acessar.

Por exemplo, em uma loja virtual, um cliente autenticado pode consultar seus pedidos, enquanto determinadas operações administrativas devem ser permitidas apenas a usuários com privilégios específicos.

Na POC, o controle de acesso é representado por uma área restrita que só é exibida quando existe uma sessão demonstrativa ativa.

Essa restrição é aplicada à interface. Em um sistema real, a autorização também precisa ser verificada pelo backend, independentemente do que é exibido no aplicativo.

### 4.4 Gerenciamento de sessões

Uma sessão representa o estado de acesso de um usuário após a autenticação.

Aplicações podem utilizar tokens ou outros mecanismos para representar sessões autenticadas.

Em sistemas reais, os identificadores de sessão devem ser protegidos contra exposição e uso indevido.

Também devem ser considerados mecanismos de expiração, revogação e validação no servidor.

Na POC Rabisco Security Lab, é criado um identificador fictício associado a um e-mail e à data de início da sessão.

Esse identificador não é emitido nem validado por um backend. Portanto, sua existência não comprova a identidade de um usuário real.

### 4.5 Armazenamento seguro de dados

O armazenamento local permite que informações sejam mantidas no dispositivo entre execuções da aplicação.

Entretanto, dados sensíveis não devem ser armazenados indiscriminadamente em mecanismos de armazenamento comuns, especialmente quando podem ser acessados por processos ou ferramentas não autorizados.

No ecossistema Expo, a biblioteca `expo-secure-store` disponibiliza uma interface para armazenar pequenos valores utilizando mecanismos de proteção oferecidos pelas plataformas móveis.

No Android, a implementação utiliza recursos associados ao Android Keystore para proteger os dados armazenados.

No iOS, utiliza recursos do Keychain.

Esses mecanismos oferecem proteção adicional em comparação com o armazenamento local comum, mas não eliminam todos os riscos de segurança.

O SecureStore não substitui autenticação, autorização, comunicação segura ou validação de tokens pelo servidor.

### 4.6 Diferenças entre Android, iOS e Web

O Expo permite desenvolver aplicações para diferentes plataformas utilizando uma base de código compartilhada.

Entretanto, nem todos os recursos de segurança estão disponíveis de maneira equivalente em cada ambiente.

O Expo SecureStore é destinado ao armazenamento protegido em dispositivos Android e iOS.

No navegador, não existe uma implementação equivalente do SecureStore para essa POC.

Por esse motivo, a versão Web do Rabisco Security Lab mantém os dados de sessão apenas na memória da aplicação.

Ao atualizar a página, a sessão demonstrativa é perdida.

Já em Android e iOS, a aplicação pode recuperar informações previamente armazenadas, respeitando as características e limitações de cada plataforma.

### 4.7 Validação de entradas

A validação de entradas verifica se as informações fornecidas pelo usuário atendem às condições esperadas.

No formulário de login, por exemplo, é possível verificar se os campos obrigatórios foram preenchidos.

Na POC, também é apresentada uma mensagem quando as credenciais fictícias informadas não correspondem aos valores esperados.

Essas verificações melhoram a interação e demonstram tratamento de erros, mas não substituem validações de segurança no servidor.

### 4.8 Boas práticas de segurança

De acordo com as recomendações gerais de segurança para aplicações móveis, algumas práticas importantes incluem:

- Utilizar HTTPS para comunicações com servidores.
- Evitar incluir segredos reais no código do aplicativo.
- Realizar autenticação e autorização no backend.
- Armazenar senhas no servidor utilizando algoritmos adequados para hash de senhas.
- Proteger tokens e identificadores de sessão.
- Implementar expiração e revogação de sessões.
- Limitar tentativas de autenticação no servidor.
- Validar entradas e operações sensíveis.
- Aplicar o princípio do menor privilégio.
- Evitar a exposição de dados sensíveis em mensagens e registros.

## 5. Metodologia

A atividade foi desenvolvida por meio de pesquisa teórica e implementação de uma Prova de Conceito.

As etapas de desenvolvimento foram:

1. Criação de um projeto independente utilizando React Native, Expo e TypeScript.
2. Instalação das bibliotecas necessárias.
3. Desenvolvimento de uma interface de autenticação.
4. Implementação de validações de campos e credenciais fictícias.
5. Criação de um estado de sessão.
6. Implementação do controle de exibição da área restrita.
7. Integração com Expo SecureStore para plataformas móveis.
8. Implementação do encerramento de sessão.
9. Criação de indicadores de monitoramento.
10. Execução da aplicação no navegador para demonstração das funcionalidades.

O projeto recebeu o nome Rabisco Security Lab, mantendo a identidade visual do aplicativo Rabisco.

## 6. Desenvolvimento da POC

### 6.1 Estrutura do projeto

O principal arquivo da aplicação é `App.tsx`, responsável pela interface, pelo estado de autenticação e pelas interações demonstrativas.

O arquivo `package.json` registra as dependências do projeto.

O arquivo `app.json` contém as configurações da aplicação Expo.

A biblioteca Expo SecureStore é utilizada para demonstrar o armazenamento de informações de sessão nas plataformas móveis compatíveis.

### 6.2 Tela de autenticação

A tela de autenticação apresenta campos de e-mail e senha.

O usuário pode mostrar ou ocultar a senha digitada.

Caso algum campo esteja vazio, a aplicação apresenta uma mensagem solicitando o preenchimento.

Caso as credenciais sejam incorretas, a tentativa é recusada e o contador de tentativas inválidas é incrementado.

As credenciais utilizadas são fictícias e estão definidas localmente no código.

### 6.3 Área restrita

A área restrita demonstra a diferença entre os estados autenticado e não autenticado.

Quando não existe sessão ativa, o painel apresenta a informação de conteúdo bloqueado.

Após o login demonstrativo, a interface passa a exibir o conteúdo protegido.

Ao encerrar a sessão, o acesso é novamente bloqueado.

### 6.4 Armazenamento da sessão

Quando o usuário realiza o login, a aplicação cria um objeto contendo:

- E-mail demonstrativo.
- Data e horário de criação da sessão.
- Identificador fictício da sessão.

No Android e iOS, esses dados são enviados ao Expo SecureStore.

No ambiente Web, o objeto permanece somente no estado em memória.

A senha digitada não é incluída no objeto armazenado.

### 6.5 Encerramento de sessão

O botão de encerramento remove a sessão demonstrativa do estado da aplicação.

Nas plataformas móveis, também solicita a exclusão do valor armazenado no SecureStore.

Após o encerramento, a área restrita deixa de ser exibida.

### 6.6 Monitoramento

O painel apresenta informações sobre:

- Estado da autenticação.
- Estado da área restrita.
- Plataforma utilizada.
- Quantidade de tentativas inválidas.
- Tipo de armazenamento da sessão.

Essas informações facilitam a observação dos comportamentos demonstrados.

## 7. Cenários de demonstração

Foram definidos os seguintes cenários de verificação manual:

| Nº | Cenário | Comportamento esperado |
|---|---|---|
| 1 | Aplicação sem login | Área restrita bloqueada |
| 2 | Campos vazios | Mensagem de preenchimento obrigatório |
| 3 | Credenciais inválidas | Acesso recusado |
| 4 | Credenciais demonstrativas válidas | Sessão criada e área liberada |
| 5 | Encerramento da sessão | Área novamente bloqueada |
| 6 | Reinício no Android/iOS | Tentativa de recuperação da sessão armazenada |
| 7 | Atualização da página Web | Sessão em memória descartada |

Esses cenários constituem um roteiro de testes manuais e não uma suíte de testes automatizados.

## 8. Resultados observados

A aplicação foi executada no navegador por meio do Expo Web.

Na demonstração visual realizada, foram observados os seguintes resultados:

- A interface do Rabisco Security Lab foi carregada.
- O estado de autenticação foi apresentado como ativo.
- O usuário demonstrativo foi identificado na interface.
- A data e o horário de início da sessão foram exibidos.
- A área restrita foi apresentada como liberada.
- O conteúdo protegido foi exibido após o login.
- O botão de encerramento de sessão estava disponível.
- O painel identificou o ambiente de execução como Web.

Essas observações confirmam o funcionamento visual do estado autenticado na versão Web.

Os demais cenários previstos no roteiro, incluindo a recuperação da sessão no Android/iOS, dependem de execução e verificação específicas.

Não foram realizados testes de invasão, auditoria de segurança ou validação de proteção contra ataques reais.

## 9. Análise dos resultados

A POC demonstrou a relação entre o estado de autenticação e a disponibilidade de funcionalidades protegidas na interface.

A liberação da área restrita após o login evidenciou o funcionamento do controle de acesso demonstrativo.

O projeto também apresentou uma abordagem de armazenamento de sessão que considera as diferenças entre o ambiente Web e as plataformas móveis.

Entretanto, a implementação utiliza credenciais locais e um identificador fictício, sem autenticação ou autorização realizada por servidor.

Consequentemente, os resultados não permitem afirmar que a aplicação oferece proteção adequada para dados reais ou ambientes de produção.

## 10. Limitações da POC

A implementação apresenta limitações intencionais devido ao seu objetivo acadêmico:

- Não existe backend de autenticação.
- As credenciais demonstrativas estão definidas no código.
- O identificador de sessão não é validado por servidor.
- Não existe mecanismo de expiração de sessão.
- Não há autorização por diferentes perfis de usuário.
- O contador de tentativas inválidas é apenas informativo.
- Não existe bloqueio efetivo de tentativas excessivas.
- A proteção da área restrita ocorre no estado da interface.
- Não foram realizados testes de segurança ofensiva.
- O armazenamento seguro em Android/iOS ainda requer verificação prática no dispositivo.

Essas limitações são importantes para diferenciar uma demonstração de conceitos de uma implementação segura para produção.

## 11. Conclusão

A Atividade 05 permitiu pesquisar e aplicar conceitos de autenticação, controle de acesso e armazenamento seguro de informações em uma aplicação React Native.

O desenvolvimento do Rabisco Security Lab demonstrou como o estado de uma sessão pode controlar a apresentação de conteúdos restritos e como a biblioteca Expo SecureStore pode ser integrada para armazenamento protegido em plataformas móveis compatíveis.

A demonstração realizada no navegador confirmou o funcionamento visual do estado autenticado e da área restrita liberada.

A pesquisa também evidenciou que mecanismos implementados apenas na interface não são suficientes para garantir segurança em aplicações reais.

Conclui-se que a proteção adequada de aplicações móveis exige a combinação de práticas de desenvolvimento seguro, autenticação e autorização no servidor, proteção de dados armazenados e gerenciamento apropriado de sessões.

## 12. Referências

EXPO. **SecureStore**. Documentação oficial. Disponível em: https://docs.expo.dev/versions/latest/sdk/securestore/. Acesso em: 5 nov. 2026.

EXPO. **Security guidelines**. Documentação oficial. Disponível em: https://docs.expo.dev/guides/security/. Acesso em: 5 nov. 2026.

OWASP. **Mobile Application Security**. Disponível em: https://mas.owasp.org/. Acesso em: 5 nov. 2026.

OWASP. **Mobile Application Security Verification Standard (MASVS)**. Disponível em: https://mas.owasp.org/MASVS/. Acesso em: 5 nov. 2026.

REACT NATIVE. **Security**. Documentação oficial. Disponível em: https://reactnative.dev/docs/security. Acesso em: 5 nov. 2026.
