# Exercice API with Prisma and Typescript!

Hi! Here is an exerice for you !
The goal is to build a simple API to manage:

- Books
- Collections
- Users ( Authors )

# Rules

You have to use Prisma, MySQL on Docker and Typescript.

## Setup

First you have to clone this repo :

```
git clone https://github.com/WildCodeSchool/2209-BTZ-exercice-api-prisma-ts
```

and

```
cd 2209-BTZ-exercice-api-prisma-ts
```

Once in the repo folder you have to initialize a new NodeJS application with :

```
npm init -y
```

## Install dependencies

In order to build your application you have to install some dependencies with npm :

- Express
- Express types
- Prisma and Prisma Client / [Documentation here](https://www.prisma.io/docs/getting-started/quickstart)
- Typescript ( dev dependency )
- Ts-node-dev ( dev dependency )

To install a dev dependency, use the -D flag with npm install like :

```
npm install -D typescript ts-node-dev
```

**Don't forget to create a .gitignore file and add the node_modules folder inside !!!**

## Scripts

When all the dependencies are setup you will have to create a dev script to launch the development server in the package.json file.

```json
"scripts": {

// add the line below to the script object

"dev": "ts-node-dev index.ts"

}
```

## Check

When the previous steps are done, your package.json should look like below:

```json
{
  "name": "2209-btz-exercice-api-prisma-ts",
  "version": "1.0.0",
  "description": "Hi! Here is an exerice for you ! The goal is to build a simple API to manage:",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/WildCodeSchool/2209-BTZ-exercice-api-prisma-ts.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/WildCodeSchool/2209-BTZ-exercice-api-prisma-ts/issues"
  },
  "homepage": "https://github.com/WildCodeSchool/2209-BTZ-exercice-api-prisma-ts#readme",
  "devDependencies": {
    "ts-node-dev": "^2.0.0",
    "typescript": "^4.9.3"
  },
  "dependencies": {
    "@prisma/client": "^4.7.1",
    "@types/express": "^4.17.14",
    "express": "^4.18.2",
    "prisma": "^4.7.1"
  }
}
```

## Init Typescript

In order to initialize typescript in your application you will now have to launch this command :

```
tsc --init
```

This will create a tsconfig.json file in the root folder of your application.

## Start a basic NodeJS/Express Http server

As you now know, Express is a minimal framework.
With Express you can build simple http servers very fast !

First, create a file app.ts like this :

```js
import Express from "express";

const app = Express();

app.use(Express.json());

app.get("/", (req, res) => {
  return res.status(200).json("Hello world");
});

export default app;
```

This file initialize the express aplication.
We will now create an index.ts file who will be the main start point of our application.

```js
import app from "./app";

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
```

Once this two files are ready try to launch the application with :

```
npm run dev
```

You should see this in the terminal :

```
Server is running on port 5000 🚀
```

In your favorite http client you can launch a GET request on http://localhost:5000 an you should see a "Hello world" message in the response.

# Prisma Schema

**Be sure your database is running on docker before going further !**

In order to have the synthax highlight in VSCode please install the Prisma extension.

Now we have to build our database ! Don't be afraid of this step !

Before Prisma, we used to build our databases with SQL queries... beurk !!
Now it is way more simple ! Take a look at it !
I don't give you the entire Schema for this application, just a sample, the rest is up to you !

**THIS IS NOT THE SCHEMA FOR THIS APPLICATION, IT IS A SAMPLE**

```js
model  User  {

id  String  @id  @unique  @default(uuid())

name  String

password  String

createdAt  DateTime  @default(now())

updatedAt  DateTime  @updatedAt

posts  Post[]

}

model  Post  {

id  String  @id  @unique  @default(uuid())

title  String

content  String

createdAt  DateTime  @default(now())

updatedAt  DateTime  @updatedAt

category  Category  @relation(fields: [categoryId], references: [id])

categoryId  String

author  User  @relation(fields: [authorId], references: [id])

authorId  String

isDisabled  Boolean  @default(false)

}

model  Category  {

id  String  @id  @unique  @default(uuid())

name  String

createdAt  DateTime  @default(now())

updatedAt  DateTime  @updatedAt

posts  Post[]

}
```

Now you should be able to understand how to build the book API schema.

## Prisma database connection

Prisma is able to connect with any type of database ( MySQL, postgreSQL, MongoDB ... ).
Once you run this command

```
npx prisma init
```

you should see a .env file at the root of your folder.
In this .env file there is a DATABASE_URL key with contain a connection string with all the informations to connect with your database.

The sample connection string look like so:

```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema
# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

![enter image description here](https://res.cloudinary.com/prismaio/image/upload/v1628761154/docs/KkZe3hO.png)

- `postgresql://` is the database protocol for mysql use `mysql://`
- `johndoe` is your database username
- `randompassword`is the database password
- `localhost`is the database host, use localhost if your database is running on your system or in a docker container
- `5432` is the port your database is running on ( usually something like 3306 or 3308 for mysql ).
- `mydb`is the name of the database you wanna connect to

Once the connection string is ready go to the prisma.schema file and you should see this :

```
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema
generator  client  {
provider = "prisma-client-js"
}

datasource  db  {
provider = "postgresql"
url = env("DATABASE_URL")
}
```

In the datasource section, there is a "provider" key, replace the value with your SGBD system type.

Example:
For mysql set up the provider like below :

```
datasource  db  {
provider = "mysql"
url = env("DATABASE_URL")
}
```

Now you should know how to replace those values in order to connect your Prisma application to your database.

## Prisma Commands

Once the prisma schema is written, you have to migrate the changes to your database and to generate the prisma client.

Use this command to launch the migrations :

```
npx prisma migrate dev
```

and right after generate the javascript client

```
npx prisma generate
```

**Dont forget to run this two commands if you apply changes to the schema**

If you want to visualize and manage your database you can run

```
npx prisma studio
```

## Create the prisma client file

To import and use the prisma client you have to create a file **client.ts** in the prisma folder.
In this file import PrismaClient and create a new instance of the PrismaClient Class like this :

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

## Define the routes for your API !

When **Prisma** is properly set up, it's time to define the routes for your entities !

First we will create the src folder if it doesn't exist. Next inside the src folder, add an **api** folder.
Inside the src/api folder, create an index.ts file.
Express work with routes and sub routes, so now we have to import the Router method from express like below :

```js
// src/api/index.ts

import { Router } from "express";

const router = Router();

export default router;
```

This file will contain the beggining of all the routes of our API.

## Create a folder for your first ressource

Now we have to create a folder for the **book** ressource.
This folder will contain the routes of our **CRUD**.

The folder structure will look like this :

```
├── routes.ts
├── interface.ts
├── controller.ts
├── handlers
│   ├── getAll.ts
│   └── getOne.ts
│   └── update.ts
│   └── delete.ts
│   └── create.ts
```

## Create the interface file

Once you have the folder structure, let's define the interface file.

This file is a typescript interface definition which purpose is to restrict our handlers functions.
For the getAll handler you have to define the type of these params :

- Url params
- Query params
- Response body type
- Request body type

Check the code below :

```ts
import { RequestHandler } from  "express";

type BookBodyCreate {
	title: string;
	year: Date;
}

export  interface  BookHandlers {
 getAll:  RequestHandler<null, Book[] | ResponseError, null>;
 getOne: RequestHandler<{id: string}, Book | ResponseError, null>;
 create: RequestHandler<null, Book | ResponseError, BookBodyCreate>
}
```

The **ReqestHandler** type take several params. The first is the URL param, the second is the Response Body Type, the third is the Request Body Type and the fourth is the Request Query Type.
You can see that as the second param we define a Type like **Book** or **Book[]** and a **ResponseError**.
You have to define the ResponseError Type in a separate file and import it all the **interface.ts** files.

Tips :

```ts
type ResponseError = {
  message: string | unknown;
};
```

You will have to define a type for each method in the **handlers** folder.
Be careful with this file and pay attention to each types, you may encounter errors further if you do some mistakes here.

## Define the handlers

Now we can define our **handlers**.
For the getAll method we will create a function of type **BookHandlers["getAll"]** like below :

```ts
import { BookHandlers } from  "../interface";
import prisma from '../../../../prisma/client

const getAllBooks:BookHandlers["getAll"] = async (req, res) => {
  try{
    const books = await prisma.book.findMany();
    res.status(200).json(books);
  } catch (error) {
    console.log(error)
    res.status(500).json({message : error})
  }
};

export default getAllBooks
```

## Add the handlers to the controller

The **controller** file will contain a controller object with all our handlers as key like this :

```js
import getAll from "./handlers/getAll";
import getOne from "./handlers/getOne";
import create from "./handlers/create";
import update from "./handlers/update";
import delete_ from "./handlers/delete";

const controller = {
  getAll,
  getOne,
  create,
  update,
  delete: delete_,
};

export default controller;
```

## Create the routes

Now you can repeat the operation for each file in the handlers folder, don't forget to complete the **interface.ts** file before the method !

---

Let's take a look to the routes.ts file now.
As we did in the src/api/index.ts file we have to initialize a router like so :

```ts
import { Router } from  "express";

import controller from  "./controller";

const  router  =  Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
...

export  default  router;
```

---

Once the router is ready with one route for each operation import it in the **src/api/index.ts**
file like below :

```ts
import { Router } from "express";

import books from "./books/routes";

const router = Router();

router.use("/books", books);

export default router;
```

**Almost done !!**

Now you will have to add the entry point of the API routes !

In the **app.ts** file add this like :

```ts
app.use("/api/v1", api);
```

The file will look like below :

```ts
import Express from "express";

import api from "./api";

const app = Express();

app.use(Express.json());

// this line !!
app.use("/api/v1", api);

export default app;
```

## Hurray ! You wrote your first CRUD !!

You can now test all the routes and operations with postman or with your favorite http client !!
