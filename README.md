# Express e PrismaORM

## Começando

### Clone o repositório

```shell
git clone https://github.com/Johnson49/express-prismaORM.git
cd express-prismaORM
```

### Instale as dependências

Se tiver o npm, execute este comando: 

```nodeJS
npm install 
```
Se tiver o yarn, execute este comando: 

```nodeJS
yarn install 
```
Se tiver o pnpm, execute este comando: 

```nodeJS
pnpm install
```

### Crie o banco de dados

O prisma também criará as tabelas com as migrations que estão na pasta `prisma/`

Se tiver o npm, execute este comando: 

```nodeJS
npx prisma generate 
```
Se tiver o yarn, execute este comando: 

```nodeJS
yarn prisma generate 
```
Se tiver o pnpm, execute este comando:

```nodeJS
pnpm prisma generate 
```

### Inicie o servidor

Se tiver o npm, execute este comando: 

```nodeJS
npm run dev 
```
Se tiver o yarn, execute este comando: 

```nodeJS
yarn dev 
```
Se tiver o pnpm, execute este comando: 

```nodeJS
pnpm dev
```

## Entidades

São 7 entidades que se inter-relacional, são elas:

- Usuário
- Artigo
- Podcast
- Video
- Comentario-no-video
- Comentario-no-artigo
- Comentario-no-podcast

### Schema visual de um novo usuário

```json
{
  "id": "2ef2616d-04c3-42e8-88f1-db0ab040660b",
  "username": "Ana",
  "email": "ana@gmail.com",
  "isCreator": true,
  "password": "123456789",
  "createdAt": "2022-12-13T19:58:21.569Z",
  "videos": [],
  "Article": [],
  "podcast": [],
  "comment_in_article": [],
  "comment_in_podcast": [],
  "comment_in_video": []
}
```

#### Com relacionamento

```json
{
  "id": "2ef2616d-04c3-42e8-88f1-db0ab040660b",
  "username": "Ana",
  "email": "ana@gmail.com",
  "isCreator": true,
  "password": "123456789",
  "createdAt": "2022-12-13T19:58:21.569Z",
  "videos": [
    {
      "id": "c9237dc1-bb6e-408c-9f70-f727b4c41e47",
      "title": "APE REST with express and prismaORM",
      "url": "https://aws.bucket/fj~dk@d",
      "describe": "create api rest"
    }
  ],
  "Article": [
    {
      "id": "8a335f32-1a5a-43f6-8d0c-fa2789fc8870",
      "title": "How use eslint with prettier"
    }
  ],
  "podcast": [
    {
      "id": "706a56be-7ff9-471d-a9e4-31dd05c50f91",
      "title": "The game",
      "url": "https://podcast/v28/oe114d2",
      "describe": "the game"
    }
  ],
  "comment_in_article": [
    {
      "id": "4310fba1-0f4a-474d-b3eb-5768eba54578",
      "articleId": "8a335f32-1a5a-43f6-8d0c-fa2789fc8870",
      "text": "Wow",
      "article": {
        "title": "How use eslint with prettier",
        "author": {
          "username": "Ana"
        }
      }
    }
  ],
  "comment_in_podcast": [],
  "comment_in_video": []
}
```

### Schema do video com comentários

```json
{
  "id": "c9237dc1-bb6e-408c-9f70-f727b4c41e47",
  "title": "APE REST with express and prismaORM",
  "describe": "create api rest",
  "url": "https://aws.bucket/fj~dk@d",
  "authorId": "2ef2616d-04c3-42e8-88f1-db0ab040660b",
  "createdAt": "2022-12-14T19:37:52.018Z",
  "comments": [
    {
      "text": "Very good",
      "author": {
        "username": "username 1",
        "isCreator": false,
        "id": "4de9bddd-4629-404d-9195-96afc8c2f003"
      }
    }
  ],
  "author": {
    "isCreator": true,
    "username": "Ana"
  }
}
```

#### Schema do comentário

Este padrão se repete em todas as entidades.

```json
{
  "id": "bb077145-a713-46f5-9896-dad7e0b0bb50",
  "text": "Very good",
  "authorId": "4de9bddd-4629-404d-9195-96afc8c2f003",
  "videoId": "c9237dc1-bb6e-408c-9f70-f727b4c41e47",
  "createdAt": "2022-12-14T19:41:44.375Z",
  "updatedAt": "2022-12-14T19:41:44.375Z",
  "author": {
    "id": "4de9bddd-4629-404d-9195-96afc8c2f003",
    "username": "username 1",
    "isCreator": false
  },
  "video": {
    "id": "c9237dc1-bb6e-408c-9f70-f727b4c41e47",
    "title": "APE REST with express and prismaORM",
    "url": "https://aws.bucket/fj~dk@d"
  }
}
```

### Schema do artigo com comentários

```json
{
  "id": "8a335f32-1a5a-43f6-8d0c-fa2789fc8870",
  "title": "How use eslint with prettier",
  "text": "This article ...",
  "authorId": "2ef2616d-04c3-42e8-88f1-db0ab040660b",
  "author": {
    "id": "2ef2616d-04c3-42e8-88f1-db0ab040660b",
    "username": "Ana",
    "isCreator": true
  },
  "comments": [
    {
      "text": "Coll",
      "author": {
        "id": "4de9bddd-4629-404d-9195-96afc8c2f003",
        "username": "username 1",
        "isCreator": false
      }
    }
  ]
}
```

### Schema do podcast com comentários

```json
{
  "id": "706a56be-7ff9-471d-a9e4-31dd05c50f91",
  "title": "The game",
  "describe": "the game",
  "url": "https://podcast/v28/oe114d2",
  "authorId": "2ef2616d-04c3-42e8-88f1-db0ab040660b",
  "author": {
    "id": "2ef2616d-04c3-42e8-88f1-db0ab040660b",
    "username": "Ana",
    "isCreator": true
  },
  "comments": [
    {
      "text": "Coll podcast",
      "author": {
        "id": "4de9bddd-4629-404d-9195-96afc8c2f003",
        "username": "username 1",
        "isCreator": false
      }
    }
  ]
}
```
