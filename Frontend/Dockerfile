FROM node:alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

# Step 2: Set up the production environment
FROM nginx:stable-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]