## Deployed Proyect

Social Web "similar" to Linkedin  [TinderJob-Sy](https://tinderjob-sy.onrender.com/)

## Set up

```js
npm install //Install the dependencies
```
```js
npx prisma db push //Configure the database (tables)
```

```js
npx prisma generate //PrismaClient() access
```

```js
npm run start //Start the server
```

## Environment Variables

```env
DATABASE_URL:"postgresql://[user[:password]@][netloc][:port][/dbname]"
GOOGLE_CLIENT_ID:"XXXXXXXXXX-xxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET: "XXXXX-XXXXX_XXXXXXXXXXXXXXXXXXX"
REDIS_URL: "redis://HOST[:PORT]/DATABASE"
REDIS_PASSWORD: "XXXXXXXXXXXXXXXXXX"
SESSION_SECRET: "xxxxxxxxxxxxxxxx"

```

------
## Stack

- Express.js
- Nodejs
- EJS (visual)
- Redis
- Prisma (ORM)
- PostgreSQL (Database)
- Bcrypt (Encryptation)
- Passport (Sessions)
- Passport-Google-OAuth2.0


