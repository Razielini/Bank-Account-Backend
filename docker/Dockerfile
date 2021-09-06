FROM node:12-alpine3.10

COPY ./ /app

WORKDIR /app
RUN npm ci

EXPOSE 3000
CMD ["npm", "start"]
