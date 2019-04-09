# Build the JS artifact
FROM node:10-alpine as builder
WORKDIR /app/webapp
ADD webapp .
RUN npm run build

# Build the nginx image
FROM nginx:alpine
# Copy in config and build files
WORKDIR /app/webserver
COPY prod/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/webapp/build/ .

# This is populated with links to /dev/std(out|err) by default
RUN rm /var/log/nginx/*
