FROM node:20.19.6
COPY . /reja
WORKDIR /reja

CMD npm install && node server.js

