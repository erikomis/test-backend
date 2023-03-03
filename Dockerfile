FROM  node:16-alpine3.17
WORKDIR /app


COPY package.json ./

RUN npm install

COPY . .


EXPOSE 3333

CMD ["npm", "run", "dev"]