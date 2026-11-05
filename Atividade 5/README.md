
# Rabisco Security Lab

## Atividade 05 — Segurança

Prova de Conceito (POC) desenvolvida em React Native com Expo e TypeScript para demonstrar conceitos de segurança em aplicações móveis.

O projeto faz parte da série de atividades acadêmicas do aplicativo Rabisco, uma loja de roupas infantis.

## 1. Objetivo

Demonstrar, por meio de uma aplicação interativa, o funcionamento de dois conceitos de segurança:

1. Autenticação e controle de acesso.
2. Armazenamento seguro de informações de sessão.

A aplicação utiliza um ambiente demonstrativo, com credenciais fictícias e sem integração com um servidor de autenticação.

## 2. Tecnologias utilizadas

- React Native
- Expo
- TypeScript
- React
- Expo SecureStore
- Expo Vector Icons
- React Native Web

## 3. Funcionalidades

### 3.1 Autenticação

A aplicação apresenta uma tela de login com:

- Campo de e-mail.
- Campo de senha.
- Opção de mostrar ou ocultar a senha.
- Validação de campos obrigatórios.
- Verificação de credenciais fictícias.
- Mensagem para tentativas inválidas.
- Contador de tentativas incorretas.

### 3.2 Controle de acesso

O sistema demonstra o controle de acesso por meio de uma área restrita.

Antes do login, o conteúdo protegido permanece bloqueado.

Após a autenticação demonstrativa, o conteúdo é liberado.

Ao encerrar a sessão, o conteúdo volta a ficar bloqueado.

### 3.3 Armazenamento seguro

Em dispositivos Android e iOS, a aplicação utiliza a biblioteca `expo-secure-store` para armazenar um identificador de sessão demonstrativo.

O projeto não armazena a senha do usuário no SecureStore.

No ambiente Web, a sessão permanece apenas na memória da aplicação, pois o SecureStore não oferece a mesma funcionalidade de armazenamento protegido no navegador.

### 3.4 Painel de monitoramento

O laboratório apresenta:

- Estado da autenticação.
- Estado da área protegida.
- Plataforma utilizada.
- Quantidade de tentativas inválidas.
- Tipo de armazenamento utilizado.
- Informações da sessão ativa.

### 3.5 Painel de conceitos

A aplicação também apresenta explicações sobre:

- Autenticação.
- Controle de acesso.
- Armazenamento seguro.
- Segurança no ambiente Web.
- Validação de entradas.
- Segurança em sistemas de produção.

## 4. Estrutura do projeto

```text
Rabisco-Seguranca/
├── assets/
├── App.tsx
├── app.json
├── index.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── README.md
└── PESQUISA.md
```

Outros arquivos de configuração podem estar presentes conforme a versão do Expo utilizada.

## 5. Pré-requisitos

Para executar o projeto, é necessário:

- Node.js instalado.
- npm disponível.
- Visual Studio Code ou outro editor.
- Navegador atualizado para executar a versão Web.
- Opcionalmente, dispositivo Android/iOS ou emulador para testar o SecureStore.

## 6. Instalação

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

Caso seja necessário instalar as dependências específicas:

```bash
npx expo install expo-secure-store @expo/vector-icons
```

Para executar no navegador:

```bash
npx expo install react-dom react-native-web
```

## 7. Executar a aplicação

Para iniciar o Expo:

```bash
npx expo start
```

Para iniciar diretamente no navegador:

```bash
npx expo start --web
```

No Windows PowerShell, também é possível utilizar:

```powershell
npx.cmd expo start --web
```

A aplicação será disponibilizada em um endereço local informado pelo Expo.

## 8. Credenciais demonstrativas

Utilize as seguintes credenciais para acessar o laboratório:

**E-mail:** admin@rabisco.com

**Senha:** Rabisco@123

Essas credenciais são fictícias, definidas no código exclusivamente para demonstração acadêmica.

Não devem ser utilizadas como modelo de autenticação para aplicações reais.

## 9. Roteiro de demonstração

### Teste 1 — Acesso não autenticado

1. Abra a aplicação.
2. Observe o estado da autenticação.
3. Verifique que a área restrita está bloqueada.

**Resultado esperado:** o conteúdo protegido não é exibido.

### Teste 2 — Campos obrigatórios

1. Deixe os campos de e-mail e senha vazios.
2. Clique em "Entrar no sistema".

**Resultado esperado:** a aplicação apresenta uma mensagem solicitando o preenchimento dos campos.

### Teste 3 — Credenciais incorretas

1. Informe um e-mail ou senha incorretos.
2. Tente realizar o login.

**Resultado esperado:** a autenticação é recusada, uma mensagem é exibida e o contador de tentativas inválidas aumenta.

### Teste 4 — Login válido

1. Informe as credenciais demonstrativas.
2. Clique em "Entrar no sistema".

**Resultado esperado:** a sessão é criada e a área restrita é liberada.

### Teste 5 — Encerramento de sessão

1. Realize o login.
2. Clique em "Encerrar sessão".

**Resultado esperado:** a sessão é encerrada e a área restrita volta a ficar bloqueada.

### Teste 6 — Persistência da sessão no dispositivo móvel

1. Execute a aplicação em Android ou iOS.
2. Realize o login.
3. Reinicie a aplicação.
4. Observe se a sessão demonstrativa é recuperada.

**Resultado esperado:** quando o armazenamento está disponível e a sessão permanece armazenada, a aplicação recupera os dados demonstrativos.

Esse comportamento depende da plataforma e das condições de armazenamento. Não é uma garantia de persistência após desinstalação ou restauração do dispositivo.

### Teste 7 — Sessão no navegador

1. Execute a aplicação no Expo Web.
2. Realize o login.
3. Atualize a página.

**Resultado esperado:** a sessão volta ao estado não autenticado, pois os dados são mantidos somente em memória.

## 10. Considerações de segurança

Esta POC possui finalidade exclusivamente educacional.

A validação de credenciais é realizada localmente e não representa um mecanismo seguro de autenticação para produção.

O identificador de sessão é fictício e não é validado por um servidor.

Em aplicações reais, recomenda-se:

- Autenticação realizada por um backend confiável.
- Comunicação HTTPS.
- Validação de autorização no servidor.
- Armazenamento adequado de senhas no backend, com algoritmos específicos para hash de senhas.
- Proteção de tokens e gerenciamento de expiração.
- Limitação de tentativas de autenticação no servidor.
- Encerramento e revogação de sessões quando aplicável.

O SecureStore auxilia na proteção de pequenos dados armazenados no dispositivo, mas não substitui os mecanismos de autenticação e autorização do backend.

## 11. Conclusão

O Rabisco Security Lab demonstra conceitos fundamentais de segurança em aplicações React Native.

A POC permite observar como o estado de autenticação influencia a apresentação de conteúdo protegido e como dados de sessão podem ser armazenados utilizando recursos específicos de plataformas móveis.

O projeto evidencia também as diferenças entre a execução no navegador e em dispositivos móveis, além das limitações de uma autenticação simulada.

## 12. Referências

EXPO. SecureStore. Disponível em: https://docs.expo.dev/versions/latest/sdk/securestore/.

EXPO. Security guidelines. Disponível em: https://docs.expo.dev/guides/security/.

OWASP. Mobile Application Security. Disponível em: https://mas.owasp.org/.

REACT NATIVE. Security. Disponível em: https://reactnative.dev/docs/security.
