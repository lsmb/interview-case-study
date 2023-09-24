# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY ./app .
RUN npm install

CMD ["npm", "run", "testAndRun"]
