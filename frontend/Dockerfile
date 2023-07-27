FROM node:18-alpine

RUN npm cache clean --force

RUN npm install

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]

