FROM nginx:alpine

# Copy in config and build files
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app/webapp
COPY build/ .
