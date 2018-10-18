# 🚧 code-challenge resolution
 ## Clone

 ```
 git clone https://github.com/rnataoliveira/code-challenge
 ```
 ----------------------------------------------------------------------------------------------------------------------------------------

 ## Server

  **Go to the server folder**  
 ```
 cd challenge/server
 ```
 **Open the file appsettings.json and set a valid value for the string**  
 ```json
"ConnectionStrings": {
      "DefaultConnection": "Server=localhost;Database=challenge;User Id=sa;Password=P@55w0rd"
  }
```

**Restore packages**  
 ```  
 dotnet restore
 ```

**Apply Migrations**  
```
dotnet ef database update
```

**Run**  
 ``` 
 dotnet run  
 ```
----------------------------------------------------------------------------------------------------------------------------------------

 ## Client

 **Go to client folder**  

 ```
cd challenge/client
```

**Install packages** 
```
npm install
```

**Run**  
``` 
npm start
```  
----------------------------------------------------------------------------------------------------------------------------------------
## Some Screenshots

**Registered Persons**  
![Registered Persons](https://raw.githubusercontent.com/rnataoliveira/code-challenge/master/docs/RegisteredPersons.png)

**Person Details**  
![Person Details](https://raw.githubusercontent.com/rnataoliveira/code-challenge/master/docs/PersonDetails.png)

**Register Person**
![Register Person](https://raw.githubusercontent.com/rnataoliveira/code-challenge/master/docs/RegisterPerson.png)


# Code Challenge EN-US

Well, let we first tell you a pretty short history!

Lately our users are afraid to lose their vaccination registry.

So, in order help our users with this problem, it's was requested a web application for handling vaccination registries and you will help us!

## What you'll do

You'll create a application that allow our users to Create, Read, Update and Delete their registries.

A user should have:

```
{
  "name": "Matias",
  "age": 21,
  "photo": "http://awebsitewiththeawesomeprofilephoto.com/prettycutefunnyprofileimage.jpg",
  "vaccines": []
}
```

Inside vaccines we expect:

```
{
  "name": "Viral",
  "appliedAt": "10/05/2006",
  "createdAt": "20/07/2016",
  "updatedAt": "25/12/2018" //last registry update
}
```

Of course you have the liberty to increment data that you believe this application should have, but it has to make sense!

For example, you may have a UserData with login and authentication information from the user.

## Layout

Well, free your imagination and develop the interface you believe it fits the best, just remember that it needs to be responsive (Mobile FTW).

## Technologies

### Required

 - .NET Core
 - Docker
 - A Database connection, use anyone you like (we recommend mongodb)
 
 #### Suggestions: 
 
  - Unit Tests
  - Cache
  - Authentication
  - Latest Front-End libs and tech
  - Use of Javascript/CSS frameworks
  - Use of Javascript/CSS preprocessor

## What we'll evaluate

We'll check everthing, give us your best shot ;)

It's best for us less content with quality then otherwise, so focus on the core requirements first before moving to the suggested features.

We'll not only look your code, we'll take in consideration also things like UX, UI, patterns, performance, etc.

## How to get started

Fork this project and start coding, we'll be glad to evaluate your project when it's done, deliver it unil the deadline (it'll will be sent to you), good coding ;)

----------------------------------------------------------------------------------------------------------------------------------------

# Code Challenge PT-BR

Primeiro vamos te contar uma breve história!

Ultimamente nossos usuários estão com medo de perder suas carteiras de vacinação.

Por isso, fomos solicitados para o desenvolvimento de uma aplicação web para a administração de vacinas, e você vai nos ajudar!

## O que você precisa fazer

Ao abrir a aplicação o usuário precisa cadastrar pessoas, e associar vacinas a essas pessoas.

Uma pessoa tem que ter:

```
{
  "name": "Matias",
  "age": 21,
  "photo": "http://sitedaimagemdaoraquevocevaipordeperfilénoiscarai.com.br/imagemzaçoDEPERFIL.jpg",
  "vaccines": []
}
```

E uma vacina tem que ter:

```
{
  "name": "Tríplice Viral",
  "appliedAt": "10/05/2006",
  "createdAt": "20/07/2016",
  "updatedAt": "25/12/2018" //Última data de atualização no sistema
}
```

Lembrando que essas entidades que estamos apresentando devem servir como base, você pode adicionar qualquer outro campo que quiser, desde que faça sentido.

Todos os campos devem conter validação.

Uma entidade que pode ser adicionada é a de Usuário caso vá fazer a aplicação com autenticação.

## Layout

O Layout é a seu critério, faça o que achar que é o melhor, contanto que seja responsivo!

## Tecnologias

### Obrigatório

 - .NET Core
 - Docker
 - Conexão com Banco de dados, banco de dados a sua escolha
 
 #### Sugestões: 
 
  - Teste Unitário
  - Uso de cache
  - Login com Autenticação
  - Uso de tecnologias atuais de Front-End
  - Uso de framework Javascript/CSS
  - Uso de Pré-Processadores Javascript/CSS

## O que vamos avaliar

Vamos avaliar tudo que for feito. Dê o seu melhor.

Preferimos que você entregue menos coisas com uma qualidade maior do que o inverso.

Além de avaliarmos o seu código, vamos avaliar o seu produto como um todo. Ou seja, também olharemos coisas como usabilidade, layout, performance e etc.

## Como participar

Crie um fork desse projeto, insira seu código e envie um pull request. ;)
