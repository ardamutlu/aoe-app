FROM node:alpine

WORKDIR /usr/src/aoe-app

COPY . /usr/src/aoe-app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]