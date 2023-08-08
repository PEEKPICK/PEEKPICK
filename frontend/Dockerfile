FROM node:18-alpine

ENV NODE_ENV production

CMD [ "cd", "/frontend" ]

COPY package.json .

RUN npm cache clean --force

RUN npm install

RUN npm run build

FROM nginx:1.21.3-alpine

COPY etc/nginx/nginx.conf /etc/nginx/nginx.conf

COPY ./build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

