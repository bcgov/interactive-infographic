FROM zzrot/alpine-caddy
MAINTAINER shea.phillips@cloudcompass.ca

ADD /code/markup-prototype /var/www/html

ADD Caddyfile /etc/Caddyfile

EXPOSE 2015
