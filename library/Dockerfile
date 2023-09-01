FROM node:19.8

WORKDIR /app

COPY ./package*.json ./
RUN npm install
COPY ./src src/

CMD ["npm", "run", "dev"]