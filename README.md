# Descrição do projeto
Esse projeto é um aplicativo mobile feito como atividade com o objetivo de consumir uma api própria. O aplicativo carrega os dados da api e exibe-os em forma de uma lista, mostrando nomes completos, emails, telefones e séries favoritas dos usuários adicionados

# Tecnologias utilizadas
Para a criação do aplicativo, foi utilizado o framework do React Native para o frontend e as bibliotecas json-server e localtunnel para o backend

# Instalação
Primeiro, baixe e extraia os arquivos desse repositório. Em um prompt de comando, navegue até a pasta "backend" dentro de CrudReact-com-Json-server-main por meio do comando "cd nome-da-pasta", digite o comando "npm i" e espere terminar de baixar. Em um segundo prompt de comando, navegue até a pasta "CrudReact" dentro de "frontend", digite o comando "npm i" e espere terminar de baixar os módulos necessários.

# Execução
Abra um terceiro prompt de comando, navegue até a pasta "backend" e digite o comando "npx json-server --watch db.json --port 3000". No outro prompt de comando que você utilizou anteriormente e que também está na pasta backend, digite o comando "npx lt --port 3000" e copie a url recebida. Abra o arquivo configApi.js, dentro do caminho CrudReact-com-Json-server-main/frontend/CrudReact/src/backend e substituia a url lá existente pela que você copiou

No outro prompt de comando que está na pasta frontend, digite o comando "npx expo start" e escaneie o qr code gerado no console pelo seu aplicativo expo go

# Explicação da solução
O nível escolhido de desafio foi o Sênior (Avançado)

Foram adicionados 2 novos campos: phone e série favorita. Os campos foram adicionados no banco de dados e foram adicionados TextInputs para serem preenchidos no cadastro/edição de registro pré-existente. Ademais, também foi adicionada, como um desafio extra, uma verificação, impedindo que o usuário edite/adicione um registro em branco, com exceção do campo de série favorita, que tem como valor padrão "Nenhuma"

Para a navegação de telas foi utlizado a biblioteca do react navigation


