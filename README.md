# Calendário de Eventos

Este é um projeto de Calendário de Eventos que permite aos usuários visualizar um calendário mensal, adicionar novos eventos, editar eventos existentes, deletar eventos e visualizar eventos de um dia específico. O projeto utiliza React para o front-end e Firebase para o back-end.

![Calendário](images/Captura de tela 2024-07-11 204234.png)
![Adicionar Evento](images/Captura de tela 2024-07-11 204333.png)
![Calendário com Evento](images/Captura de tela 2024-07-11 204339.png)
![Modal de Edição](images/Captura de tela 2024-07-11 204344.png)


## Tecnologias Utilizadas

- Front-end: React
- Back-end: Firebase Firestore
- CSS: Sem frameworks CSS externos, apenas CSS puro

## Requisitos

- Node.js (versão 12 ou superior)
- Conta no Firebase

## Configuração do Projeto

## 1. Clone o repositório

```bash
git clone https://github.com/usuario/calendario-de-eventos.git
cd calendario-de-eventos


## 2. Instale as dependências
npm install

## 3. Configure o Firebase

###3.1. Crie um projeto no Firebase

- Vá para Firebase Console
- Clique em "Adicionar projeto" e siga as instruções para criar um novo projeto

###3.2. Adicione um aplicativo web ao projeto
- No Firebase Console, vá para a seção "Visão geral do projeto"
- Clique no ícone "Web" para adicionar um aplicativo web ao seu projeto
- Siga as instruções para registrar o aplicativo e copie as configurações do Firebase (variáveis de configuração)

###3.3. Configure as variáveis de ambiente
- Crie um arquivo .env na raiz do projeto e adicione as configurações do Firebase:

- REACT_APP_FIREBASE_API_KEY=your_api_key
- REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
- REACT_APP_FIREBASE_PROJECT_ID=your_project_id
- REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
- REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
- REACT_APP_FIREBASE_APP_ID=your_app_id
- REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id

## 4. Inicie o servidor de desenvolvimento
- npm start
- Abra http://localhost:3000 para visualizar no navegador.

# Funcionalidades

- Visualizar um Calendário
- Adicionar novos eventos especificando título, data, horário e descrição
- Editar Eventos existentes
- Deletar Eventos
- Visualizar eventos de um dia específico

# Estrutura do Projeto

- `src/components`: Contém todos os componentes React
    - `Calendar.js`: Componente principal do calendário
    - `EventForm.js`: Componente de formulário para adicionar e editar eventos
    - `EventDetail.js`: Componente para visualizar detalhes, editar e excluir eventos
    - `Modal.js`: Componente modal genérico
   - `src/firebase.js`: Configuração do Firebase

# Contribuição

 Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

