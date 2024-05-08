FROM nginx:latest
COPY /build /var/www/html/
COPY front.conf /etc/nginx/conf.d/
RUN rm -f /etc/nginx/conf.d/default.conf && mv /etc/nginx/conf.d/front.conf /etc/nginx/conf.d/default.conf