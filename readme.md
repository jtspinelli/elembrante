# APP de Recados

O APP consiste em três páginas que permitem:
- Registro de usuários
- Login
- Exibição de recados 
- Adição de novo recado
- Edição de recado
- Exclusão de recado
- Reordenar recados

A proposta foi exercitar mecanismos de CRUD (_create_, _read_, _update_, _delete_) utilizando ```localStorage``` para persistir os dados.

<br>

## It's LIVE

O app pode ser visualizado online no **[HEROKU](https://salty-refuge-11977.herokuapp.com/)**.

<br>

## Estilos

Com uso de [Sass](https://github.com/jtspinelli/growdev-ativ-final-intro-prog-web/blob/master/sass/main.scss) o tema padrão do Bootstrap foi modificado para criar um **tema personalizado** para a aplicação.

Os arquivos de estilo são compilados automaticamente ao rodar a aplicação.

<br>

## Login e Registro

**Login** e **Registro** são gerenciados em páginas diferentes.

Os dados de Registro são salvos no ```LocalStorage``` para futura utilização.

<div align='center'>
<img src='./images/Login.png' height='350px'>
<img src='./images/Registro.png' height='350px'>
</div>

<br>

O código ```Javascript``` da **página de Recados** valida as informações digitadas no formulário e só libera o botão de registro (criar conta) quando:
- Todos campos estão preenchidos
- Dois campos de senha conferem (informações digitadas são iguais)

Um campo de informação destaca em vermelho os passos que ainda faltam para a liberação do botão de registro (criar conta).


<div align='center'>
<img src='./images/Registro Validation 1.png' height='300px'>
<img src='./images/Registro Validation 2.png' height='300px'>
</div>

<br>

## Página principal

Uma vez logado no sistema, o usuário pode **visualizar**, **adicionar**, **editar** e **excluir** recados através da página principal.

<img src='./images/Main.png'>

<br>

## Reordenar recados

O usuário pode reordenar seus recados facilmente, utilizando os manipuladores no início de cada linha.

<img src='./images/Reord.png'>

<br>

## Responsividade

A aplicação é responsiva à largura de tela. A tabela assume formato **"em cards"** em _smartphones_.

<div align='center'>
    <img src='./images/Responsividade.png' width='300px'>
</div>

<br>

## Rodando o APP*

Após baixar os arquivos do repositório, instale todas as dependências utilizando o comando:

```
npm install
```

Em seguida, rode a aplicação utilizando o comando:

```
npm start
```


Dirija-se ao endereço ```http://localhost:3000``` para utilizar a aplicação.


##

#### **\*** Necessário ter [Node.js](https://nodejs.org/en/) instalado.