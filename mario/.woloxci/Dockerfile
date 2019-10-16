FROM node:10.14.1

WORKDIR /usr/src/app

ENV NODE_ENV testing

ENV HOME /usr/src/app

ENV BABEL_DISABLE_CACHE 1

RUN mkdir -p /install

ENV NODE_PATH=/install/node_modules

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /install/

WORKDIR /install

RUN npm install
RUN npm install -g gulp
# If you are building your code for production
# RUN npm install --only=production

RUN chmod a+r /usr/src/app

WORKDIR /usr/src/app

# Bundle app source
COPY . .
