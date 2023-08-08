FROM node:18-alpine AS build

ENV NODE_ENV production

CMD [ "cd", "/frontend" ]

COPY package.json .

RUN npm cache clean --force

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21.3-alpine

COPY etc/nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

