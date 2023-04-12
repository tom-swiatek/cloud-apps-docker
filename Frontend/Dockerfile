FROM node:18.15.0-buster

WORKDIR /frontend-app

COPY ./Frontend/package.json package.json

COPY ./Frontend/package-lock.json package-lock.json

RUN npm install

COPY ./Frontend .

CMD ["npm", "run", "dev"]
