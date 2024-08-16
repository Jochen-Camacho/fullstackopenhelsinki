FROM node:20 AS build-stage

WORKDIR /usr/scr/app

COPY . .

ENV VITE_BACKEND_URL='http://localhost:3000/'

RUN npm ci

RUN npm run build 

#-----------------------------------------

FROM node:20 AS test-stage

COPY --from=build-stage /usr/scr/app/ /usr/scr/app/

RUN npm run test
    
#-----------------------------------------

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/scr/app/dist /usr/share/nginx/html