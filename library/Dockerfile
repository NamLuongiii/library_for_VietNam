FROM node:20-alpine

WORKDIR /library

COPY package.json ./

RUN npm install

COPY . .

CMD npm run dev