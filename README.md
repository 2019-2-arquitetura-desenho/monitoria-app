# monitoria-app

Repositório destinado ao FRONT da aplicação "A Monitoria".

## Execução

Inicializar serviço do docker:

    make start-docker

Caso não dê certo, use:

    make start-docker2

Inicializar Aplicação:

    make server

bash:

    make bash

## Configuração da Variável de Ambiente

Para se conectar a api, crie um arquivo .env na raiz do projeto com o seguinte conteudo:

    REACT_APP_URL_API=<URL API>
