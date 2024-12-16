# Mexagex 

App React-Native CLI android, chat app, usando Realtime database e storage do Firebase.

## Documentação do Projeto

### Introdução

- Mexagex é um app de troca de mensagens em tempo real, crie uma conta, adicione seus amigos e comece a conversar.

- Este projeto tinha como objetivo um app de mensagens em tempo real, além de mensagens, você pode enviar imagens.

- Tecnologias usadas: React Native, Firebase.

### Configuração

- Firebase
  - Crie uma conta no Firebase. Se você não souber como fazer isso, siga o passo a passo no próprio site.
  - Crie um projeto e adicione um aplicativo Android.
  - Depois de criado, adicione o arquivo JSON em `android/app/src`.

### Instalação

Rode o comando no terminal dentro da pasta raiz do projeto Mexagex:

```bash
$ npm install
# ou
$ npm clean install
```


### Funcionalidades Principais
1. Chat em Tempo Real
O aplicativo oferece uma funcionalidade de chat em tempo real que permite aos usuários trocar mensagens instantâneas com outros usuários. Esta funcionalidade inclui:

Envio de Mensagens de Texto: Os usuários podem digitar e enviar mensagens de texto para outros participantes da conversa.
Envio de Imagens: Os usuários podem selecionar imagens da galeria do dispositivo e enviá-las como mensagens.
Como Utilizar:

Abra a conversa desejada.
Digite sua mensagem no campo de texto na parte inferior da tela e toque em "Enviar" para enviar mensagens de texto.
Para enviar uma imagem, toque no ícone da câmera na parte inferior da tela, selecione uma imagem da galeria e toque em "Enviar".
2. Autenticação de Usuário
O aplicativo possui um sistema de autenticação de usuário que permite que os usuários acessem suas contas de forma segura. Esta funcionalidade inclui:

Registro de Conta: Novos usuários podem criar uma conta fornecendo informações básicas, como nome de usuário e senha.
Login de Usuário: Usuários registrados podem fazer login em suas contas usando seu nome de usuário e senha.
Como Utilizar:

Na tela inicial, toque em "Registrar" para criar uma nova conta ou em "Login" para acessar uma conta existente.
Siga as instruções na tela para fornecer as informações necessárias, como nome de usuário e senha.
3. Troca de Mensagens Offline
Os usuários podem trocar mensagens mesmo quando estão offline. As mensagens offline serão enviadas assim que o dispositivo recuperar a conexão com a internet.

Como Utilizar:

Escreva e envie mensagens normalmente quando estiver online. As mensagens serão armazenadas localmente no dispositivo.
As mensagens offline serão entregues automaticamente assim que o dispositivo estiver novamente online.
4. Gerenciamento de Perfil de Usuário
Os usuários podem personalizar seus perfis com informações pessoais, incluindo imagens de perfil e nomes de exibição.

Como Utilizar:

Toque na sua imagem de perfil ou nome na parte superior da tela.
Faça as alterações desejadas no seu perfil, como adicionar ou alterar sua imagem de perfil e nome de exibição.
5. Lista de Conversas
O aplicativo exibe uma lista de todas as conversas ativas dos usuários, permitindo que eles alternem facilmente entre diferentes chats.

Como Utilizar:

Na tela inicial, a lista de conversas ativas será exibida.
Toque em uma conversa na lista para abri-la e visualizar o histórico de mensagens.



### Fluxo de Dados

#### Autenticação
O Mexagex gerencia o fluxo de dados por meio de autenticação segura. O processo de autenticação envolve o seguinte fluxo:

Registro de Conta: Os novos usuários podem criar uma conta fornecendo informações básicas, como nome de usuário e senha.

Login de Usuário: Os usuários registrados podem fazer login em suas contas usando seu nome de usuário e senha.

Chat
O Mexagex permite a troca de mensagens em tempo real entre os usuários. O fluxo de dados no chat inclui:

Envio de Mensagens de Texto: Os usuários podem digitar mensagens de texto e enviá-las para outros participantes da conversa.

Envio de Imagens: Os usuários podem selecionar imagens da galeria de seus dispositivos e enviá-las como mensagens no chat.

Mensagens Offline: O aplicativo permite que os usuários troquem mensagens mesmo quando estão offline. As mensagens offline são armazenadas localmente no dispositivo e enviadas automaticamente assim que o dispositivo se reconecta à internet.

##### Tem como mudar o tema automáticamente

Basta você mudar de tema claro/escuro nas configurações do seu dispositivo.

#### Autenticação
Como funciona o processo de autenticação
O processo de autenticação no Mexagex segue um fluxo simples:

O usuário inicia o aplicativo e é apresentado com a tela de login ou registro.

Para registrar uma nova conta, o usuário fornece um nome de usuário e uma senha. Para fazer login, o usuário insere seu nome de usuário e senha previamente registrados.

O aplicativo verifica as credenciais do usuário com o Firebase Authentication para garantir a autenticidade.

Se as credenciais forem válidas, o usuário é autenticado e tem acesso às funcionalidades do aplicativo.

#### Fluxo de registro e login
##### Registro de Conta:

O usuário toca na opção "Registrar" na tela de início.
O usuário fornece um nome de usuário e senha.
O aplicativo envia as informações de registro para o Firebase Authentication.
O Firebase Authentication cria uma nova conta para o usuário.
O usuário é redirecionado para a tela principal do aplicativo e pode começar a usar as funcionalidades.
##### Login de Usuário:

O usuário toca na opção "Login" na tela de início.
O usuário insere seu nome de usuário e senha.
O aplicativo verifica as credenciais com o Firebase Authentication.
Se as credenciais forem válidas, o usuário é autenticado e redirecionado para a tela principal.

##### Chat
Como as mensagens são enviadas e recebidas
O Mexagex permite que os usuários enviem e recebam mensagens em tempo real. O fluxo de envio e recebimento de mensagens funciona da seguinte forma:

O usuário inicia uma conversa com outro usuário selecionando-o na lista de amigos ou contatos.

O usuário digita uma mensagem no campo de texto e toca em "Enviar".

A mensagem é enviada para o Firebase Realtime Database, onde é armazenada em um local específico da conversa.

O Firebase Realtime Database envia automaticamente a mensagem para o destinatário.

O destinatário recebe a mensagem em tempo real e ela é exibida na conversa.

Uso de imagens no chat
Os usuários do Mexagex podem compartilhar imagens no chat:

Para enviar uma imagem, o usuário toca no ícone da câmera na interface do chat.

Isso abre a galeria de imagens do dispositivo, e o usuário pode selecionar uma imagem para enviar.

A imagem é carregada para o Firebase Storage, e o URL da imagem é armazenado no Firebase Realtime Database.

O destinatário recebe o URL da imagem e pode visualizá-la na conversa.

Armazenamento em Nuvem
Como os dados e arquivos são armazenados no Firebase Storage
O Mexagex utiliza o Firebase Storage para armazenar imagens e arquivos compartilhados no chat. O armazenamento em nuvem funciona da seguinte forma:

Quando um usuário envia uma imagem, o arquivo é carregado para o Firebase Storage com uma referência única.

O URL de download é armazenado no Firebase Realtime Database junto com outras informações da mensagem.

Quando um usuário deseja visualizar uma imagem, o aplicativo faz o download do conteúdo usando o URL fornecido pelo Firebase Storage.

Banco de Dados em Tempo Real
Como os dados são estruturados no Firebase Realtime Database
O Firebase Realtime Database é usado pelo Mexagex para armazenar informações sobre usuários,


### Estilo e Design
#### O Mexagex apresenta um design limpo e amigável para os usuários, com foco na usabilidade e na experiência do usuário. Alguns dos aspectos de estilo e design incluem:

 - Interface de Usuário Intuitiva: O aplicativo possui uma interface de usuário intuitiva que permite aos usuários navegar facilmente por suas conversas, enviar mensagens e compartilhar mídia.

 - Paleta de Cores Agradável: O Mexagex utiliza uma paleta de cores agradável, incluindo tons de azul e branco para uma aparência moderna e atraente.

 - Imagens de Perfil Personalizáveis: Os usuários podem personalizar suas imagens de perfil para tornar seu perfil único e reconhecível.

 - Ícones e Elementos Visuais: O aplicativo utiliza ícones e elementos visuais para melhorar a usabilidade e tornar as ações do usuário mais claras.


 # Integrantes: GABRIELA SILVA DE ARAUJO

