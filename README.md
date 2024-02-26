## Questionnair-Ai

This is a Next.js Application that aims to make your words better, by helping you write good English sentences. Just write your sentence in English and our backend API will do its best to correct and enhance your sentence. The backend is powered by OpenAi GPT-Model.

## Getting Started
First, You need to add the `.env` file:

```bash
cp .env.example .env # this will create a new file .env

#here is an example of the file
NEXTAUTH_SECRET=NEXTAUTH_SECRET=d7NRHOet5hz7vy2By2I1RWcVKTepEDWuDJXDpbQp3VY=
MONGODB_URI=mongodb://my-mongodb:27017
MONGODB_DB_NAME=questionnair-ai
NODE_ENV=development


# YOUR OPEN_AI API KEY
OPENAI_API_KEY=

```

Second, run the environment using docker-compose:

```bash
docker compose up --build
```

Third, seed the user data so that, you can use the application.

```bash
docker exec -it my-nextjs-app bash # to run a bash terminal.
node seeder/user.seeder.ts # to seed the user db.
```

To run the project without Docker

```bash
npm install && npm run dev
```

```bash
To see the website just open:  http://loacalhost:300/
Default user to loging with:
Email: admin@example.com
Pass: admin123
```

## API Endpoints

| Method | Endpoint                  | Description             |
|--------|---------------------------|-------------------------|
| GET    | /api/auth/signin          | Get the signin form     |
| POST   | /api/sentence-improvement | Enhance the user text   |

## Specs

Here is a list of almost everything I have done in the project:

- Sign in page.
- Chat page.
- Users can insert text that is in wrong grammar and bad words, and the app responds with good sentences.
- Endpoint to handle the user authentication.
- Endpoint to get the user a better sentence of the inserted text.
- Dockerize the application so that it can be easy for further development.

## Notes

- The project is simple, and I know it has to many things to improve.
- To shut down the application you should run  `docker compose down`
- You may need to Install Docker and docker-compose to run the project.
