FROM node:16.13.2@sha256:7c49a64aba86dd483aa874bc0230c07f282e20741a7c66e426970ecafc149a38 AS build
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.24.0-alpine3.17@sha256:1fc79d650e6aa16683ab887298874842f46e6c3738b01d8d82fc88053eda1905
LABEL Author="github@matthias-fisch.de"
EXPOSE 80
ENV BASE_PATH ""

# Copy nginx configuration
COPY docker/default.conf /etc/nginx/conf.d/default.conf

# Copy and mark entrypoint script executable
COPY docker/entrypoint.sh /entrypoint.sh
RUN chown 101:101 /entrypoint.sh
RUN chmod u+x /entrypoint.sh

# Make application files readable by user
COPY --from=build /build/dist /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
RUN chown -R 101:101 /usr/share/nginx/html

ENTRYPOINT ["sh", "/entrypoint.sh"]