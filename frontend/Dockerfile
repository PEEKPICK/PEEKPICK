FROM node:18-alpine

ENV NODE_ENV production

CMD [ "cd", "/frontend" ]

COPY package.json .

RUN npm cache clean --force

RUN npm install

# RUN npm run build

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]

