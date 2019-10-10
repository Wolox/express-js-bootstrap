FROM node:10.14.1

WORKDIR /home/node/app

COPY package.json .
COPY package-lock.json .
COPY .nvmrc .

RUN npm install

COPY . .

EXPOSE 8080
ENV NODE_ENV production
CMD ["node", "server.js"]
