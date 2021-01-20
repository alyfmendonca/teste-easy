# Teste Easynvest &middot;

Projeto desenvolvido para processo seletivo da empresa Easynvest, utilizando JS, npm, HTML/CSS, SASS, Babel and Jest

## Installing / Getting started

Baixe o repositório usando:

```shell
 git clone https://github.com/alyfmendonca/teste-easy.git
 
 cd teste-easy
 
 npm i
 
 npm start
```



## Developing

### Built With
 - JavaScript com ECMAScript 6+ para estrutura de transição dos dados;
 - HTML e CSS utilizando o pré processador SASS para gerar as folhas de estilo;
 - Babel para transpilar o código ECMAScript 6+ facilitar a interpretação do Jest;
 - Jest para execução de testes unitários;
 - http-server para criação de servidor local para suportar a aplicação.

### Prerequisites
 Para utilizar rodar a aplicação no seu ambiente local é necessário node.js na versão 12.18.4 e npm 6.14.6


### Setting up Dev

Para instalar a aplicação em ambiente local e verificar o funcionamento basta:

```shell
git clone https://github.com/alyfmendonca/teste-easy.git
 
 cd teste-easy
 
 npm i
 
 npm start
```

Para alterações nas folhas de estilo basta rodar o comando:

```shell
sass --watch src/style.scss src/style.css
```

O comando executado no diretório /teste-easy fará com que todas as alterações realizadas nos arquivos "style.scss" e "grid.scss" sejam condensados e interpretados no arquivo "style.css" que é chamado nas páginas html da aplicação.

### Deploying / Publishing
give instructions on how to build and release a new version
In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
packagemanager deploy your-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does.

## Configuration

O projeto foi desenvolvido utilizando as seguintes versões: 

- node.js: 12.18.4; 
- npm: 6.14.6;
- sass: 1.32.3;
- babel/core": 7.12.10;
- babel/preset-env: 7.12.11;
- babel-cli: 6.26.0;
- babel-jest: 26.6.3;
- babel-preset-es2015: 6.24.1;
- babel-register: 6.26.0,
- jest: 26.6.3
        
## Tests

Para executar os testes unitários basta rodar na linha de comando:

```shell
npm test
```

## Api Reference

Requisição inicial consumindo api fornecida pela equipe Easynvest: 

https://private-21e8de-rafaellucio.apiary-mock.com/users


## Database

Para controle dos dados está sendo utilizado o [LocalStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/Window.localStorage). Através dele são feitas as ações de adicionar, remover, alterar e consultar os dados que são exibidos na aplicação. 

