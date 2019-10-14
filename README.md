# monitoria-app

Repositório destinado ao FRONT da aplicação "A Monitoria".

## Execução

Inicializar serviço do docker:

    make start-docker

Caso não dê certo, use:

    sudo dockerd

Inicializar Aplicação:

    make server

bash:

    sudo docker exec -it monitoria-api sh

## Configurações de Ambiente

Para utilizar a API, crie um arquivo .env na raiz do projeto, e dentro:

    REACT_APP_URL_API = <URL>
