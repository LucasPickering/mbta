FROM nginx:alpine

# Copy in config and build files
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /app/webapp
COPY build/ .

# This is populated with links to /dev/std(out|err) by default
RUN rm /var/log/nginx/*
