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

A função de buscar pessoas foi implementada por meio de um TextInput ligado a um estado (useState) de filtro. O filtro funciona buscando os registros cujo primeiro nome forem iguais ao escrito no campo de busca. Minha solução para esse desafio foi sempre fazer uma requisição com um estado de filtro vazio e, quando alterado esse estado, o filtro passaria a ter um valor, que buscaria por todos os registros cujo campo "firstname" fosse igual ao buscado

Para o indicador de carregamento, foi-se utilizado o ActivityIndicator e um useState. O useState vem com o valor true por padrão e, assim que a api retorna uma resposta, ele define o estado "loading" como false. Foi criada uma função com uma estrutura if/else que, caso o valor do estado "loading" estivesse como true, ele exibiria na tela somente um ActivityIndicator. Porém, caso contrário, ele exibiria na tela os dados retornados da api

Em relação a mensagem de erro caso a api estivesse indisponível, eu utilizei um try/catch na requisição da api e um estado de erro com valor padrão "false". Caso a api retornasse uma mensagem de erro, o valor do estado seria alterado para true e seria exibida uma mensagem na tela. Caso contrário, os dados seriam armazenados no useState people e seriam exibidos na tela no compnente FlatList. Para exibição da mensagem de erro, foi utilizado o módulo nativo do react native "sweetalert2", que permite a exibição de mensagens personalizadas na tela. 
