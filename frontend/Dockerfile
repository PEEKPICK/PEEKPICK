FROM node:18-alpine

CMD [ "cd", "/frontend" ]

COPY package.json .

RUN npm cache clean --force

RUN npm install

# RUN npm run build

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]

