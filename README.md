## How to use

### 1. Clone this repo & install dependencies

Install Node dependencies:

`npm install`

### 2. Create env files

```sh
.env.development.local
.env.test.local
.env.production.local
```

### 2. Set up the database

update the postgres db credentials in the env file

### 3. Generate Prisma Client

```sh
npm run prisma:generate:dev
```

### 4. Migrate Schema

```sh
npm run prisma:migrate:dev
```

### 5. Start the server

```sh
npm run start
```

### To check swagger Endpoint:

http://localhost:3001/docs

### To check on deployment on Heroku 

I deploy my github repo to heroku, but I did not associate Postgresql via Prisma with my deployment.
Requests related to the database running in my local but dont work in the remote environment. 

https://fierce-bastion-14041-85b3ac4332b9.herokuapp.com/


