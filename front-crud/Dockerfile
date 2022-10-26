FROM node:alpine3.15

WORKDIR /usr/src/

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]