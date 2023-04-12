FROM postgres:latest

ENV POSTGRES_PASSWORD admin
ENV POSTGRES_DB postgres

COPY ./DB/postgres.sql /docker-entrypoint-initdb.d/