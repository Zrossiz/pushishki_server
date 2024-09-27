FROM node:20.11.0

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i @prisma/client

COPY . .

COPY .env .env

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start"]